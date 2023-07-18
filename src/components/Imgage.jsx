import { useState } from "react";
export default function Image (prop) {
    const [imageSrc, setImageSrc] = useState(prop.src);
    const handleImageError = () => {
        setImageSrc('/notfound.svg');
      };
    return (<img
        style={prop.style}
        src={imageSrc}
        srcSet={imageSrc}
        alt={prop.alt}
        onError={handleImageError}
    />);
}