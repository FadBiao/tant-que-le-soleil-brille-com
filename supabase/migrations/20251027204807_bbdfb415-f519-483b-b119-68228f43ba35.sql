-- Create event_sessions table for managing multiple sessions per event
CREATE TABLE public.event_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  session_name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 30,
  booked_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_sessions ENABLE ROW LEVEL SECURITY;

-- Sessions are viewable by everyone
CREATE POLICY "Sessions are viewable by everyone" 
ON public.event_sessions 
FOR SELECT 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_event_sessions_updated_at
BEFORE UPDATE ON public.event_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add session_id and quantity to orders
ALTER TABLE public.orders 
ADD COLUMN session_id UUID REFERENCES public.event_sessions(id),
ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1;

-- Add session_id to tickets
ALTER TABLE public.tickets
ADD COLUMN session_id UUID REFERENCES public.event_sessions(id);

-- Add first_name column to orders and tickets
ALTER TABLE public.orders
ADD COLUMN user_first_name TEXT;

ALTER TABLE public.tickets
ADD COLUMN attendee_first_name TEXT;

-- Function to decrement session capacity (called after payment)
CREATE OR REPLACE FUNCTION public.decrement_session_capacity(
  p_session_id UUID,
  p_quantity INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.event_sessions
  SET booked_count = booked_count + p_quantity
  WHERE id = p_session_id;
END;
$$;