import React, { ReactNode } from 'react';

interface SectionContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
  titleColor?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subtitle,
  children,
  className = '',
  titleColor = 'text-[#5D4137]'
}) => {
  return (
    <div className={`w-full py-16 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center ${titleColor} mb-4`}>
          {title}
        </h2>
        <p className="text-center text-[#5D4137]/80 mb-12 max-w-3xl mx-auto">
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
};

export default SectionContainer; 