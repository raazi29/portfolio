import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface KeycapButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const KeycapButton: React.FC<KeycapButtonProps> = ({ 
  children, 
  href, 
  onClick, 
  className 
}) => {
  const ButtonComponent = href ? 'a' : 'button';
  
  return (
    <ButtonComponent
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-block overflow-hidden cursor-pointer select-none",
        "px-6 py-4 rounded-[10px]",
        "bg-gradient-to-b from-[#282828] to-[#202020]",
        "transition-all duration-100 ease-in-out",
        "transform active:translate-y-0.5",
        "focus:outline-none",
        // Main keycap shadows
        "shadow-[inset_-8px_0_8px_rgba(0,0,0,0.15),inset_0_-8px_8px_rgba(0,0,0,0.25),0_0_0_2px_rgba(0,0,0,0.75),10px_20px_25px_rgba(0,0,0,0.4)]",
        "active:shadow-[inset_-4px_0_4px_rgba(0,0,0,0.1),inset_0_-4px_4px_rgba(0,0,0,0.15),0_0_0_2px_rgba(0,0,0,0.5),5px_10px_15px_rgba(0,0,0,0.3)]",
        // Keycap top surface (::before equivalent)
        "before:content-[''] before:absolute before:top-[3px] before:left-[4px] before:bottom-[14px] before:right-[12px]",
        "before:bg-gradient-to-r before:from-[#232323] before:to-[#4a4a4a]",
        "before:rounded-[10px]",
        "before:shadow-[-10px_-10px_10px_rgba(255,255,255,0.25),10px_5px_10px_rgba(0,0,0,0.15)]",
        "before:border-l before:border-l-[rgba(0,0,0,0.267)]",
        "before:border-b before:border-b-[rgba(0,0,0,0.267)]",
        "before:border-t before:border-t-[rgba(0,0,0,0.6)]",
        "before:transition-all before:duration-100 before:ease-in-out",
        "active:before:top-[5px] active:before:left-[5px] active:before:bottom-[11px] active:before:right-[11px]",
        "active:before:shadow-[-5px_-5px_5px_rgba(255,255,255,0.15),5px_3px_5px_rgba(0,0,0,0.1)]",
        className
      )}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <span className="relative z-10 flex items-center text-[#e9e9e9] font-medium text-sm transition-transform duration-100 ease-in-out group-active:translate-y-px">
        {children}
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </ButtonComponent>
  );
};

export default KeycapButton;
