import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children }) => {
  return (
    <div className={cn("bg-white text-[#222222] rounded-xl shadow-modern-card", className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => {
  return (
    <div className={cn("p-8 md:p-10 flex flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h3 className={cn("text-3xl font-bold text-[#222222]", className)}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children }) => {
  return (
    <div className={cn("p-8 md:p-10 pt-0", className)}>
      {children}
    </div>
  );
};
