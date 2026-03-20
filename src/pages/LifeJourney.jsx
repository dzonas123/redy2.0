import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { 
  Users, User, ArrowRight, Mic, CheckCircle2, Loader2, Sparkles, Activity, ShieldCheck, 
  Wallet, Target, Umbrella, Home, Car, HeartPulse, Coins, PiggyBank, Briefcase, TrendingUp, Plane
} from 'lucide-react';
import { cn } from '../utils/cn';

// UI Components for the Journey
const RadioOption = ({ checked, label, onChange }) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer group mb-4">
      <input type="radio" className="hidden" checked={checked} onChange={onChange} />
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm shrink-0",
        checked ? "border-[#c8102e]" : "border-[#888888] group-hover:border-[#555555]"
      )}>
        {checked && <div className="w-3 h-3 rounded-full bg-[#c8102e]" />}
      </div>
      <span className={cn("text-[17px]", checked ? "text-[#222222] font-medium" : "text-[#555555] font-normal")}>
        {label}
      </span>
    </label>
  );
};

const CardOption = ({ selected, icon: Icon, title, desc, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-out flex flex-col items-start gap-4 hover:-translate-y-1 h-full",
        selected 
          ? "border-[#c8102e] bg-[#fcf4f5] shadow-[0_8px_20px_rgba(200,16,46,0.12)]" 
          : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-modern-card"
      )}
    >
      <div className={cn(
        "p-3 rounded-lg transition-colors flex items-center justify-center",
        selected ? "bg-[#c8102e] text-white" : "bg-gray-50 text-gray-500"
      )}>
        <Icon size={24} strokeWidth={selected ? 2.5 : 2} />
      </div>
      <div className="flex-1">
        <h4 className={cn("font-bold text-[16px] mb-1 transition-colors leading-tight", selected ? "text-[#c8102e]" : "text-[#222]")}>{title}</h4>
        {desc && <p className="text-[13px] text-gray-500 leading-snug mt-2">{desc}</p>}
      </div>
      {selected && (
        <div className="absolute top-4 right-4 text-[#c8102e] bg-white rounded-full">
          <CheckCircle2 size={24} className="fill-current text-white" />
        </div>
      )}
    </div>
  );
};

const RangeSlider = ({ value, min, max, step, onChange, formatValue, label, helperText }) => (
  <div className="w-full mb-8">
    <div className="flex justify-between items-end mb-4">
      <div>
        <h4 className="text-[16px] font-bold text-[#222]">{label}</h4>
        {helperText && <p className="text-[13px] text-gray-500">{helperText}</p>}
      </div>
      <div className="text-[24px] font-bold text-[#c8102e] font-serif">
        {formatValue(value)}
      </div>
    </div>
    <div className="relative pt-2">
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#c8102e]" 
      />
      <div className="flex justify-between text-[12px] text-gray-400 mt-2 font-medium">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  </div>
);

// Format currency
const formatCZK = (value) => new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(value);

export const LifeJourney = () => {
  const [step, setStep] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  // Step 1
  const [statusParam, setStatusParam] = useState('');
  const [kidsParam, setKidsParam] = useState('');
  
  // Step 2
  const [income, setIncome] = useState(60000);
  const [expenses, setExpenses] = useState(45000);
  
  // Step 3
  const [savings, setSavings] = useState(150000);
  const [duration, setDuration] = useState('');
  
  // Step 4
  const [goals, setGoals] = useState([]);
  
  // Step 5
  const [insurance, setInsurance] = useState([]);

  const steps = [
    { id: 1, title: 'Rodina' },
    { id: 2, title: 'Rozpočet' },
    { id: 3, title: 'Úspory' },
    { id: 4, title: 'Cíle' },
    { id: 5, title: 'Zabezpečení' },
    { id: 6, title: 'AI Finanční plán' },
  ];

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      setStep(6);
      setIsGenerating(true);
      setTimeout(() => setIsGenerating(false), 3500); // simulate API call
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleGoal = (goal) => {
    setGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const toggleInsurance = (ins) => {
    setInsurance(prev => prev.includes(ins) ? prev.filter(i => i !== ins) : [...prev, ins]);
  };

  // Calculate free cashflow
  const freeCashflow = income - expenses;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fa] font-sans text-[#222222] relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

      {/* Header */}
      <header className="h-[80px] px-8 bg-white/80 backdrop-blur-md border-b justify-between border-gray-100 flex items-center shrink-0 z-20 sticky top-0">
         <div className="flex items-center text-[#c8102e] font-serif text-[24px]">
            <img src="https://www.generaliceska.cz/cp-2020-theme/images/generali-ceska-pojistovna.svg" className="h-8 object-contain" alt="Generali Česká pojišťovna" />
         </div>
         
         <Button 
            variant="secondary" 
            className={cn("h-10 text-[13px] bg-white border shadow-sm rounded-md transition-all", isListening ? "text-[#c8102e] border-[#c8102e] bg-[#fcf4f5]" : "text-[#555] border-[#e5e5e5]")}
            onClick={() => setIsListening(!isListening)}
          >
            <Mic size={16} className={cn("mr-2", isListening && "animate-pulse")} /> 
            {isListening ? "Odposlech Aktivní" : "Spustit AI Odposlech"}
          </Button>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100 z-20">
        <div 
          className="h-full bg-[#c8102e] transition-all duration-500 ease-out" 
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>

      <div className="w-full bg-white border-b border-gray-100 py-3 z-10 sticky top-[81px]">
        <div className="max-w-[800px] mx-auto px-6 flex justify-between items-center overflow-x-auto custom-scrollbar">
          {steps.map((s, i) => (
             <div key={s.id} className={cn(
               "flex items-center gap-2 text-[13px] font-medium transition-colors whitespace-nowrap",
               step === s.id ? "text-[#c8102e]" : step > s.id ? "text-[#222222]" : "text-[#a0a0a0]"
             )}>
               <div className={cn(
                 "w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white", 
                 step === s.id || step > s.id ? "bg-[#c8102e]" : "bg-[#d5d5d5]"
               )}>
                 {step > s.id ? <CheckCircle2 size={12} strokeWidth={3} /> : s.id}
               </div>
               <span className="hidden sm:inline">{s.title}</span>
               {i < steps.length - 1 && <div className="w-4 sm:w-8 h-[1px] bg-gray-200 mx-1 sm:mx-2" />}
             </div>
          ))}
        </div>
      </div>

      {/* Main Flow Centered */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:py-12 flex justify-center custom-scrollbar z-10 relative">
         <div className="w-full max-w-[800px] flex flex-col pb-20">
            
            <AnimatePresence mode="wait">
              {/* STEP 1: Rodinná situace */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white rounded-2xl shadow-modern-card p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                       <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center">
                         <Users size={32} />
                       </div>
                       <div>
                         <h2 className="text-[28px] md:text-[32px] font-bold text-[#222222] mb-2 tracking-tight">Jaká je vaše rodinná situace?</h2>
                         <p className="text-[16px] text-[#666] leading-relaxed">Na základě vaší rodinné situace dokážeme zacílit produkty tak, aby ochránily ty, na kterých vám nejvíce záleží.</p>
                       </div>
                    </div>

                    <div className="space-y-10">
                       <div className="bg-gray-50/50 p-6 md:p-8 rounded-xl border border-gray-100">
                         <h3 className="text-[17px] font-bold text-[#222] mb-6">Můj rodinný stav</h3>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <RadioOption checked={statusParam === 'single'} label="Žiju sám" onChange={() => setStatusParam('single')} />
                            <RadioOption checked={statusParam === 'partner'} label="Mám partnera" onChange={() => setStatusParam('partner')} />
                            <RadioOption checked={statusParam === 'married'} label="Jsem v manželství" onChange={() => setStatusParam('married')} />
                         </div>
                       </div>

                       <div className="bg-gray-50/50 p-6 md:p-8 rounded-xl border border-gray-100">
                         <h3 className="text-[17px] font-bold text-[#222] mb-6">Máte děti?</h3>
                         <div className="flex gap-8 sm:gap-12">
                            <RadioOption checked={kidsParam === 'yes'} label="Ano, mám" onChange={() => setKidsParam('yes')} />
                            <RadioOption checked={kidsParam === 'no'} label="Zatím ne" onChange={() => setKidsParam('no')} />
                         </div>
                       </div>
                    </div>

                    <div className="mt-12 flex justify-end">
                       <Button onClick={handleNext} disabled={!statusParam || !kidsParam} className="h-14 px-10 text-[16px] font-bold rounded-xl shadow-md w-full sm:w-auto">
                         Pokračovat k rozpočtu <ArrowRight size={20} className="ml-2" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Rozpočet */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white rounded-2xl shadow-modern-card p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                       <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center">
                         <Wallet size={32} />
                       </div>
                       <div>
                         <h2 className="text-[28px] md:text-[32px] font-bold text-[#222222] mb-2 tracking-tight">Příjmy a výdaje domácnosti</h2>
                         <p className="text-[16px] text-[#666] leading-relaxed">Spočítejme si váš měsíční cashflow, abychom viděli váš investiční potenciál.</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 md:p-8 rounded-xl border border-gray-100 bg-white shadow-sm">
                        <RangeSlider 
                          label="Čisté měsíční příjmy" 
                          helperText="Součet všech příjmů v domácnosti"
                          value={income} min={20000} max={250000} step={5000} 
                          onChange={setIncome} formatValue={formatCZK} 
                        />
                      </div>
                      
                      <div className="p-6 md:p-8 rounded-xl border border-gray-100 bg-white shadow-sm">
                        <RangeSlider 
                          label="Běžné měsíční výdaje" 
                          helperText="Bydlení, jídlo, splátky, doprava, atd."
                          value={expenses} min={10000} max={200000} step={5000} 
                          onChange={setExpenses} formatValue={formatCZK} 
                        />
                      </div>

                      {/* Cashflow Result */}
                      <div className={cn(
                        "p-6 rounded-xl border-2 flex items-center justify-between",
                        freeCashflow >= 0 ? "border-green-100 bg-green-50/50" : "border-red-100 bg-red-50/50"
                      )}>
                        <div>
                          <h4 className="font-bold text-[18px] text-[#222]">Měsíční zůstatek (volné prostředky)</h4>
                          <p className="text-[14px] text-gray-600 mt-1">Tyto prostředky můžeme využít pro budování bohatství.</p>
                        </div>
                        <div className={cn("text-[28px] font-bold", freeCashflow >= 0 ? "text-green-600" : "text-red-500")}>
                          {freeCashflow > 0 ? "+" : ""}{formatCZK(freeCashflow)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                       <Button variant="ghost" onClick={handleBack} className="w-full sm:w-auto font-bold text-[#666] h-14">Zpět</Button>
                       <Button onClick={handleNext} className="w-full sm:w-auto h-14 px-10 text-[16px] font-bold rounded-xl shadow-md">
                         Pokračovat k úsporám <ArrowRight size={20} className="ml-2" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Úspory */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white rounded-2xl shadow-modern-card p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                       <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center">
                         <PiggyBank size={32} />
                       </div>
                       <div>
                         <h2 className="text-[28px] md:text-[32px] font-bold text-[#222222] mb-2 tracking-tight">Vaše aktuální rezervy</h2>
                         <p className="text-[16px] text-[#666] leading-relaxed">Peníze by měly pracovat pro vás, ne ztrácet hodnotu vlivem inflace.</p>
                       </div>
                    </div>

                    <div className="space-y-10">
                      <div className="p-6 md:p-8 rounded-xl border border-gray-100 bg-white shadow-sm">
                        <RangeSlider 
                          label="Hodnota volných úspor" 
                          helperText="Hotovost, zůstatky na běžných/spořicích účtech"
                          value={savings} min={0} max={2000000} step={25000} 
                          onChange={setSavings} formatValue={formatCZK} 
                        />
                      </div>

                      <div className="bg-gray-50/50 p-6 md:p-8 rounded-xl border border-gray-100">
                         <h3 className="text-[17px] font-bold text-[#222] mb-6">Doba uložení / zhodnocování</h3>
                         <div className="flex flex-col gap-4">
                            <RadioOption checked={duration === 'short'} label="Krátkodobě (do 3 let - pro nečekané výdaje)" onChange={() => setDuration('short')} />
                            <RadioOption checked={duration === 'medium'} label="Střednědobě (3-7 let - auto, bydlení)" onChange={() => setDuration('medium')} />
                            <RadioOption checked={duration === 'long'} label="Dlouhodobě (7 a více let - děti, důchod, bohatství)" onChange={() => setDuration('long')} />
                         </div>
                       </div>
                    </div>

                    <div className="mt-12 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                       <Button variant="ghost" onClick={handleBack} className="w-full sm:w-auto font-bold text-[#666] h-14">Zpět</Button>
                       <Button onClick={handleNext} disabled={!duration} className="w-full sm:w-auto h-14 px-10 text-[16px] font-bold rounded-xl shadow-md">
                         Pokračovat k cílům <ArrowRight size={20} className="ml-2" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Cíle */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white rounded-2xl shadow-modern-card p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                       <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center">
                         <Target size={32} />
                       </div>
                       <div>
                         <h2 className="text-[28px] md:text-[32px] font-bold text-[#222222] mb-2 tracking-tight">Finanční vize (5-10 let)</h2>
                         <p className="text-[16px] text-[#666] leading-relaxed">Vyberte všechny cíle, kterých chcete v blízké či vzdálenější budoucnosti dosáhnout.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <CardOption 
                        icon={Home} title="Vlastní bydlení" desc="Hypotéka, rekonstrukce, nebo koupě na investici"
                        selected={goals.includes('bydleni')} onClick={() => toggleGoal('bydleni')} 
                      />
                      <CardOption 
                        icon={Car} title="Nový vůz" desc="Bezpečné auto pro rodinu i zábavu"
                        selected={goals.includes('auto')} onClick={() => toggleGoal('auto')} 
                      />
                      <CardOption 
                        icon={Briefcase} title="Zajištění dětí" desc="Start do života, studia na univerzitě"
                        selected={goals.includes('deti')} onClick={() => toggleGoal('deti')} 
                      />
                      <CardOption 
                        icon={TrendingUp} title="Rentiérský věk" desc="Finanční nezávislost a pohodový důchod"
                        selected={goals.includes('renta')} onClick={() => toggleGoal('renta')} 
                      />
                      <CardOption 
                        icon={Plane} title="Cestování a zážitky" desc="Finance pro objevování světa beze strachu"
                        selected={goals.includes('cestovani')} onClick={() => toggleGoal('cestovani')} 
                      />
                      <CardOption 
                        icon={ShieldCheck} title="Tvorba rezervy" desc="Chci mít jistotu peněz na nečekané situace"
                        selected={goals.includes('rezerva')} onClick={() => toggleGoal('rezerva')} 
                      />
                    </div>

                    <div className="mt-12 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
                       <Button variant="ghost" onClick={handleBack} className="w-full sm:w-auto font-bold text-[#666] h-14">Zpět</Button>
                       <Button onClick={handleNext} disabled={goals.length === 0} className="w-full sm:w-auto h-14 px-10 text-[16px] font-bold rounded-xl shadow-md">
                         Pokračovat dále <ArrowRight size={20} className="ml-2" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Stávající zabezpečení */}
              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white rounded-2xl shadow-modern-card p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                       <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center">
                         <Umbrella size={32} />
                       </div>
                       <div>
                         <h2 className="text-[28px] md:text-[32px] font-bold text-[#222222] mb-2 tracking-tight">Stávající produkty</h2>
                         <p className="text-[16px] text-[#666] leading-relaxed">Zaškrtněte produkty, které aktuálně využíváte. Provedeme jejich optimalizaci a konsolidaci do Generali.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <CardOption 
                        icon={HeartPulse} title="Rizikové životní pojištění" 
                        selected={insurance.includes('zivot')} onClick={() => toggleInsurance('zivot')} 
                      />
                      <CardOption 
                        icon={Home} title="Pojištění majetku" 
                        selected={insurance.includes('majetek')} onClick={() => toggleInsurance('majetek')} 
                      />
                      <CardOption 
                        icon={Car} title="Pojištění vozidel" 
                        selected={insurance.includes('auto')} onClick={() => toggleInsurance('auto')} 
                      />
                      <CardOption 
                        icon={PiggyBank} title="Investiční fondy a portfolia" 
                        selected={insurance.includes('penzijko')} onClick={() => toggleInsurance('penzijko')} 
                      />
                      <CardOption 
                        icon={Coins} title="Další investice" 
                        selected={insurance.includes('investice')} onClick={() => toggleInsurance('investice')} 
                      />
                      <CardOption 
                        icon={Wallet} title="Stavební spoření" 
                        selected={insurance.includes('stavebko')} onClick={() => toggleInsurance('stavebko')} 
                      />
                    </div>

                    <div className="mt-12 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
                       <Button variant="ghost" onClick={handleBack} className="w-full sm:w-auto font-bold text-[#666] h-14">Zpět</Button>
                       <Button onClick={handleNext} className="w-full sm:w-auto h-14 px-10 text-[16px] font-bold rounded-xl shadow-md bg-[#c8102e] hover:bg-[#a00c24] text-white">
                         <Sparkles size={20} className="mr-2" /> Vygenerovat AI Report
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: AI Report */}
              {step === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-2xl shadow-modern-card border border-[#f5d0d4] overflow-hidden relative">
                    {/* Generali branding top border */}
                    <div className="h-2 w-full bg-[#c8102e]" />
                    
                    {isGenerating ? (
                       <div className="p-16 flex flex-col items-center justify-center min-h-[400px]">
                          <Loader2 size={64} className="text-[#c8102e] animate-spin mb-8" strokeWidth={2.5} />
                          <h2 className="text-[28px] font-bold text-[#222222] mb-3">Zpracovávám profil klienta...</h2>
                          <div className="flex flex-col items-center gap-2 text-[#666] text-[16px]">
                            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Analýza cashflow {formatCZK(freeCashflow)}/měs.</p>
                            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Skóring cílů ({goals.length} vybráno)</p>
                            <p className="flex items-center gap-2 opacity-50"><Loader2 size={14} className="animate-spin" /> Výběr optimálních produktů Generali Česká pojišťovna</p>
                          </div>
                       </div>
                    ) : (
                       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
                          <div className="flex items-center gap-4 mb-8">
                             <div className="w-16 h-16 rounded-full bg-[#f4fcf6] flex items-center justify-center text-green-600 shrink-0">
                                <ShieldCheck size={32} strokeWidth={2} />
                             </div>
                             <div>
                               <h2 className="text-[28px] md:text-[34px] font-bold text-[#222222] tracking-tight">Váš finanční plán Generali</h2>
                               <p className="text-[#666] text-[16px]">AI Report sestavený na míru pro dosažení vašich cílů a dokonalé krytí rizik.</p>
                             </div>
                          </div>

                          {/* Data Summary Highlight */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider mb-1">Volné cashflow</p>
                              <p className="text-[20px] font-bold text-[#222]">{formatCZK(freeCashflow)}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider mb-1">Cílové volné úspory</p>
                              <p className="text-[20px] font-bold text-[#222]">{formatCZK(savings)}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider mb-1">Stav</p>
                              <p className="text-[20px] font-bold text-[#222]">
                                {statusParam === 'single' ? 'Jednotlivec' : statusParam === 'partner' ? 'Pár' : 'Manželé'}
                                {kidsParam === 'yes' && ' s dětmi'}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider mb-1">Investiční horizont</p>
                              <p className="text-[20px] font-bold text-[#222]">
                                {duration === 'short' ? 'Do 3 let' : duration === 'medium' ? '3 - 7 let' : '7+ let'}
                              </p>
                            </div>
                          </div>

                          <h3 className="text-[20px] font-bold text-[#222] mb-6 flex items-center gap-2">
                             <Sparkles size={20} className="text-[#c8102e]" /> Doporučená řešení na míru
                          </h3>

                          <div className="space-y-4 mb-10">
                             {/* Product 1: Životní pojištění MŮJ ŽIVOT */}
                             <div className="p-6 border border-gray-200 rounded-xl hover:border-[#c8102e] hover:shadow-md transition-all">
                               <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                                 <div>
                                   <div className="flex items-center gap-2 mb-2">
                                     <span className="bg-[#fcf4f5] text-[#c8102e] px-2 py-1 rounded text-[12px] font-bold uppercase tracking-wider">Krytí hrozeb</span>
                                     <h4 className="font-bold text-[18px] text-[#222]">Rizikové životní pojištění</h4>
                                   </div>
                                   <p className="text-[#666] text-[14px] leading-relaxed">
                                     Na základě vašich výdajů ({formatCZK(expenses)} měsíčně) je doporučeno nastavit pojistné částky pro případ výpadku příjmu 
                                     {kidsParam === 'yes' ? ' s důrazem na zajištění dětí.' : '.'} 
                                     {insurance.includes('zivot') ? ' Navrhujeme bezplatný audit vaší stávající smlouvy.' : ' Produkt ochrání vaše sny a cíle v případě nepřízně osudu.'}
                                   </p>
                                 </div>
                                 <div className="shrink-0 text-right w-full sm:w-auto">
                                    <p className="text-[12px] text-gray-500 mb-1">Doporučený vklad</p>
                                    <p className="text-[20px] font-bold text-[#222]">{formatCZK(Math.round(freeCashflow * 0.15))}/měs.</p>
                                 </div>
                               </div>
                             </div>

                             {/* Product 2: Generali Fondy */}
                             <div className="p-6 border border-gray-200 rounded-xl hover:border-[#c8102e] hover:shadow-md transition-all">
                               <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                                 <div>
                                   <div className="flex items-center gap-2 mb-2">
                                     <span className="bg-[#f4fcf6] text-green-700 px-2 py-1 rounded text-[12px] font-bold uppercase tracking-wider">Investice & Bohatství</span>
                                     <h4 className="font-bold text-[18px] text-[#222]">Investiční fondy a portfolia</h4>
                                   </div>
                                   <p className="text-[#666] text-[14px] leading-relaxed">
                                     Pro dosažení cílů {goals.length > 0 ? `(${goals.join(', ')})` : 'zabezpečení a tvorbu rezervy'} doporučujeme rozdělit zbývající volné 
                                     prostředky do diverzifikovaných portfolií. AI odhadovaný zisk s {duration === 'long' ? 'dynamickou' : 'vyváženou'} strategií 
                                     dosahuje výkonnosti překonávající inflaci.
                                   </p>
                                 </div>
                                 <div className="shrink-0 text-right w-full sm:w-auto">
                                    <p className="text-[12px] text-gray-500 mb-1">Doporučený vklad</p>
                                    <p className="text-[20px] font-bold text-[#c8102e]">{formatCZK(Math.round(freeCashflow * 0.85))}/měs.</p>
                                 </div>
                               </div>
                             </div>

                             {/* Product 3: Konsolidace */}
                             {(insurance.includes('auto') || insurance.includes('majetek')) && (
                               <div className="p-6 border border-gray-200 rounded-xl hover:border-[#c8102e] hover:shadow-md transition-all bg-[#fafafa]">
                                 <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                                   <div>
                                     <div className="flex items-center gap-2 mb-2">
                                       <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-[12px] font-bold uppercase tracking-wider">Optimalizace Nákladů</span>
                                       <h4 className="font-bold text-[18px] text-[#222]">Pojištění majetku a Pojištění vozidel</h4>
                                     </div>
                                     <p className="text-[#666] text-[14px] leading-relaxed">
                                       Zaznamenali jsme, že platíte pojištění majetku a/nebo vozidel. Sloučením těchto smluv pod hlavičku Generali Česká pojišťovna 
                                       dovedeme ušetřit na pojistném až 20% ročně formou křížového prodeje a věrnostních slev.
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
                             <Button variant="outline" onClick={() => setStep(1)} className="h-[56px] px-8 text-[15px] font-bold rounded-xl w-full sm:w-auto border-gray-300">
                               Restartovat analýzu
                             </Button>
                             <Button className="h-[56px] px-12 text-[16px] font-bold tracking-wider rounded-xl w-full sm:flex-1 shadow-[0_8px_20px_rgba(200,16,46,0.25)] bg-[#c8102e] hover:bg-[#a00c24] text-white">
                               ODESLAT SMLOUVY K PODPISU ON-LINE
                             </Button>
                          </div>
                       </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

         </div>
      </main>

      {/* AI Context Overlay */}
      <AnimatePresence>
        {isListening && step < 6 && (
           <motion.div 
             initial={{ opacity: 0, y: 50, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20 }}
             className="fixed bottom-6 right-6 w-80 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-xl border border-gray-100 flex flex-col overflow-hidden z-50"
           >
             <div className="bg-[#222222] text-white px-4 py-3 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} className="text-[#c8102e]" /> Generali AI Agent
                </span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-[#c8102e] bg-white px-2 py-0.5 rounded-sm">
                  <span className="w-1.5 h-1.5 bg-[#c8102e] rounded-full animate-pulse" /> REC
                </span>
             </div>
             <div className="p-4 bg-[#fcf4f5] border-b border-[#f5d0d4] text-[13px] text-[#222] leading-relaxed shadow-inner">
                <strong>Inteligentní asistent:</strong> Naslouchám konverzaci a automaticky vyplňuji údaje do formuláře. Ušetříme čas s papírováním.
             </div>
             <div className="h-44 p-4 bg-white overflow-y-auto space-y-4 custom-scrollbar">
                {step === 1 && (
                  <>
                    <div className="text-[13px] text-gray-500 font-medium">Poradce: Dobrý den, projdeme si vaši domácnost. Jaká je vaše rodinná situace?</div>
                    <div className="text-[13px] text-[#222] font-semibold">Klient: S manželkou jsme svoji pět let a máme dvě malé děti.</div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="text-[13px] text-gray-500 font-medium">Poradce: Děkuji. Jaké máte s manželkou dohromady čisté příjmy a jakou částku měsíčně utratíte?</div>
                    <div className="text-[13px] text-[#222] font-semibold">Klient: Dohromady nosíme domů asi sedmdesát tisíc. Výdaje odhaduji na padesát včetně hypotéky.</div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="text-[13px] text-gray-500 font-medium">Poradce: To tvoří pěknou rezervu. Jak velkou aktuálně máte finanční hotovost?</div>
                    <div className="text-[13px] text-[#222] font-semibold">Klient: Na spořícím účtu leží zhruba dvě stě tisíc. Peníze bych chtěl nechat pracovat na delší dobu, třeba 10 let.</div>
                  </>
                )}
                {step >= 4 && (
                  <>
                    <div className="text-[13px] text-gray-500 font-medium">AI provádí syntézu dat z konverzace...</div>
                  </>
                )}
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
