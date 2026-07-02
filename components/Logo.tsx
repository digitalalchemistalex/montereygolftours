export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`}>
      <div className="inline-block">
        <div
          className="text-[42px] leading-none sm:text-[56px] md:text-[64px] lg:text-[72px]"
          style={{
            fontFamily: "'Firlest', serif",
            color: "#2C6E8E",
            textShadow:
              "0 1px 0 rgba(255,255,255,.35), 0 -1px 1px rgba(0,0,0,.6), 0 2px 3px rgba(0,0,0,.4)",
          }}
        >
          MonTeReY
        </div>
        <div
          className="mt-[4px] h-[2px] w-full sm:mt-[5px] md:mt-[6px] md:h-[3px] lg:h-[4px]"
          style={{ backgroundColor: "#E8A0A8" }}
        />
      </div>
      <div
        className="mt-2 text-[21px] leading-none tracking-[1px] sm:mt-2.5 sm:text-[28px] md:text-[32px] lg:text-[36px]"
        style={{
          fontFamily: "'Firlest', serif",
          color: "#2C6E8E",
          textShadow: "0 1px 0 rgba(255,255,255,.3), 0 -1px 1px rgba(0,0,0,.5)",
        }}
      >
        GOLf TOURS
      </div>
    </div>
  );
}
