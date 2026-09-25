import { useState } from 'react';

const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23fff3f6"/%3E%3Cstop offset="1" stop-color="%23e8afc0"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1200" height="800" fill="url(%23g)"/%3E%3Cellipse cx="380" cy="410" rx="210" ry="120" fill="%23ffffff" fill-opacity=".58" transform="rotate(-22 380 410)"/%3E%3Cellipse cx="760" cy="320" rx="170" ry="100" fill="%23ffffff" fill-opacity=".42" transform="rotate(28 760 320)"/%3E%3Ccircle cx="600" cy="430" r="88" fill="%23d99aae" fill-opacity=".45"/%3E%3C/svg%3E';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ fallbackSrc = fallbackImage, src, ...props }: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      {...props}
      src={imageSrc}
      onError={(event) => {
        props.onError?.(event);
        setImageSrc(fallbackSrc);
      }}
    />
  );
}