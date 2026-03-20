import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, TrendingUp, Users, Clock, AlertCircle, ArrowRight, ShieldCheck, PieChart, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#222] pb-24 px-6 lg:px-12 pt-10">
      
      <div className="max-w-[1400px] mx-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-semibold text-[#222] mb-2 tracking-tight">Dobrý den, Jane</h1>
          <p className="text-[16px] text-[#888] font-light">
            Váš přehled klientského portfolia a AI doporučení na dnešní den.
          </p>
        </div>

        {/* Action Widgets - Centered modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="col-span-1 md:col-span-2 bg-[#c8102e] text-white border-0 shadow-modern-card overflow-hidden relative">
            {/* Subtle decorative background shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between relative z-10 h-full">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles size={24} className="text-white" />
                    <span className="font-bold tracking-wider text-[13px] uppercase text-white/90">REDy 2.0 Asistent</span>
                  </div>
                  <h2 className="text-[28px] font-semibold mb-4 leading-tight">Spustit novou analýzu potřeb</h2>
                  <p className="text-white/80 font-light text-[15px] max-w-md">
                    Inovativní rozhovor s klientem řízený umělou inteligencí. Zjistěte detaily o rodinné a finanční situaci během pár minut.
                  </p>
               </div>
               <Link to="/journey" className="mt-8 md:mt-0 shrink-0">
                 <Button className="bg-white text-[#c8102e] hover:bg-gray-100 shadow-sm h-[52px] px-8 text-[15px] rounded-md">
                   Nová Cesta Klienta <ArrowRight size={18} className="ml-2" />
                 </Button>
               </Link>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-0 shadow-modern-card flex flex-col justify-center border-t-4 border-[#c8102e]">
             <CardContent className="p-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 rounded-full bg-[#fdf2f3] flex items-center justify-center text-[#c8102e]">
                     <AlertCircle size={24} />
                   </div>
                   <span className="bg-[#f4f4f4] text-[#888] text-[11px] uppercase font-bold px-2 py-1 rounded-sm">AI Tip</span>
                </div>
                <h3 className="text-[20px] font-semibold text-[#222] mb-3">Ztráta hodnoty vlivem inflace</h3>
                <p className="text-[#555] font-light text-[14px] leading-relaxed mb-6">
                  Identifikovali jsme 12 klientů s vysokým podílem hotovosti.
                </p>
                <Button variant="secondary" className="w-full" onClick={() => navigate('/insights')}>
                  Zobrazit Analýzu
                </Button>
             </CardContent>
          </Card>
        </div>

        {/* Stats and Lists - Clean white cards on light grey */}
        <h3 className="text-[20px] font-bold text-[#222] mb-6 border-b border-gray-200 pb-4">Statistiky Portfolia</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Aktivní Klienti", value: "142", icon: Users },
            { label: "Otevřené Analýzy", value: "8", icon: Activity },
            { label: "Úspěšnost Uzavření", value: "84%", icon: PieChart },
            { label: "Dokončeno Dnes", value: "2", icon: ShieldCheck }
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow-modern-card hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[13px] font-medium text-[#888] uppercase tracking-wide">{stat.label}</span>
                  <stat.icon size={20} className="text-[#d5d5d5]" strokeWidth={2} />
                </div>
                <p className="text-[36px] font-bold text-[#222] tracking-tight">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           <Card className="border-0 shadow-modern-card">
              <CardHeader className="border-b border-gray-100 pb-6">
                <CardTitle className="text-[20px]">Nedávná historie</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {[
                    { name: "Martina Nováková", topic: "Optimalizace Pojištění", date: "Dnes, 14:30", status: "Návrh Připraven" },
                    { name: "Petr Svoboda", topic: "Revize Rizikového životního pojištění", date: "Včera, 09:15", status: "Rozpracováno" },
                    { name: "Rodina Dvořákova", topic: "Zabezpečení Dětí", date: "Pondělí, 16:00", status: "Dokončeno" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => navigate('/journey')}>
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] bg-[#f4f4f4] text-[#555] border border-gray-200 shrink-0">
                          {activity.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#222] text-[16px]">{activity.name}</p>
                          <p className="text-[13px] text-[#888] font-light mt-0.5">{activity.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-medium text-[#222] mb-0.5">{activity.status}</p>
                        <p className="text-[12px] text-[#888]">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
};
