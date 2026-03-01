const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-primary">Emporium</h3>
            <p className="text-sm text-muted-foreground">
              The trusted marketplace for buying and selling audio hardware and musical instruments.
            </p>
          </div>
          {[
            {
              title: "Marketplace",
              links: ["Shop All", "Sell Gear", "Price Guide", "Deals"],
            },
            {
              title: "Support",
              links: ["Help Center", "Buyer Protection", "Shipping Info", "Returns"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © 2026 Emporium. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
