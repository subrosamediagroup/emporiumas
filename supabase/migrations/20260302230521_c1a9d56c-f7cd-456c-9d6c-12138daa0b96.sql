
-- Tighten insert policy: only authenticated users can have orders created for them
DROP POLICY "Service role can insert orders" ON public.orders;
CREATE POLICY "Insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Tighten update policy: only own orders
DROP POLICY "Service role can update orders" ON public.orders;
CREATE POLICY "Update own orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = user_id);
