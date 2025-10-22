import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, Sun } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé ! ☀️",
      description: "Merci pour votre message. Nous vous répondrons bientôt.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-dawn">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <Sun className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Restons en Contact
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez notre communauté lumineuse et ne manquez jamais un rayon de positivité.
          </p>
        </div>

        <Card className="shadow-soft animate-fade-in">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-sm font-medium text-foreground mb-2 block">
                    Votre Nom
                  </label>
                  <Input 
                    type="text"
                    placeholder="Marie Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="font-poppins"
                  />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-foreground mb-2 block">
                    Votre Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="marie@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="font-poppins"
                  />
                </div>
              </div>

              <div>
                <label className="font-poppins text-sm font-medium text-foreground mb-2 block">
                  Votre Message
                </label>
                <Textarea 
                  placeholder="Partagez votre lumière avec nous..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="font-poppins resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-sun shadow-glow"
              >
                <Send className="mr-2 h-5 w-5" />
                Envoyer un Rayon de Soleil
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <p className="font-poppins text-sm">
                  Ou écrivez-nous directement à{" "}
                  <a href="mailto:contact@tantquelesoleilbrille.com" className="text-primary hover:underline">
                    contact@tantquelesoleilbrille.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
