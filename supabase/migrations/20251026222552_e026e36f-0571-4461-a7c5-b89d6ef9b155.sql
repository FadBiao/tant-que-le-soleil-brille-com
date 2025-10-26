-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  capacity INTEGER CHECK (capacity > 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create tickets table with QR token
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_token TEXT UNIQUE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  attendee_name TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_orders_stripe_session ON public.orders(stripe_session_id);
CREATE INDEX idx_orders_event ON public.orders(event_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_tickets_qr_token ON public.tickets(qr_token);
CREATE INDEX idx_tickets_event ON public.tickets(event_id);
CREATE INDEX idx_tickets_order ON public.tickets(order_id);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events (public read)
CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT
  USING (true);

-- RLS Policies for orders (users can view their own)
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- RLS Policies for tickets (users can view their own)
CREATE POLICY "Users can view their own tickets"
  ON public.tickets FOR SELECT
  USING (attendee_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Public policy for ticket verification (needed for QR scanning)
CREATE POLICY "Tickets can be verified by token"
  ON public.tickets FOR SELECT
  USING (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a default event for the Club d'Écriture
INSERT INTO public.events (name, description, event_date, location, price_cents, capacity)
VALUES (
  'Club d''Écriture - Session Créative',
  'Rejoignez notre Club d''Écriture et laissez votre créativité briller. Atelier d''écriture créative avec exercices et partages inspirants.',
  (CURRENT_DATE + INTERVAL '30 days')::timestamp with time zone,
  'À confirmer',
  2500,
  20
);