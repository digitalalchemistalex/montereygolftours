export default function LogoStyleSamplePage() {
  return (
    <div className="min-h-screen bg-[#16242c] px-6 py-16">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-16">
        <Variant
          label="Base — Monterey in blue, pink line, GOLf mixed case"
          monthereyColor="#2C6E8E"
          golfColor="#2C6E8E"
          lineColor="#E8A0A8"
        />

        <Variant
          label="Embossed — layered shadow for a carved/pressed effect"
          monthereyColor="#2C6E8E"
          golfColor="#2C6E8E"
          lineColor="#E8A0A8"
          embossed
        />

        <Variant
          label="Pink and gold"
          monthereyColor="#E8A0A8"
          golfColor="#C9A227"
          lineColor="#C9A227"
        />

        <Variant
          label="Blue and gold"
          monthereyColor="#2C6E8E"
          golfColor="#C9A227"
          lineColor="#C9A227"
        />
      </div>
    </div>
  );
}

function Variant({
  label,
  monthereyColor,
  golfColor,
  lineColor,
  embossed,
}: {
  label: string;
  monthereyColor: string;
  golfColor: string;
  lineColor: string;
  embossed?: boolean;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-[#0f171a] px-10 py-12">
      <p className="mb-6 font-sans text-sm text-[#a8ada9]">{label}</p>
      <div className="flex flex-col items-center">
        <div
          style={{
            fontFamily: "'Firlest', serif",
            fontSize: "72px",
            color: monthereyColor,
            letterSpacing: "0px",
            lineHeight: 1,
            textShadow: embossed
              ? "0 1px 0 rgba(255,255,255,.35), 0 -1px 1px rgba(0,0,0,.6), 0 2px 3px rgba(0,0,0,.4)"
              : undefined,
          }}
        >
          MonTeReY
        </div>
        <div
          className="mt-[6px] h-[3px] w-[330px]"
          style={{ backgroundColor: lineColor }}
        />
        <div
          className="mt-3"
          style={{
            fontFamily: "'Firlest', serif",
            fontSize: "36px",
            color: golfColor,
            letterSpacing: "1px",
            lineHeight: 1,
            textShadow: embossed
              ? "0 1px 0 rgba(255,255,255,.3), 0 -1px 1px rgba(0,0,0,.5)"
              : undefined,
          }}
        >
          GOLf TOURS
        </div>
      </div>
    </div>
  );
}
