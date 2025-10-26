import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TicketSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Log the successful payment
    if (sessionId) {
      console.log('Payment successful, session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-dawn py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-primary bg-white">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-24 w-24 text-primary mx-auto mb-6" />
            
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">
              ☀️ Soleil sur toi !
            </h1>
            
            <p className="font-poppins text-xl text-muted-foreground mb-6">
              Ta place est confirmée et payée avec succès.
            </p>

            <div className="bg-gradient-dawn p-6 rounded-lg mb-8">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="font-poppins text-lg mb-2">
                Un email de confirmation avec ton <strong>QR Code</strong> vient d'être envoyé.
              </p>
              <p className="font-poppins text-sm text-muted-foreground">
                Vérifie ta boîte mail (et tes spams si besoin).
              </p>
            </div>

            <div className="space-y-4">
              <p className="font-poppins text-sm text-muted-foreground">
                Le jour J, présente simplement ton QR code (sur ton téléphone ou imprimé) à l'entrée.
              </p>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/">
                  <Button className="bg-gradient-sun shadow-glow">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/10 rounded-lg">
              <p className="font-poppins text-sm">
                <strong>Une question ?</strong> Réponds simplement à l'email de confirmation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketSuccess;
