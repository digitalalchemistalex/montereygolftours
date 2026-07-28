import Image from "next/image";

export default function Logo({
  className,
  size = 64,
  showText = true,
  color = "#f6f2e7",
}: {
  className?: string;
  size?: number;
  showText?: boolean;
  color?: string;
}) {
  // Original wordmark proportions (MonTeReY at ~72px / GOLf TOURS at ~36px on
  // the old standalone logo) scaled down to sit beside the image at any size.
  const nameSize = Math.round(size * 0.34);
  const subSize = Math.round(size * 0.19);

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/brand/logo.png"
        alt="Monterey Golf Tours"
        width={size}
        height={size}
        priority
        style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }}
      />
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "inline-block" }}>
            <div
              style={{
                fontFamily: "'Firlest', serif",
                fontSize: nameSize,
                lineHeight: 1,
                color,
                textShadow: "0 1px 0 rgba(255,255,255,.35), 0 -1px 1px rgba(0,0,0,.6), 0 2px 3px rgba(0,0,0,.4)",
                whiteSpace: "nowrap",
              }}
            >
              MonTeReY
            </div>
            <div style={{ marginTop: Math.max(2, size * 0.02), height: Math.max(2, size * 0.02), width: "100%", backgroundColor: "#E8A0A8" }} />
          </div>
          <div
            style={{
              marginTop: size * 0.03,
              fontFamily: "'Firlest', serif",
              fontSize: subSize,
              lineHeight: 1,
              letterSpacing: "1px",
              color,
              textShadow: "0 1px 0 rgba(255,255,255,.3), 0 -1px 1px rgba(0,0,0,.5)",
              whiteSpace: "nowrap",
            }}
          >
            GOLf TOURS
          </div>
        </div>
      )}
    </div>
  );
}
