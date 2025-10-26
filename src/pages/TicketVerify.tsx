import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

const TicketVerify = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyTicket = async () => {
      const token = searchParams.get('t');
      
      if (!token) {
        setResult({
          valid: false,
          reason: 'MISSING_TOKEN',
        });
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-ticket', {
          body: { token },
        });

        if (error) throw error;
        
        setResult(data);
      } catch (error) {
        console.error('Verification error:', error);
        setResult({
          valid: false,
          reason: 'ERROR',
        });
      } finally {
        setLoading(false);
      }
    };

    verifyTicket();
  }, [searchParams]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dawn">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-poppins text-lg">Vérification en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dawn py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>

        <Card className={`${result?.valid ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <CardContent className="p-8 text-center">
            {result?.valid ? (
              <>
                <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
                <h1 className="font-playfair text-4xl font-bold text-green-800 mb-4">
                  ✅ Billet Valide
                </h1>
                <p className="font-poppins text-xl text-green-700 mb-6">
                  Soleil sur toi ! Ce billet est confirmé et payé.
                </p>

                {result.event && (
                  <div className="bg-white p-6 rounded-lg shadow-soft mb-6">
                    <h2 className="font-playfair text-2xl font-semibold mb-4">
                      {result.event.name}
                    </h2>
                    <div className="space-y-2 font-poppins text-left">
                      <p>
                        <strong>📅 Date :</strong>{' '}
                        {new Date(result.event.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p>
                        <strong>📍 Lieu :</strong> {result.event.location}
                      </p>
                    </div>
                  </div>
                )}

                {result.attendee && (
                  <div className="bg-white p-4 rounded-lg shadow-soft">
                    <h3 className="font-poppins font-semibold mb-2">Participant</h3>
                    <p className="font-poppins">{result.attendee.name}</p>
                    <p className="font-poppins text-sm text-muted-foreground">
                      {result.attendee.email}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-24 w-24 text-red-600 mx-auto mb-6" />
                <h1 className="font-playfair text-4xl font-bold text-red-800 mb-4">
                  ⛔ Billet Non Valide
                </h1>
                <p className="font-poppins text-xl text-red-700 mb-4">
                  {getReasonText(result?.reason || null)}
                </p>
                <p className="font-poppins text-sm text-muted-foreground">
                  Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'organisateur.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketVerify;
