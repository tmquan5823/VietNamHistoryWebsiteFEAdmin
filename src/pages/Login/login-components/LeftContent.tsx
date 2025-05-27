import HeroImage from "../../../components/common/HeroImage";

const LeftContent = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#5D4137]/70 relative">
      <div className="absolute inset-0 bg-[url('/images/behind-hero.webp')] bg-cover bg-center opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center px-16 text-white w-full">
        <div className="text-center mb-7">
          <h1 className="text-5xl font-bold mb-2">Việt Sử</h1>
          <p className="text-base opacity-90 max-w-md">
            Khám phá lịch sử, văn hóa và các di sản quý giá của Việt Nam qua các
            thời kỳ
          </p>
        </div>
        <HeroImage
          containerWidth="400px"
          containerHeight="400px"
          flagWidth="60%"
          flagPosition={{
            top: "-8%",
            right: "25%",
          }}
          hasBorder={true}
        />
      </div>
    </div>
  );
};

export default LeftContent;
