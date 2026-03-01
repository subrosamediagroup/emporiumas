import { motion } from "framer-motion";
import { Guitar, Headphones, Speaker, Music, Mic, Piano } from "lucide-react";

const categories = [
  { name: "Guitars & Basses", icon: Guitar, count: "8,200+" },
  { name: "Synthesizers", icon: Piano, count: "4,100+" },
  { name: "Headphones", icon: Headphones, count: "6,500+" },
  { name: "Speakers & Monitors", icon: Speaker, count: "3,800+" },
  { name: "Microphones", icon: Mic, count: "2,900+" },
  { name: "DJ Equipment", icon: Music, count: "3,400+" },
];

const Categories = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">Find exactly what you're looking for</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <cat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{cat.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cat.count}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
