import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({ className, variant = "primary", size = "default", children, ...props }, ref) => {
  const variants = {
    primary: "bg-[#c8102e] text-white hover:bg-[#a00c24] border-transparent",
    secondary: "bg-white text-[#222222] border border-[#d5d5d5] hover:border-[#222222]",
    ghost: "bg-transparent text-[#555] hover:text-[#222222] hover:bg-[#f4f4f4]",
  };
  
  const sizes = {
    default: "h-11 px-6 py-2 text-[14px]",
    sm: "h-9 px-4 text-[13px]",
    lg: "h-[52px] px-8 text-[15px]",
    icon: "h-11 w-11 flex items-center justify-center"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-[4px]", // Slight rounding like screenshot
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
