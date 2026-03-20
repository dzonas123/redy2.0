import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { 
  Mic, BrainCircuit, AlertTriangle, TrendingDown, 
  TrendingUp, Home, Baby, Car, Heart, ShieldAlert, Sparkles, Check, PieChart, Info
} from 'lucide-react';
import { cn } from '../utils/cn';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const MILESTONES_DB = [
  { id: 'house', title: 'Koupě Nemovitosti', icon: Home, age: 35, color: 'bg-blue-500' },
  { id: 'baby', title: 'Rodina a Děti', icon: Baby, age: 38, color: 'bg-purple-500' },
  { id: 'car', title: 'Koupě Voziidla', icon: Car, age: 42, color: 'bg-orange-500' },
  { id: 'retirement', title: 'Plánovaná Renta', icon: Heart, age: 65, color: 'bg-green-500' },
];

const SOLUTIONS_DB = [
  { id: 'zivotko', title: 'Rizikové životní pojištění', icon: ShieldAlert, description: 'Myslíme na vás i vaše blízké, aby byl život klidnější i v těžkých chvílích (plně pokryje dluh hypotéky).' },
  { id: 'investice', title: 'Investiční fondy a portfolia', icon: PieChart, description: 'Chytré zhodnocení vašich financí a budování robustní renty na stáří.' },
];

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-white/95 backdrop-blur-md p-4 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-gray-500 text-[12px] font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className={cn("text-[20px] font-black tracking-tight", val < 0 ? "text-[#c8102e]" : "text-gray-800")}>
          {val > 0 ? '+' : ''}{val.toFixed(1)} mil. Kč
        </p>
      </div>
    );
  }
  return null;
};

export const DiscoveryCore = () => {
  const [isListening, setIsListening] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState([]);
  
  // Scénář: Risk
  const [isRiskSimulated, setIsRiskSimulated] = useState(false);
  // Aplikovaná řešení (set of IDs)
  const [appliedSolutions, setAppliedSolutions] = useState(new Set());
  
  const [aiSuggestions, setAiSuggestions] = useState([]);
  
  const [formFields, setFormFields] = useState({
    income: '',
    savings: '',
    profession: ''
  });

  // Data pro Recharts
  const [chartData, setChartData] = useState([]);

  // Přepočet dat grafu na základě zapnutých řešení a rizik
  useEffect(() => {
     const hasZivotko = appliedSolutions.has('zivotko');
     const hasInvestice = appliedSolutions.has('investice');

     const data = [
       { age: '30 let', current: 0.5 },
       { age: '40 let', current: isRiskSimulated && !hasZivotko ? -4.5 : (hasInvestice ? 2.5 : 1.5) },
       { age: '50 let', current: isRiskSimulated && !hasZivotko ? -5.5 : (hasInvestice ? 6.0 : 2.5) },
       { age: '60 let', current: isRiskSimulated && !hasZivotko ? -6.0 : (hasInvestice ? 11.0 : 3.5) },
       { age: '70 let', current: isRiskSimulated && !hasZivotko ? -7.0 : (hasInvestice ? 18.0 : 3.5) }
     ];
     setChartData(data);
  }, [isRiskSimulated, appliedSolutions]);

  // Simulace rozhovoru po startu
  useEffect(() => {
    let timer1 = setTimeout(() => { setFormFields(prev => ({ ...prev, income: '85 000 Kč / měsíc' })); }, 2000);
    let timer2 = setTimeout(() => { setFormFields(prev => ({ ...prev, savings: '450 000 Kč (hotovost)' })); }, 4500);
    let timer3 = setTimeout(() => { 
      setFormFields(prev => ({ ...prev, profession: 'IT Architekt (OSVČ)' }));
      setAiSuggestions([{
        id: 'sug-house',
        text: 'Z řeči vyplývá zájem o vlastní bydlení na okraj Prahy s hypotékou cca 6M Kč. Přidat tento cíl do osy?',
        type: 'goal',
        actionData: MILESTONES_DB[0]
      }]);
    }, 7000);

    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  const handleAddMilestone = (milestone) => {
    if (!timelineEvents.find(e => e.id === milestone.id)) {
      setTimelineEvents([...timelineEvents, milestone].sort((a,b) => a.age - b.age));
      setAiSuggestions(prev => prev.filter(s => s.actionData?.id !== milestone.id));

      if (milestone.id === 'house') {
        setTimeout(() => {
          setAiSuggestions(prev => [...prev, {
            id: 'sug-risk',
            text: 'Fatální riziko zadlužrní! Bez adekvátního krytí živitele hrozí rodině krach. Simulejte klientovi tvrdou realitu výpadku příjmů.',
            type: 'risk',
            actionTask: 'SHOW_RISK'
          }]);
        }, 3000);
      }
    }
  };

  const toggleSolution = (solutionId) => {
    setAppliedSolutions(prev => {
      const next = new Set(prev);
      if (next.has(solutionId)) next.delete(solutionId);
      else next.add(solutionId);
      return next;
    });
  };

  const handleAcceptSuggestion = (suggestion) => {
    if (suggestion.type === 'goal') {
      handleAddMilestone(suggestion.actionData);
    } else if (suggestion.type === 'risk' && suggestion.actionTask === 'SHOW_RISK') {
      setIsRiskSimulated(true);
      setAiSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#222] flex overflow-hidden">
      
      {/* ========================================= */}
      {/* B2B: LEVÝ PANEL PORADCE (AI & Řešení) */}
      {/* ========================================= */}
      <div className="w-[450px] bg-white border-r border-[#c8102e]/10 h-screen flex flex-col shrink-0 z-30 shadow-[5px_0_20px_rgba(200,16,46,0.05)] relative">
        
        {/* Generali Header */}
        <div className="p-6 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-[#c8102e] to-[#a00c24] text-white">
          <div>
             <h2 className="font-bold text-[18px]">AI REDy 2.0 Poradce</h2>
             <span className="text-[12px] text-white/80 font-medium tracking-wide border border-white/30 px-2 py-0.5 rounded-md mt-1 inline-block">V4: Discovery Panel</span>
          </div>
          <div className="flex bg-white/10 px-3 py-1.5 rounded-full shadow-sm items-center gap-2 backdrop-blur-sm border border-white/20">
             <div className="relative flex items-center justify-center">
               {isListening && <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute w-full h-full bg-white rounded-full" />}
               <Mic size={14} className={isListening ? "text-white relative z-10" : "text-white/50"} />
             </div>
             <span className="text-[11px] font-bold text-white tracking-wider">ONLINE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-gray-50/30">
           
           {/* Data od AI */}
           <div>
              <h3 className="text-[12px] font-bold text-[#c8102e] uppercase tracking-widest mb-4 flex items-center gap-2"><BrainCircuit size={14}/> Extrahovaná Data z Hlasu</h3>
              <div className="space-y-4">
                 <div>
                   <label className="text-[11px] text-gray-500 font-bold ml-1">Zjištěný příjem</label>
                   <div className={cn("h-11 border rounded-lg px-4 flex items-center text-[14px] font-bold transition-all shadow-sm", formFields.income ? "bg-white border-gray-200 text-[#222]" : "bg-gray-50 border-gray-100 text-gray-400")}>
                     {formFields.income || 'Naslouchám...'}
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="text-[11px] text-gray-500 font-bold ml-1">Detail Povolání</label>
                     <div className={cn("h-11 border rounded-lg px-4 flex items-center text-[13px] font-bold transition-all shadow-sm", formFields.profession ? "bg-white border-gray-200 text-[#222]" : "bg-gray-50 border-gray-100 text-gray-400")}>
                       {formFields.profession || 'Naslouchám...'}
                     </div>
                   </div>
                   <div>
                     <label className="text-[11px] text-gray-500 font-bold ml-1">Úspory k dispozici</label>
                     <div className={cn("h-11 border rounded-lg px-4 flex items-center text-[13px] font-bold transition-all shadow-sm", formFields.savings ? "bg-white border-gray-200 text-[#222]" : "bg-gray-50 border-gray-100 text-gray-400")}>
                       {formFields.savings || 'Naslouchám...'}
                     </div>
                   </div>
                 </div>
              </div>
           </div>

           {/* Katalog rychlého přidání (pro poradce) */}
           <div>
              <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-4">Milníky k Modelaci</h3>
              <div className="grid grid-cols-2 gap-3">
                 {MILESTONES_DB.map(m => {
                   const isActive = timelineEvents.some(e => e.id === m.id);
                   return (
                     <button 
                       key={m.id}
                       onClick={() => handleAddMilestone(m)}
                       disabled={isActive}
                       className={cn("p-3 border rounded-xl flex items-center justify-start gap-3 transition-all shadow-sm", isActive ? "opacity-50 grayscale bg-gray-50" : "bg-white hover:border-[#c8102e] hover:shadow-md")}
                     >
                       <m.icon size={18} className={cn("text-gray-600", isActive ? "" : m.color.replace('bg-', 'text-'))} />
                       <span className="text-[12px] font-bold text-[#222] text-left leading-tight">{m.title}</span>
                     </button>
                   );
                 })}
              </div>
           </div>
           
           {/* Generali Návrhy a Doporučení */}
           <div className={cn("transition-opacity duration-1000", isRiskSimulated ? "opacity-100" : "opacity-30 pointer-events-none")}>
              <h3 className="text-[12px] font-bold text-[#c8102e] uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> Konkrétní Produktová Řešení</h3>
              
              <div className="space-y-3">
                 {SOLUTIONS_DB.map(sol => {
                   const isActive = appliedSolutions.has(sol.id);
                   return (
                     <div 
                        key={sol.id}
                        onClick={() => toggleSolution(sol.id)}
                        className={cn("p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm relative overflow-hidden group hover:shadow-md", isActive ? "bg-[#fcf4f5] border-[#c8102e]" : "bg-white border-gray-200")}
                     >
                        <div className="flex items-start gap-4 z-10 relative">
                           <div className={cn("w-6 h-6 rounded-md flex items-center justify-center shrink-0 border mt-0.5", isActive ? "bg-[#c8102e] border-transparent text-white" : "bg-white border-gray-300 text-transparent")}>
                              <Check size={14} strokeWidth={4} />
                           </div>
                           <div>
                              <p className={cn("font-bold text-[14px] leading-tight mb-1", isActive ? "text-[#c8102e]" : "text-[#222]")}>{sol.title}</p>
                              <p className="text-[12px] text-gray-500 leading-snug">{sol.description}</p>
                           </div>
                        </div>
                        {isActive && <div className="absolute right-0 bottom-0 top-0 w-1bg-[#c8102e] opacity-20 pointer-events-none"><div className="absolute -right-10 -bottom-10 w-24 h-24 bg-[#c8102e] blur-[30px] rounded-full" /></div>}
                     </div>
                   )
                 })}
              </div>
              <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1 font-medium"><Info size={12}/> Zakliknutím řešení reálně modelujete klientovi budoucí stav.</p>
           </div>
           
        </div>
      </div>

      {/* FLOAT ALERTY OD AI (Když najde riziko) */}
      <AnimatePresence>
         {aiSuggestions.map(s => (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 50 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.8, y: 50 }}
               key={s.id}
               className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-[600px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(200,16,46,0.3)] border border-[#f5d0d4] p-6 lg:ml-[225px]"
            >
               <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#fcf4f5] text-[#c8102e] rounded-full flex items-center justify-center shrink-0">
                     <AlertTriangle size={28} />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-[13px] font-black text-[#c8102e] uppercase tracking-widest mb-2 flex items-center gap-2">
                       Aktivováno AI Upozornění
                     </h4>
                     <p className="text-[15px] font-bold text-[#222] leading-relaxed mb-6">
                       {s.text}
                     </p>
                     <div className="flex gap-4">
                        <Button variant="secondary" onClick={() => setAiSuggestions([])} className="flex-1 h-12 bg-gray-50 text-gray-600 border-gray-200">
                          Ignorovat
                        </Button>
                        <Button onClick={() => handleAcceptSuggestion(s)} className="flex-1 h-12 bg-[#c8102e] hover:bg-[#a00c24] text-white font-bold tracking-wide shadow-lg">
                          PROVÉST SIMULACI DLUHU
                        </Button>
                     </div>
                  </div>
               </div>
            </motion.div>
         ))}
      </AnimatePresence>

      {/* ========================================= */}
      {/* B2C: PRAVÝ PANEL KLIENTA (Recharts UI) */}
      {/* ========================================= */}
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col pt-12 pb-16 px-16 z-10">
        
        {/* Jemná Červená Záře v pozadí */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fcf4f5] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-50" />

        {/* Hlavička B2C */}
        <div className="relative z-10 flex flex-col items-center mb-8 shrink-0">
           <img src="https://www.generaliceska.cz/cp-2020-theme/images/generali-ceska-pojistovna.svg" className="h-10 mb-8" alt="Generali" />
           <h1 className="text-[#222] text-[42px] font-black tracking-tight mb-4">Graf Vývoje Vašeho Majetku</h1>
           <p className="text-[#666] text-[18px] max-w-2xl mx-auto font-light leading-relaxed text-center">
             Tento profesionální model přesně kalkuluje vaší finanční budoucnost včetně dopadů krizových životních událostí a našich produktů.
           </p>
        </div>

        {/* Hlavní Recharts Kontejner */}
        <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto mt-4">
           <ResponsiveContainer width="100%" height="80%">
             <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
               
               <defs>
                 <linearGradient id="colorValueGood" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                 </linearGradient>
                 <linearGradient id="colorValueBad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#c8102e" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="#c8102e" stopOpacity={0}/>
                 </linearGradient>
                 <linearGradient id="colorValueNeutral" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#c8102e" stopOpacity={0.4}/>
                   <stop offset="95%" stopColor="#c8102e" stopOpacity={0}/>
                 </linearGradient>
               </defs>

               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
               <XAxis 
                  dataKey="age" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 13, fontWeight: 'bold' }} 
                  dy={20}
               />
               <YAxis 
                  tickFormatter={(val) => `${val}M`} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12, fontWeight: 'bold' }} 
                  dx={-10}
               />
               <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#c8102e', strokeWidth: 1, strokeDasharray: '5 5' }} />
               
               <ReferenceLine y={0} stroke="#222" strokeWidth={2} strokeOpacity={0.2} strokeDasharray="4 4" />

               <Area 
                 type="monotone" 
                 dataKey="current" 
                 stroke={chartData[chartData.length-1]?.current < 0 ? "#c8102e" : (appliedSolutions.size > 0 ? "#10b981" : "#c8102e")} 
                 strokeWidth={5}
                 fillOpacity={1} 
                 fill={chartData[chartData.length-1]?.current < 0 ? "url(#colorValueBad)" : (appliedSolutions.size > 0 ? "url(#colorValueGood)" : "url(#colorValueNeutral)")} 
                 animationDuration={1500}
                 animationEasing="ease-in-out"
               />
               
             </AreaChart>
           </ResponsiveContainer>

           {/* Vizualizace aktivovaného stavu pod grafem */}
           <div className="flex justify-center mt-6">
              <AnimatePresence mode="wait">
                 {isRiskSimulated && appliedSolutions.size === 0 && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#fcf4f5] border border-red-200 text-[#c8102e] px-6 py-2 rounded-full font-bold text-[14px] flex items-center gap-2">
                     <TrendingDown size={18} /> Katastrofický Scénář: Aktivní Výpadek
                   </motion.div>
                 )}
                 {isRiskSimulated && appliedSolutions.size > 0 && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-green-50 border border-green-200 text-green-700 px-6 py-2 rounded-full font-bold text-[14px] flex items-center gap-2">
                     <TrendingUp size={18} /> Aplikováno Generali Řešení: Rodina v bezpečí
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

      </div>

    </div>
  );
};
