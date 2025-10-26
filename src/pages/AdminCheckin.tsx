import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowLeft, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  const [token, setToken] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un code QR",
        variant: "destructive",
      });
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
        toast({
          title: "✅ Billet Valide",
          description: `${data.attendee?.name} - Entrée autorisée`,
        });
      } else {
        toast({
          title: "⛔ Billet Non Valide",
          description: getReasonText(data.reason),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la vérification",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getReasonText = (reason: string | null) => {
    switch (reason) {
      case 'MISSING_TOKEN':
        return 'Code QR invalide ou manquant';
      case 'UNKNOWN_TOKEN':
        return 'Ce billet n\'existe pas';
      case 'UNPAID':
        return 'Paiement non confirmé';
      case 'EVENT_MISMATCH':
        return 'Billet pour un autre événement';
      case 'ERROR':
        return 'Erreur de vérification';
      default:
        return 'Erreur inconnue';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dawn py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>

        <Card>
          <CardContent className="p-8">
            <h1 className="font-playfair text-3xl font-bold mb-6 text-center">
              🎟️ Contrôle des Billets
            </h1>

            <form onSubmit={handleVerify} className="space-y-4 mb-8">
              <div>
                <label className="font-poppins font-semibold mb-2 block">
                  Code QR ou Token
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Entrer le code QR..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-sun shadow-glow"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {loading ? "Vérification..." : "Vérifier"}
                  </Button>
                </div>
                <p className="font-poppins text-sm text-muted-foreground mt-2">
                  Scannez le QR code ou collez le token manuellement
                </p>
              </div>
            </form>

            {result && (
              <Card
                className={`${
                  result.valid
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    {result.valid ? (
                      <>
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h2 className="font-playfair text-2xl font-bold text-green-800">
                          ✅ VALIDE
                        </h2>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                        <h2 className="font-playfair text-2xl font-bold text-red-800">
                          ⛔ NON VALIDE
                        </h2>
                      </>
                    )}
                  </div>

                  {result.attendee && (
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <h3 className="font-poppins font-semibold mb-2">
                        Participant
                      </h3>
                      <p className="font-poppins text-lg font-bold">
                        {result.attendee.name}
                      </p>
                      <p className="font-poppins text-sm text-muted-foreground">
                        {result.attendee.email}
                      </p>
                    </div>
                  )}

                  {result.event && (
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <h3 className="font-poppins font-semibold mb-2">
                        Événement
                      </h3>
                      <p className="font-poppins">{result.event.name}</p>
                      <p className="font-poppins text-sm text-muted-foreground">
                        {new Date(result.event.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}

                  {!result.valid && result.reason && (
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-poppins text-red-700 font-semibold">
                        Raison : {getReasonText(result.reason)}
                      </p>
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
