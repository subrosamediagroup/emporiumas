import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  useEffect(() => {
    window.history.replaceState(null, "", "/payment-success");
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto flex flex-col items-center px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
            Payment Successful!
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Thank you for your purchase. You'll receive a confirmation email shortly with your order details.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild>
              <Link to="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
