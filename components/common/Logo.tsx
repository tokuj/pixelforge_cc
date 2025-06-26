import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'icon';
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  width,
  height 
}) => {
  if (variant === 'icon') {
    return (
      <Image 
        src="/icon.svg" 
        alt="PixelForge" 
        width={width || 40} 
        height={height || 40}
        priority 
      />
    );
  }
  
  return (
    <Image 
      src="/logo.svg" 
      alt="PixelForge" 
      width={width || 160} 
      height={height || 48} 
      priority 
    />
  );
};