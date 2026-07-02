export default function LogoStyleSamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-16">
        <div className="flex flex-col items-center">
          <p className="mb-6 font-sans text-sm text-[#8a857a]">
            Firlest — black on cream, as uploaded
          </p>
          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "64px",
                color: "#1A1A1A",
                letterSpacing: "2px",
              }}
            >
              MONTEREY
            </div>
            <div className="mt-2 h-[2px] w-[420px]" style={{ backgroundColor: "#1A1A1A" }} />
            <div
              className="mt-4"
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "40px",
                color: "#1A1A1A",
                letterSpacing: "4px",
              }}
            >
              GOLF TOURS
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-6 font-sans text-sm text-[#8a857a]">
            Firlest — ocean blue accent line
          </p>
          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "64px",
                color: "#1A1A1A",
                letterSpacing: "2px",
              }}
            >
              MONTEREY
            </div>
            <div className="mt-2 h-[2px] w-[420px]" style={{ backgroundColor: "#2C6E8E" }} />
            <div
              className="mt-4"
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "40px",
                color: "#2C6E8E",
                letterSpacing: "4px",
              }}
            >
              GOLF TOURS
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-xl bg-[#16242c] px-10 py-12">
          <p className="mb-6 font-sans text-sm text-[#a8ada9]">Firlest — reversed for dark backgrounds (header/footer)</p>
          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "64px",
                color: "#F6F2E7",
                letterSpacing: "2px",
              }}
            >
              MONTEREY
            </div>
            <div className="mt-2 h-[2px] w-[420px]" style={{ backgroundColor: "#F6F2E7" }} />
            <div
              className="mt-4"
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: "40px",
                color: "#F6F2E7",
                letterSpacing: "4px",
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
