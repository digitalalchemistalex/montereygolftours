import Image from "next/image";

export default function Logo({
  className,
  size = 64,
  showText = true,
  textColor = "#f6f2e7",
}: {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}) {
  // Text scales proportionally with the logo image size so header/footer
  // stay balanced automatically at any size prop.
  const nameSize = Math.round(size * 0.30);
  const subSize = Math.round(size * 0.15);

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
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: nameSize,
              color: textColor,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Monterey
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: nameSize,
              color: textColor,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: nameSize * 0.05,
              whiteSpace: "nowrap",
            }}
          >
            Golf Tours
          </span>
        </div>
      )}
    </div>
  );
}
