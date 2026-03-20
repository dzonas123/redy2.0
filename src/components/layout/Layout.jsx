import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, FileText, Settings, Sparkles, Map, PenTool, Tv } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Layout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Přehled', href: '/dashboard', icon: LayoutDashboard },
    { name: 'V1: Kroková Cesta', href: '/journey', icon: Sparkles },
    { name: 'V2: Životní Mapa (AI)', href: '/map', icon: Map },
    { name: 'V3: AI Zápisník', href: '/notes', icon: PenTool },
    { name: 'V4: Discovery (B2B2C)', href: '/discovery', icon: Tv },
    { name: 'Databáze Klientů', href: '/clients', icon: Users },
    { name: 'AI Doporučení', href: '/insights', icon: Shield },
    { name: 'Dokumenty', href: '#', icon: FileText },
    { name: 'Nastavení', href: '#', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f8fa] font-sans text-[#222]">
      
      {/* Levý Sidebar (Expandovatelný na přejetí) */}
      <aside 
        className="group bg-white border-r border-gray-100 shadow-[5px_0_20px_rgba(0,0,0,0.03)] z-30 flex flex-col h-full 
                   w-[76px] hover:w-[260px] transition-all duration-300 ease-in-out shrink-0 overflow-hidden relative"
      >
        <div className="flex flex-col h-full py-6">
          
          <div className="flex flex-col gap-2 px-3 flex-1 mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-4 px-3 py-3.5 rounded-xl transition-all relative whitespace-nowrap overflow-hidden",
                    isActive 
                      ? "bg-[#c8102e] text-white shadow-md" 
                      : "text-[#555] hover:bg-gray-50 hover:text-[#222]"
                  )}
                >
                  <item.icon 
                    size={24} 
                    className={cn(
                      "shrink-0 transition-colors", 
                      isActive ? "text-white" : "text-[#555] group-hover:text-[#c8102e]"
                    )} 
                  />
                  
                  {/* Text se objeví pouze při najetí na celý sidebar */}
                  <span className={cn(
                    "font-bold text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out",
                    isActive ? "text-white" : "text-[#222]"
                  )}>
                    {item.name}
                  </span>

                  {/* Indikátor aktivního stavu */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/50 rounded-r-md opacity-0 transition-opacity" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Profil poradce dole v sidebaru - Odhlášení */}
          <div className="mt-auto px-3 border-t border-gray-100 pt-6">
            <Link 
              to="/"
              className="group/logout flex items-center justify-between gap-2 px-2 py-2 rounded-xl transition-colors hover:bg-gray-50 cursor-pointer whitespace-nowrap overflow-hidden relative"
            >
               <div className="flex flex-row items-center gap-4 w-full">
                 <div className="w-10 h-10 shrink-0 rounded-full bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center font-bold text-[14px] border border-[#f5d0d4]">
                   JŠ
                 </div>
                 
                 <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                   <span className="text-[14px] font-bold text-[#222]">Jan Špaňhel</span>
                   <span className="text-[12px] text-[#888] font-medium group-hover/logout:text-[#c8102e] flex items-center gap-1 transition-colors">
                     Odhlásit se
                   </span>
                 </div>
               </div>
            </Link>
          </div>

        </div>
      </aside>

      {/* Pravá část: Hlavní obsah bez top hlavičky */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 w-full">
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
