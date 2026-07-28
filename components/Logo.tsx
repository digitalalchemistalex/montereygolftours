import Image from "next/image";

export default function Logo({
  className,
  size = 64,
  showText = true,
  color = "#D4B073",
}: {
  className?: string;
  size?: number;
  showText?: boolean;
  color?: string;
}) {
  // Image sized down relative to text so the two read as one balanced unit —
  // text is the dominant element, image is a compact mark beside it.
  const imageSize = Math.round(size * 0.78);
  const nameSize = Math.round(size * 0.355);
  const subSize = Math.round(size * 0.185);

  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/brand/logo.png"
        alt="Monterey Golf Tours"
        width={imageSize}
        height={imageSize}
        priority
        style={{ width: imageSize, height: imageSize, objectFit: "contain", flexShrink: 0 }}
      />
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontFamily: "'Firlest', serif",
              fontSize: nameSize,
              lineHeight: 1,
              color,
              textShadow: "0 1px 0 rgba(255,255,255,.25), 0 -1px 1px rgba(0,0,0,.55), 0 2px 3px rgba(0,0,0,.35)",
              whiteSpace: "nowrap",
            }}
          >
            MonTeReY
          </div>
          <div style={{ marginTop: Math.max(3, size * 0.045), height: Math.max(1.5, size * 0.015), width: "100%", backgroundColor: color, opacity: 0.85 }} />
          <div
            style={{
              marginTop: Math.max(3, size * 0.045),
              fontFamily: "'Firlest', serif",
              fontSize: subSize,
              lineHeight: 1,
              letterSpacing: "1px",
              color,
              textShadow: "0 1px 0 rgba(255,255,255,.2), 0 -1px 1px rgba(0,0,0,.45)",
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
