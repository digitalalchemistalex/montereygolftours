type LogoProps = {
  className?: string;
  variant?: "dark-bg" | "light-bg";
  style?: React.CSSProperties;
};

export default function Logo({ className, variant = "dark-bg", style }: LogoProps) {
  const lineColor = variant === "dark-bg" ? "#A8D4E8" : "#2C6E8E";
  const monthereyFill = "#E8A0A8";
  const outlineColor = variant === "dark-bg" ? "#F6F2E7" : "#2C6E8E";
  const golfToursColor = variant === "dark-bg" ? "#CDE6F2" : "#2C6E8E";

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
