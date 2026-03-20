import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const Intro = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-screen h-screen overflow-hidden relative flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[#fcfcfc]"
      style={{ backgroundImage: 'url("/intro-bg.png")' }}
    >
       {/* Transparentní overlay pro lehký stín pod textem (volitelné, jinak nic neni potreba) */}
       <div className="absolute inset-0 bg-black/5 pointer-events-none" />
       
       {/* CTA Vstoupit do aplikace zarovnané do pravého dolního rohu */}
       <div className="absolute bottom-12 right-12 z-20">
         <Button 
           onClick={() => navigate('/dashboard')}
           className="h-16 px-10 bg-white text-[#c8102e] hover:bg-[#fcf4f5] rounded-xl shadow-2xl font-bold text-[20px] tracking-wide flex items-center gap-3 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
         >
           Vstoupit do aplikace <ArrowRight size={24} className="ml-2" />
         </Button>
       </div>
    </div>
  );
};
