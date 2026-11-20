CREATE TABLE public.purchase_orders (
 id uuid PRIMARY KEY,
 created_at timestamptz NOT NULL DEFAULT now(),
 customer_name text NOT NULL,
 customer_email text NOT NULL,
 phone text NOT NULL,
 delivery_address text NOT NULL,
 postal_code text NOT NULL,
 product text NOT NULL,
 quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 20),
 preferred_length text NOT NULL,
 preferred_colour text NOT NULL,
 payment_method text NOT NULL,
 unit_price numeric NOT NULL,
 total numeric NOT NULL,
 notification_recipient text NOT NULL
);
GRANT ALL ON public.purchase_orders TO service_role;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
