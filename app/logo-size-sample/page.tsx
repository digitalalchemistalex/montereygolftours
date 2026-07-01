import Logo from "@/components/Logo";

const SIZES = [
  { id: 1, label: "Current (h-9 / 36px)", heightClass: "h-9" },
  { id: 2, label: "h-14 (56px)", heightClass: "h-14" },
  { id: 3, label: "h-16 (64px)", heightClass: "h-16" },
  { id: 4, label: "h-20 (80px)", heightClass: "h-20" },
  { id: 5, label: "h-24 (96px)", heightClass: "h-24" },
];

export default function LogoSizeSamplePage() {
  return (
    <div className="min-h-screen bg-[#16242c] px-6 py-16">
      <div className="mx-auto max-w-[820px] space-y-12">
        {SIZES.map((s) => (
          <div key={s.id} className="border-b border-[rgba(255,255,255,.1)] pb-10">
            <p className="mb-4 font-sans text-sm text-[#a8ada9]">{s.label}</p>
            <Logo variant="dark-bg" className={`${s.heightClass} w-auto`} />
          </div>
        ))}

        <div className="pt-4">
          <p className="mb-4 font-sans text-sm text-[#a8ada9]">
            In context, next to real header nav text (h-16 shown as example)
          </p>
          <div className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,.04)] px-6 py-6">
            <Logo variant="dark-bg" className="h-16 w-auto" />
            <div className="flex gap-6 font-sans text-sm text-[#f3efe2]">
              <span>Courses</span>
              <span>Hotels</span>
              <span>Destinations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
