import Image from "next/image";

export default function Logo({
  className,
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/brand/logo.png"
        alt="Monterey Golf Tours"
        width={size}
        height={size}
        priority
        style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }}
      />
    </div>
  );
}
