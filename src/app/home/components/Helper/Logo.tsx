import React from 'react';


const Logo = () => {
  return (
    <div className="flex flex-col items-start sm:items-center space-y-1">
    <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-white text-xl font-bold ">🏠</span>
             </div>      
            <div className='flex flex-col align-items gap-0'>
               <h1 className="text-lg font-bold text-[var(--brand-text-primary)]">TRIVERSE</h1>
            </div>
          </div>
      
    </div>
  );
};

export default Logo;
