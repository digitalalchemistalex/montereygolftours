type LogoProps = {
  className?: string;
  variant?: "dark-bg" | "light-bg" | "dark-bg-blue";
  style?: React.CSSProperties;
};

export default function Logo({ className, variant = "dark-bg", style }: LogoProps) {
  let lineColor = "#2C6E8E";
  let outlineColor = "#2C6E8E";
  let golfToursColor = "#2C6E8E";

  if (variant === "dark-bg") {
    lineColor = "#A8D4E8";
    outlineColor = "#F6F2E7";
    golfToursColor = "#CDE6F2";
  } else if (variant === "dark-bg-blue") {
    lineColor = "#A8D4E8";
    outlineColor = "#A8D4E8";
    golfToursColor = "#A8D4E8";
  }

  const monthereyFill = "#E8A0A8";

  return (
    <svg
      viewBox="0 0 700 190"
      className={className}
      style={style}
      role="img"
      aria-label="Monterey Golf Tours"
    >
      <line x1="20" y1="82" x2="680" y2="82" stroke={lineColor} strokeWidth="1.5" />
      <text
        x="350"
        y="95"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="46"
        letterSpacing="2"
        fill={monthereyFill}
        stroke={outlineColor}
        strokeWidth="1.2"
        paintOrder="stroke"
      >
        MONTEREY
      </text>
      <text
        x="350"
        y="132"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="500"
        fontSize="26"
        letterSpacing="5"
        fill={golfToursColor}
      >
        GOLF TOURS
      </text>
    </svg>
  );
}
