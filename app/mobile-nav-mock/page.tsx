const LINKS = [
  { label: "Courses", image: "https://images.unsplash.com/photo-1538648759472-7251f7cb2c2f" },
  { label: "Hotels", image: "https://images.unsplash.com/photo-1549294413-26f195200c16" },
  { label: "Destinations", image: "https://images.unsplash.com/photo-1502770513380-138d6d3a51dd" },
  { label: "Itineraries", image: "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513" },
  { label: "Packages", image: "/art/packages-hero.svg" },
  { label: "Blog", image: "/art/blog-hero.svg" },
  { label: "About", image: "/art/about-hero.svg" },
  { label: "FAQ", image: "/art/faq-hero.svg" },
];

export default function MobileNavMockPage() {
  return (
    <div className="flex min-h-screen justify-center bg-[#0a0a0a] py-10">
      <div className="w-[390px] overflow-hidden bg-[#16242c] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-sans text-sm text-[#a8ada9]">Mobile menu mock — 390px width</span>
        </div>
        <nav className="flex flex-col">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="relative flex h-[76px] items-center overflow-hidden px-6"
              style={{
                backgroundImage: `url(${link.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(10,15,15,.75) 0%, rgba(10,15,15,.45) 55%, rgba(10,15,15,.2) 100%)",
                }}
              />
              <span
                className="relative font-display text-2xl font-bold text-cream"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,.6)" }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
