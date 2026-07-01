import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <section className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-[#16242c] px-6 pb-10 md:min-h-[340px] md:px-14 md:pb-12">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,36,44,.4) 0%, rgba(22,36,44,.82) 100%)" }}
        />
        <Header />
        <div className="relative z-10 pt-20 md:pt-0">
          <h1 className="font-display text-[32px] font-bold leading-[1.1] text-cream md:text-[48px]">
            Page not found
          </h1>
        </div>
      </section>

      <main className="flex-1 px-6 py-16 text-center md:px-14 md:py-24">
        <p className="mx-auto max-w-[480px] font-body text-[15px] leading-relaxed text-[#5a564e]">
          That page doesn&apos;t exist, or the link may be out of date. Here are a few
          places to pick back up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-[9px] bg-ocean px-6 py-3.5 font-ui text-[15px] font-semibold text-cream hover:bg-ocean-dark"
          >
            Go to homepage
          </Link>
          <Link
            href="/golf-courses/"
            className="rounded-[9px] border border-[#e3ddcf] bg-white px-6 py-3.5 font-ui text-[15px] font-semibold text-ink hover:border-ocean"
          >
            Browse courses
          </Link>
          <Link
            href="/quote/"
            className="rounded-[9px] border border-[#e3ddcf] bg-white px-6 py-3.5 font-ui text-[15px] font-semibold text-ink hover:border-ocean"
          >
            Get a quote
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
