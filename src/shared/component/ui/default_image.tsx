import Image from "next/image";
import LoadingComponent from "./loading/loading_component";
import { useState } from "react";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  onError?: () => void;
  style?: React.CSSProperties;
  sizes?: string;
}

const DefaultImage: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  onError,
  style,
  sizes = "100vw",
  loading = "lazy",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <LoadingComponent />
        </div>
      )}

      <Image
        src={src}
        alt={alt ?? ""}
        fill
        unoptimized
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          onError?.();
        }}
        style={style ?? { objectFit: "contain" }}
        loading={loading}
        sizes={sizes}
      />
    </div>
  );
};

export default DefaultImage;
