import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Home, Camera, X, Lock } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [token, setToken] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pin.trim()) {
      toast.error("Veuillez entrer le code PIN");
      return;
    }

    setPinLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('verify-pin', {
        body: { pin: pin.trim() },
      });

      if (error) throw error;

      if (data.valid) {
        setIsAuthenticated(true);
        toast.success("Accès autorisé !");
      } else {
        toast.error("Code PIN incorrect");
        setPin("");
      }
    } catch (error) {
      console.error('PIN verification error:', error);
      toast.error("Erreur de vérification");
    } finally {
      setPinLoading(false);
    }
  };

  const startScanning = async () => {
    try {
      setScanning(true);
      setResult(null);
      
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          // Extract token from URL or use text directly
          let extractedToken = decodedText;
          try {
            const url = new URL(decodedText);
            extractedToken = url.searchParams.get('t') || decodedText;
          } catch {
            // Not a URL, use as-is
          }

          setToken(extractedToken);
          await stopScanning();
          await verifyToken(extractedToken);
        },
        (errorMessage) => {
          // Ignore scan errors (no QR code in view)
        }
      );
    } catch (error) {
      console.error("Scanner error:", error);
      toast.error("Impossible d'accéder à la caméra");
      setScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (error) {
        console.error("Stop scanner error:", error);
      }
    }
    setScanning(false);
  };

  const verifyToken = async (tokenToVerify: string) => {
    if (!tokenToVerify.trim()) {
      toast.error("Veuillez entrer un code de vérification");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('verify-ticket', {
        body: { token: tokenToVerify.trim() },
      });

      if (error) throw error;
      
      setResult(data);
      
      if (data.valid) {
        toast.success(`✅ Billet valide: ${data.attendee?.name}`);
      } else {
        toast.error(`❌ Billet invalide: ${getReasonText(data.reason)}`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error("Erreur lors de la vérification");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyToken(token);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 mb-6">
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="w-12 h-12 text-amber-600" />
              </div>
              <CardTitle className="text-3xl">Accès Administrateur</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Code PIN
                  </label>
                  <Input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Entrez le code PIN"
                    className="w-full text-center text-2xl tracking-widest"
                    maxLength={10}
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  disabled={pinLoading}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
                >
                  {pinLoading ? "Vérification..." : "Accéder"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
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
            {!scanning ? (
              <>
                <div className="mb-6">
                  <Button
                    onClick={startScanning}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-lg py-6"
                  >
                    <Camera className="w-6 h-6 mr-2" />
                    Scanner un QR Code
                  </Button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou entrer manuellement
                    </span>
                  </div>
                </div>

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
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
                  >
                    {loading ? "Vérification..." : "Vérifier le billet"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
                  <Button
                    onClick={stopScanning}
                    variant="destructive"
                    className="absolute top-2 right-2"
                    size="icon"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Placez le QR code devant la caméra pour le scanner
                </p>
              </div>
            )}

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
