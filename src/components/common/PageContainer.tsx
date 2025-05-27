// PageContainer component
export const PageContainer: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="w-full mx-auto">
    <div className="flex items-center bg-[#FDDAA7]/70 justify-between border-b border-gray-400 py-4 px-0 px-10">
      <h1 className="text-3xl font-bold text-[#2d3a4a]">{title}</h1>
      {/* Có thể đặt các action, nút ở đây nếu muốn */}
    </div>
    <div className="p-10 bg-white">{children}</div>
  </div>
);
