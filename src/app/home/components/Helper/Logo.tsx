import React from 'react';
import { Building2 } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2.5 group cursor-pointer">
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-primary/40">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Building2 className="w-5 h-5 text-brand-text-primary relative z-10 transition-transform duration-300 group-hover:rotate-3" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-extrabold bg-gradient-to-r from-brand-text-primary via-brand-text-primary to-brand-text-secondary bg-clip-text text-transparent leading-tight tracking-tight">
          TRIVERSE
        </h1>
      </div>
    </div>
  );
};

export default Logo;
