export default function LogoStyleSamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-16">
        <div className="flex flex-col items-center">
          <p className="mb-6 font-sans text-sm text-[#8a857a]">
            Firlest — mixed case, tight underline, pink line / blue Golf Tours
          </p>
          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "72px",
                color: "#1A1A1A",
                letterSpacing: "0px",
                lineHeight: 1,
              }}
            >
              MonTeReY
            </div>
            <div
              className="mt-[6px] h-[3px] w-[380px]"
              style={{ backgroundColor: "#E8A0A8" }}
            />
            <div
              className="mt-3"
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "36px",
                color: "#2C6E8E",
                letterSpacing: "1px",
                lineHeight: 1,
              }}
            >
              GOLF TOURS
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-xl bg-[#16242c] px-10 py-12">
          <p className="mb-6 font-sans text-sm text-[#a8ada9]">Same, on dark background</p>
          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "72px",
                color: "#F6F2E7",
                letterSpacing: "0px",
                lineHeight: 1,
              }}
            >
              MonTeReY
            </div>
            <div
              className="mt-[6px] h-[3px] w-[380px]"
              style={{ backgroundColor: "#E8A0A8" }}
            />
            <div
              className="mt-3"
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "36px",
                color: "#7FC4E8",
                letterSpacing: "1px",
                lineHeight: 1,
              }}
            >
              GOLF TOURS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
