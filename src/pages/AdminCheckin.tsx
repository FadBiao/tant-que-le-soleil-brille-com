import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface VerificationResult {
  valid: boolean;
  reason: string | null;
  event?: {
    id: string;
    name: string;
    date: string;
    location: string;
  };
  attendee?: {
    name: string;
    email: string;
  };
  order?: {
    id: string;
    status: string;
  };
}

const AdminCheckin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and admin role
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        toast.error("Accès refusé. Veuillez vous connecter.");
        navigate('/');
        return;
      }

      setUser(user);

      // Check if user has admin or organizer role
      const { data: roleData, error: roleError } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', user.id)
        .in('role', ['admin', 'organizer'])
        .maybeSingle();

      if (roleError || !roleData) {
        toast.error("Accès refusé. Vous n'avez pas les permissions nécessaires.");
        navigate('/');
        return;
      }

      setIsAdmin(true);
      setAuthLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token.trim()) {
      toast.error("Veuillez entrer un code de vérification");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('verify-ticket', {
        body: { token: token.trim() },
      });

      if (error) throw error;
      
      setResult(data);
      
      if (data.valid) {
        toast.success(`Billet valide: ${data.attendee?.name}`);
      } else {
        toast.error(`Billet invalide: ${getReasonText(data.reason)}`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error("Erreur lors de la vérification");
    } finally {
      setLoading(false);
    }
  };

  const getReasonText = (reason: string | null) => {
    switch (reason) {
      case 'MISSING_TOKEN':
        return 'Code invalide ou manquant';
      case 'UNKNOWN_TOKEN':
        return 'Billet non trouvé';
      case 'UNPAID':
        return 'Paiement non confirmé';
      case 'EVENT_MISMATCH':
        return 'Billet pour un autre événement';
      case 'ERROR':
        return 'Erreur de vérification';
      case 'RATE_LIMIT':
        return 'Trop de tentatives, réessayez plus tard';
      default:
        return 'Erreur inconnue';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-amber-900">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 mb-6">
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              🔍 Contrôle des Billets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Code de vérification ou Token
                </label>
                <Input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Entrer le code..."
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Scannez le QR code ou entrez le token manuellement
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
              >
                {loading ? "Vérification..." : "Vérifier le billet"}
              </Button>
            </form>

            {result && (
              <Card className={`mt-6 ${result.valid ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className={`text-6xl mb-2`}>
                      {result.valid ? '✅' : '❌'}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {result.valid ? 'BILLET VALIDE' : 'BILLET NON VALIDE'}
                    </h2>
                    {!result.valid && (
                      <p className="text-red-700 font-semibold">
                        {getReasonText(result.reason)}
                      </p>
                    )}
                  </div>

                  {result.attendee && (
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-2">👤 Participant</h3>
                      <p className="text-lg font-bold">{result.attendee.name}</p>
                      <p className="text-sm text-muted-foreground">{result.attendee.email}</p>
                    </div>
                  )}

                  {result.event && (
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">📅 Événement</h3>
                      <p className="font-medium">{result.event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.event.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">📍 {result.event.location}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCheckin;
