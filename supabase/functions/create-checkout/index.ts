import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user if available
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      userId = data.user?.id ?? null;
    }

    const { items, shippingInfo } = (await req.json()) as {
      items: CartItem[];
      shippingInfo: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
      };
    };

    if (!items || items.length === 0) {
      throw new Error("No items provided");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.image.startsWith("http") ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingCost = subtotal > 500 ? 0 : 14.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    if (subtotal <= 500) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping", images: [] },
          unit_amount: 1499,
        },
        quantity: 1,
      });
    }

    // Save order to database if user is authenticated
    let orderId: string | null = null;
    if (userId) {
      const { data: order, error: orderError } = await supabaseClient
        .from("orders")
        .insert({
          user_id: userId,
          items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity, image: i.image })),
          subtotal: Math.round(subtotal * 100),
          shipping: Math.round(shippingCost * 100),
          tax: Math.round(tax * 100),
          total: Math.round(total * 100),
          status: "pending",
          shipping_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
          shipping_email: shippingInfo.email,
        })
        .select("id")
        .single();

      if (!orderError && order) {
        orderId = order.id;
      }
    }

    const origin = req.headers.get("origin") || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      customer_email: shippingInfo.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      automatic_tax: { enabled: false },
      metadata: {
        customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
        phone: shippingInfo.phone,
        order_id: orderId || "",
      },
    });

    // Update order with stripe session id
    if (orderId && session.id) {
      await supabaseClient
        .from("orders")
        .update({ stripe_session_id: session.id, status: "completed" })
        .eq("id", orderId);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[create-checkout] ERROR:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
