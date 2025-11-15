'use client';

import React from 'react';
import Link from 'next/link';
import { navLinks } from '@/app/home/components/constant/constant';

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNavbar: React.FC<Props> = ({ showNav, closeNav }) => {
  const navOpen = showNav ? 'translate-x-0' : '-translate-x-full';

  return (
      <div className="md:hidden">
        {/* Overlay */}
        {showNav && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[1001]"
                onClick={closeNav}
            />
        )}

        
        <div
            className={`fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-white z-[1002] transform ${navOpen} transition-transform duration-300 ease-in-out shadow-lg`}
            onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-white text-lg font-bold">🏠</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-800">TRIVERSE</h1>
                   <nav className="flex flex-row space-y-6 px-6 pt-6">
                    {navLinks.map((link) => (
                     <Link href={link.url} key={link.id} >
                    <p className="text-lg font-medium text-gray-800 border-b border-gray-300 pb-2 hover:text-yellow-500 transition">
                    {link.label}
                  </p>
                </Link>
            ))}
          </nav>
              </div>
              
            </div>

          </div>

          
        </div>
      </div>
  );
};

export default MobileNavbar;
