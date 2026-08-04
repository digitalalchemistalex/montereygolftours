import Image from "next/image";

export default function Logo({
  className,
  size = 64,
}: {
  className?: string;
  size?: number;
  showText?: boolean;
  color?: string;
  onLight?: boolean;
}) {
  // New full-design logo (arc, coastline, wordmark) replaces the old
  // image+text lockup entirely — the artwork already contains the name.
  const imageSize = Math.round(size * 1.0);

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <Image
        src="/brand/logo.png"
        alt="Monterey Golf Course"
        width={imageSize}
        height={imageSize}
        priority
        style={{ width: imageSize, height: "auto", objectFit: "contain", flexShrink: 0 }}
      />
    </div>
  );
}
