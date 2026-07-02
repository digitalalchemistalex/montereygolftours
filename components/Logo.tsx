export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start ${className ?? ""}`}>
      <div
        className="text-[34px] leading-none md:text-[52px]"
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
        className="mt-[3px] h-[2px] md:mt-[5px] md:h-[3px]"
        style={{ width: "68%", backgroundColor: "#E8A0A8" }}
      />
      <div
        className="mt-1.5 text-[17px] leading-none tracking-[1px] md:mt-2.5 md:text-[26px]"
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
