import Logo from "@/components/Logo";

export default function LogoSamplePage() {
  return (
    <div className="space-y-16">
      <div className="bg-[#FAF6EE] px-6 py-16">
        <p className="mb-6 font-sans text-sm text-[#8a857a]">
          What you approved (blue outline, blue &ldquo;GOLF TOURS&rdquo;), shown on the white background it was tested on
        </p>
        <Logo variant="light-bg" className="h-24 w-auto" />
      </div>

      <div className="bg-[#16242c] px-6 py-16">
        <p className="mb-6 font-sans text-sm text-[#a8ada9]">
          What&apos;s currently live (white outline, light-blue &ldquo;GOLF TOURS&rdquo;) &mdash; changed for dark-background contrast without showing you first
        </p>
        <Logo variant="dark-bg" className="h-24 w-auto" />
      </div>

      <div className="bg-[#16242c] px-6 py-16">
        <p className="mb-6 font-sans text-sm text-[#a8ada9]">
          Option: keep it blue-family, just brightened for contrast (light sky-blue outline + text instead of white/pale-blue)
        </p>
        <Logo variant="dark-bg-blue" className="h-24 w-auto" />
      </div>

      <div className="bg-[#16242c] px-6 py-16">
        <p className="mb-4 font-sans text-sm text-[#a8ada9]">Size reference at 64px, blue-family option, in context</p>
        <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,.04)] px-6 py-6">
          <Logo variant="dark-bg-blue" className="h-16 w-auto" />
          <div className="flex gap-6 font-sans text-sm text-[#f3efe2]">
            <span>Courses</span>
            <span>Hotels</span>
            <span>Destinations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
