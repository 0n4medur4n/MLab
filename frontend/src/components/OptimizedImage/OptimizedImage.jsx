import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  
  ${props => props.borderRadius && `border-radius: ${props.borderRadius};`}
  ${props => props.shadow && `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);`}
`;

const StyledImage = styled.img`
  width: 100%;
  height: ${props => props.height || "auto"};
  object-fit: ${props => props.objectFit || "cover"};
  transition: transform 0.3s ease;
  
  ${props => props.hoverEffect && `&:hover { transform: scale(1.05); }`}
  
  // Lazy loading styles
  &[data-loaded="false"] {
    opacity: 0;
  }
  
  &[data-loaded="true"] {
    opacity: 1;
  }
`;

const OptimizedImage = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "cover",
  borderRadius,
  shadow = false,
  hoverEffect = false,
  lazy = true,
  className,
  ...props
}) => {
  const [loaded, setLoaded] = React.useState(false);
  
  // Función para generar nombre de archivo optimizado
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return "";
    
    // En producción, aquí se conectaría con un servicio de optimización de imágenes
    // Por ahora, devolvemos la imagen original
    return originalSrc;
  };
  
  // Función para generar alt descriptivo si no se proporciona
  const generateDescriptiveAlt = (imageSrc, providedAlt) => {
    if (providedAlt && providedAlt.trim() !== "") {
      return providedAlt;
    }
    
    // Si no hay alt proporcionado, generar uno descriptivo basado en el nombre del archivo
    if (imageSrc) {
      const fileName = imageSrc.split('/').pop().split('.')[0];
      const descriptiveName = fileName
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      return `Imagen de ${descriptiveName}`;
    }
    
    return "Imagen";
  };
  
  const optimizedSrc = getOptimizedSrc(src);
  const descriptiveAlt = generateDescriptiveAlt(src, alt);
  
  return (
    <ImageWrapper 
      borderRadius={borderRadius}
      shadow={shadow}
      className={className}
    >
      <StyledImage
        src={optimizedSrc}
        alt={descriptiveAlt}
        width={width}
        height={height}
        objectFit={objectFit}
        hoverEffect={hoverEffect}
        loading={lazy ? "lazy" : "eager"}
        onLoad={() => setLoaded(true)}
        data-loaded={loaded}
        {...props}
      />
    </ImageWrapper>
  );
};

export default OptimizedImage;
