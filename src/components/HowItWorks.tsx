import { motion } from "framer-motion";
import { Camera, Tag, Truck, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "List Your Gear",
    description: "Snap photos, set your price, and publish in minutes.",
  },
  {
    icon: Tag,
    title: "Buyers Discover",
    description: "Your listing reaches thousands of gear enthusiasts instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Buyer pays through our protected checkout system.",
  },
  {
    icon: Truck,
    title: "Ship & Done",
    description: "Ship the item, get paid. We handle the rest.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">Sell your gear in 4 simple steps</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-border to-transparent md:block" />
              )}
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="h-7 w-7" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
