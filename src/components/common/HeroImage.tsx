interface HeroImageProps {
  containerWidth?: string;
  containerHeight?: string;
  flagWidth?: string;
  flagPosition?: {
    top?: string;
    right?: string;
  };
  hasBorder?: boolean;
}

const HeroImage = ({
  containerWidth = "400px",
  containerHeight = "400px",
  flagWidth = "60%",
  flagPosition = {
    top: "-8%",
    right: "25%",
  },
  hasBorder = true,
}: HeroImageProps) => {
  return (
    <div
      className={`
        relative ${hasBorder ? "border-4 border-[#FDDAA7]" : ""} 
        rounded-2xl flex items-center justify-center
      `}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      <img
        src={import.meta.env.BASE_URL + "images/hero.webp"}
        alt="hero"
        className="w-full h-full object-contain"
      />
      <div
        className="absolute"
        style={{
          width: flagWidth,
          maxWidth: "240px",
          top: flagPosition.top,
          right: flagPosition.right,
          transform: "rotate(-23deg)",
        }}
      >
        <img
          src={import.meta.env.BASE_URL + "images/vn-flag-full.gif"}
          alt="hero"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HeroImage;
