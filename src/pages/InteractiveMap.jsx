import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { 
  Mic, UserRound, Briefcase, AlertTriangle, ShieldCheck, 
  TrendingUp, Sparkles, HeartPulse, PiggyBank, Home, CheckCircle2,
  ListTodo, Clock, Zap, Car, Baby, Umbrella, Wallet
} from 'lucide-react';
import { cn } from '../utils/cn';

// Významně rozšířený a realistický AI přepis cesty klienta
const MOCK_TRANSCRIPT = [
  { time: 1000, speaker: 'Poradce', text: "Dobrý den, pojďme si dnes projít vaši finanční situaci, abychom zkontrolovali, zda je vše nastaveno správně pro vaše budoucí plány." },
  { time: 5000, speaker: 'Klient', text: "Dobrý den, určitě. Hlavní změna je, že jsme s manželkou nedávno koupili dům a vzali si hypotéku na 6 milionů." },
  { time: 10000, speaker: 'Poradce', text: "Gratuluji k bydlení! Když už máte takový závazek, jak jste na tom s pohotovostní rezervou?" },
  { time: 14000, speaker: 'Klient', text: "Na spořicím účtu máme aktuálně asi 150 tisíc, což nám pokryje výdaje tak na 3 měsíce." },
  { time: 19000, speaker: 'Poradce', text: "Tři měsíce jsou fajn základ, ale bývá bezpečnější mít více. Jaké máte s rodinou cíle řekněme do 5 let?" },
  { time: 24000, speaker: 'Klient', text: "Určitě bychom chtěli koupit nové rodinné auto, protože čekáme druhé dítě. Rádi bychom na něj měli aspoň 400 tisíc." },
  { time: 28000, speaker: 'Poradce', text: "Skvělé, to si zapíšu. Co se týče ochrany aut a majetku – máte to nějak pojištěné?" },
  { time: 32000, speaker: 'Klient', text: "Dům pojistila banka k hypotéce. Auto má jen povinné ručení, protože už je starší." },
  { time: 37000, speaker: 'Poradce', text: "A vaše osobní příjmy? Kdyby se, nedej bože, ukázal dlouhodobý zdravotní problém, máte nějaké životní pojištění?" },
  { time: 43000, speaker: 'Klient', text: "To vlastně teď nemáme žádné. Vždycky jsem si říkal, že jsme mladí a nic se nestane..." },
  { time: 47000, speaker: 'Poradce', text: "Chápu, ale s hypotékou a dvěma dětmi už to představuje značné riziko. Pojďme se podívat, co nám k tomu vygenerovala AI Finanční Mapa." }
];

// Obohacená extrahovaná data s unikátními ID pro Auto-Scroll fókusing
const EXTRACTED_DATA_TIMELINE = [
  { id: 'goal_house', time: 7000, type: 'goal', key: 'Vlastní bydlení', value: 'Nová hypotéka (6 mil. Kč)', icon: Home },
  
  { id: 'data_reserve', time: 16000, type: 'data', key: 'Hotovostní rezerva', value: '150 000 Kč na spořicím účtu', icon: Wallet },
  { id: 'risk_reserve', time: 17000, type: 'risk', key: 'Krátká finanční rezerva', value: 'Při delší nemoci hrozí do 3 měsíců neschopnost splácet hypotéku a ztráta bydlení.', icon: AlertTriangle },
  
  { id: 'goal_family', time: 26000, type: 'goal', key: 'Plány a Rodina', value: 'Nové auto (400 tis. Kč do 5 let), 2. dítě na cestě', icon: Baby },
  
  { id: 'data_property', time: 34000, type: 'data', key: 'Pojištění Majetku', value: 'Auto: Pouze POV. Dům: Vázáno u Hypoteční banky.', icon: Umbrella },
  { id: 'risk_property', time: 35000, type: 'risk', key: 'Nedokonalé krytí majetku', value: 'Bankopojistka často nepokryje celou hodnotu domu po rekonstrukci. Chybí havarijní ochrana.', icon: AlertTriangle },

  { id: 'risk_life', time: 45000, type: 'risk', key: 'Fatální výpadek příjmů bez krytí', value: 'Živitel rodiny nemá životní pojištění. Rodina se 2 dětmi a hypotékou je kriticky ohrožena insolvencí.', icon: AlertTriangle }
];

const SOLUTIONS_MAP = {
  risk_reserve: {
    title: 'Investiční fondy a portfolia',
    desc: 'Z volného cashflow začít automaticky odkládat do fondů na ochranu před inflací a tvorbu robustní renty na stáří.',
    icon: TrendingUp
  },
  risk_property: {
    title: 'Havarijní pojištění + Pojištění majetku',
    desc: 'Sjednat Havarijní pojištění pro budoucí auto a převést pojistku na Pojištění majetku – váš domov bude u nás v bezpečí.',
    icon: ShieldCheck
  },
  risk_life: {
    title: 'Rizikové životní pojištění',
    desc: 'Myslíme na vás i vaše blízké, aby byl život klidnější. Zřídit komplexní krytí invalidity (6 mil. Kč) a závažných onemocnění.',
    icon: HeartPulse
  }
};

export const InteractiveMap = () => {
  const [view, setView] = useState('client');
  const [isListening, setIsListening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSolvingMode, setIsSolvingMode] = useState(false);
  
  const [transcriptItemCount, setTranscriptItemCount] = useState(0);
  const [extractedData, setExtractedData] = useState([]);
  
  // Stavy pro postupné fóksování a řešení
  const [focusedItemId, setFocusedItemId] = useState(null);
  const [resolvedRisks, setResolvedRisks] = useState([]);

  // Refs pro jednotlivé bloky, abychom k nim mohli scrollovat ("jeden po druhém")
  const itemRefs = useRef({});

  // Efect na scrolování k aktuálně zafokusovanému elementu
  useEffect(() => {
    if (focusedItemId && itemRefs.current[focusedItemId]) {
      itemRefs.current[focusedItemId].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focusedItemId, view]);

  useEffect(() => {
    if (!isListening) return;

    let timers = [];
    
    // Auto-prezentace hovoru
    MOCK_TRANSCRIPT.forEach((item, index) => {
      const timer = setTimeout(() => {
        setTranscriptItemCount(index + 1);
      }, item.time);
      timers.push(timer);
    });

    // Auto-prezentace dat (jakmile položka naskočí, získá focus)
    let lastTime = 0;
    EXTRACTED_DATA_TIMELINE.forEach((dataItem) => {
      const timer = setTimeout(() => {
        setExtractedData(prev => [...prev, dataItem]);
        setFocusedItemId(dataItem.id); // Automaticky zaostří na novou informaci
      }, dataItem.time);
      timers.push(timer);
      if (dataItem.time > lastTime) lastTime = dataItem.time;
    });

    // Skončení celého toku
    const endTimer = setTimeout(() => {
      setIsFinished(true);
      setIsListening(false);
      setFocusedItemId(null); // Odstraníme focus na konci před řešením
    }, lastTime + 2000);
    timers.push(endTimer);

    return () => timers.forEach(clearTimeout);
  }, [isListening]);

  // Sekvenční vyřešení rizik (jedno po druhém)
  const handleSolveRisks = () => {
    setIsSolvingMode(true);
    setFocusedItemId(null);

    const risksToSolve = extractedData.filter(d => d.type === 'risk').map(d => d.id);
    
    risksToSolve.forEach((riskId, index) => {
      setTimeout(() => {
        setFocusedItemId(riskId); // Odskrolujeme na konkrétní problém
        setResolvedRisks(prev => [...prev, riskId]); // Vyřešíme ho (animace z červené na zelenou)
      }, index * 3000); // 3-vteřinový interval mezi vyřešením každého rizika pro max wow efekt
    });

    // Po vyřešení všech zrušit focus uprostřed obrazovky
    setTimeout(() => {
      setFocusedItemId(null);
    }, risksToSolve.length * 3000 + 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fa] font-sans text-[#222222]">
      
      {/* Header & View Toggle */}
      <header className="h-[80px] px-8 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between shrink-0 z-50 sticky top-0 shadow-sm transition-all duration-300">
         <div className="flex items-center text-[#c8102e] font-serif text-[24px]">
            <img src="https://www.generaliceska.cz/cp-2020-theme/images/generali-ceska-pojistovna.svg" className="h-8 object-contain" alt="Generali Česká pojišťovna" />
            <span className="ml-4 pl-4 border-l border-gray-200 text-[16px] font-sans font-bold text-gray-800">
               {view === 'advisor' ? "Chytrý Odposlech (AI)" : "Váš Finanční Profil"}
            </span>
         </div>
         
         <div className="flex gap-4 items-center">
             <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button 
                  onClick={() => setView('advisor')}
                  className={cn("px-6 py-2 rounded-md text-[14px] font-bold transition-all flex items-center gap-2", view === 'advisor' ? "bg-white shadow-sm text-[#222]" : "text-gray-500 hover:text-gray-700")}
                >
                  <Briefcase size={16} /> Poradce
                </button>
                <button 
                  onClick={() => setView('client')}
                  className={cn("px-6 py-2 rounded-md text-[14px] font-bold transition-all flex items-center gap-2", view === 'client' ? "bg-white shadow-sm text-[#222]" : "text-gray-500 hover:text-gray-700")}
                >
                  <UserRound size={16} /> Klient
                </button>
             </div>

             {view === 'advisor' && !isFinished && (
               <Button 
                  variant="secondary" 
                  className={cn("h-10 text-[13px] border shadow-sm rounded-md transition-all ml-2", isListening ? "text-white border-[#c8102e] bg-[#c8102e]" : "text-[#555] bg-white border-[#e5e5e5]")}
                  onClick={() => {
                    setIsListening(true);
                    setIsFinished(false);
                    setIsSolvingMode(false);
                    setResolvedRisks([]);
                    setTranscriptItemCount(0);
                    setExtractedData([]);
                    setFocusedItemId(null);
                  }}
                  disabled={isListening}
                >
                  <Mic size={16} className={cn("mr-2", isListening && "animate-pulse")} /> 
                  {isListening ? "Odposlech běží..." : "SPUSTIT ASISTENTA"}
                </Button>
             )}
         </div>
      </header>

      {/* Main Content Areas */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 flex justify-center pb-40">
        <div className="w-full max-w-[1200px]">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: ADVISOR (Živý přepis) */}
            {view === 'advisor' && (
              <motion.div key="advisor" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col lg:flex-row gap-8">
                
                {/* Left: Transcript */}
                <div className="flex-1 bg-white rounded-2xl shadow-modern-card border border-gray-100 p-6 flex flex-col min-h-[600px] h-[calc(100vh-150px)]">
                  <h3 className="text-[18px] font-bold mb-6 flex items-center gap-2 text-gray-800 shrink-0">
                     <Mic className="text-[#c8102e]" size={20} /> Živý přepis hovoru a Tagging
                  </h3>
                  
                  <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar pb-8">
                    <AnimatePresence>
                      {MOCK_TRANSCRIPT.slice(0, transcriptItemCount).map((item, idx) => (
                        <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} key={idx} className={cn(
                          "p-4 rounded-xl max-w-[85%] shadow-sm", 
                          item.speaker === 'Poradce' ? "bg-gray-50 border border-gray-100 self-start" : "bg-[#fcf4f5] border border-[#f5d0d4] self-end ml-auto"
                        )}>
                           <p className="text-[11px] font-bold mb-1 opacity-60 uppercase tracking-widest text-gray-600">{item.speaker}</p>
                           <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{item.text}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {!isListening && transcriptItemCount === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <Mic size={48} className="mb-4 opacity-20" />
                        <p>Zatím žádný přepis. Vpravo nahoře Spusťte Asistenta.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Extracted Data pro CRM */}
                <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-modern-card border border-gray-100 p-6 flex flex-col h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar relative">
                  <h3 className="text-[18px] font-bold mb-6 flex items-center gap-2 text-gray-800 shrink-0">
                     <ListTodo className="text-[#c8102e]" size={20} /> Data do CRM
                  </h3>

                  <div className="space-y-4 pb-32">
                    <AnimatePresence>
                      {extractedData.filter(d => d.type === 'data' || d.type === 'goal').map((item, idx) => (
                        <motion.div 
                          ref={el => itemRefs.current[item.id] = el}
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={item.id} 
                          className={cn("flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-xl shadow-sm transition-all duration-500", 
                            focusedItemId === item.id ? "bg-blue-50/50 border-blue-200 ring-2 ring-blue-300 ring-offset-2" : "bg-gray-50/50 border-gray-100"
                          )}
                        >
                           <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#c8102e] shadow-sm shrink-0">
                              <item.icon size={24} />
                           </div>
                           <div>
                              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">{item.key}</p>
                              <p className="text-[15px] font-bold text-gray-800">{item.value}</p>
                           </div>
                        </motion.div>
                      ))}
                      
                      {extractedData.filter(d => d.type === 'risk').map((item, idx) => {
                         const isResolved = resolvedRisks.includes(item.id);
                         const sol = SOLUTIONS_MAP[item.id];
                         return (
                         <motion.div 
                           ref={el => itemRefs.current[item.id] = el}
                           initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
                           key={item.id} 
                           className={cn("p-4 rounded-xl flex gap-4 border shadow-sm mt-6 transition-all duration-700",
                             isResolved ? "bg-green-50/50 border-green-200" : "bg-red-50 border-red-200",
                             focusedItemId === item.id ? (isResolved ? "ring-2 ring-green-400 ring-offset-2 scale-[1.02]" : "ring-2 ring-red-400 ring-offset-2 scale-[1.02]") : ""
                           )}
                         >
                            <div className={cn("mt-1 transition-colors", isResolved ? "text-green-500" : "text-red-500")}>
                              {isResolved ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
                            </div>
                            <div>
                              <span className={cn("text-[10px] font-bold text-white px-2 py-0.5 rounded-sm uppercase tracking-wide mb-2 inline-block transition-colors", isResolved ? "bg-green-500" : "bg-red-500")}>
                                {isResolved ? "AI ŘEŠENÍ DO CRM" : "Proklientské Riziko"}
                              </span>
                              <p className={cn("font-bold text-[14px] mb-1 transition-colors", isResolved ? "text-green-800" : "text-red-700")}>
                                {isResolved && sol ? sol.title : item.key}
                              </p>
                              <p className={cn("text-[13px] leading-relaxed font-medium transition-colors", isResolved ? "text-green-700" : "text-red-600")}>
                                {isResolved && sol ? sol.desc : item.value}
                              </p>
                            </div>
                         </motion.div>
                         )
                      })}
                    </AnimatePresence>
                    {!isListening && extractedData.length === 0 && (
                      <p className="text-[14px] text-gray-400 text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">Čekám na data z rozhovoru...</p>
                    )}
                  </div>
                  
                  {isFinished && extractedData.some(d => d.type === 'risk') && !isSolvingMode && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] text-center">
                       <Button onClick={handleSolveRisks} className="w-full h-[52px] shadow-lg bg-[#c8102e] hover:bg-[#a00c24] text-white rounded-xl text-[15px] font-bold tracking-wider">
                         GENERUJ NÁVRHY SMLUV A ŘEŠENÍ (AI)
                       </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW 2: CLIENT (Nádherný vizuální list, zaměřeno na každý bod + sekvenční Gamifikace řešení) */}
            {view === 'client' && (
              <motion.div key="client" initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="max-w-[800px] mx-auto pb-40 relative">
                
                <div className="mb-12 text-center pt-4">
                   <h2 className="text-[36px] font-bold text-[#222] mb-4 tracking-tight">Finanční Kompas</h2>
                   <p className="text-[16px] text-gray-500 max-w-[600px] mx-auto">Automaticky na pozadí analyzujeme vaši životní situaci. Sledujte svůj profil v reálném čase.</p>
                </div>

                <div className="space-y-6">
                   <AnimatePresence>
                     {extractedData.map((item, idx) => {
                       let isAlert = item.type === 'risk';
                       let actuallyResolved = resolvedRisks.includes(item.id);
                       let solutionObj = actuallyResolved ? SOLUTIONS_MAP[item.id] : null;
                       let isFocused = focusedItemId === item.id;

                       // Tvorba tříd pro plynulé animace a barev na základě stavů
                       let boxStyle = "bg-white border-gray-100 hover:shadow-modern-card";
                       let iconBg = "bg-gray-50 text-gray-400";
                       let titleColor = "text-[#222]";
                       let FinalIcon = item.icon;

                       if (isAlert && !actuallyResolved) {
                         boxStyle = "bg-white border-red-200 border-l-4 border-l-red-500 shadow-sm";
                         iconBg = "bg-red-50 text-red-500 scale-[1.05]";
                         titleColor = "text-red-700 font-bold";
                       } else if (isAlert && actuallyResolved) {
                         boxStyle = "bg-white border-[#d1fad8] border-l-4 border-l-green-500 shadow-md";
                         iconBg = "bg-green-100 text-green-600 scale-[1.05]";
                         titleColor = "text-green-700 font-bold";
                         FinalIcon = solutionObj.icon; // Ikonka produktu
                       } else if (item.type === 'goal') {
                         iconBg = "bg-blue-50 text-blue-600";
                         boxStyle = "bg-white border-blue-100 shadow-sm hover:-translate-y-1 transition-transform";
                       }

                       // Přidáme silný visuální fókusefekt pro prvek, který zrovna přibyl nebo se animuje
                       if (isFocused) {
                          boxStyle += " ring-2 ring-offset-4 ring-offset-[#f7f8fa] z-10 relative shadow-2xl scale-[1.02] -translate-y-1";
                          if (isAlert && !actuallyResolved) boxStyle += " ring-red-300";
                          else if (isAlert && actuallyResolved) boxStyle += " ring-green-300";
                          else boxStyle += " ring-blue-200 border-blue-200";
                       } else {
                          boxStyle += " opacity-80 scale-95 origin-top"; // Blur ostatních (focus mód)
                       }

                       return (
                         <motion.div 
                           ref={el => itemRefs.current[item.id] = el}
                           initial={{ opacity: 0, x: -50, height: 0, scale: 0.9 }} 
                           animate={{ 
                             opacity: isFocused ? 1 : 0.6, 
                             x: 0, 
                             height: 'auto',
                             scale: isFocused ? 1.02 : 1
                           }} 
                           transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                           key={item.id} 
                           className={cn("rounded-2xl border transition-all duration-700 md:items-start overflow-hidden mx-auto", boxStyle)}
                         >
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start z-10 relative bg-white rounded-2xl">
                              
                              {/* Overlay green shimmer during resolution */}
                              {isAlert && actuallyResolved && isFocused && (
                                <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/50 to-transparent z-0 pointer-events-none" />
                              )}

                              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors duration-700 relative z-10", iconBg)}>
                                 <AnimatePresence mode="popLayout">
                                    <motion.div key={actuallyResolved ? "res" : "unres"} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}>
                                      <FinalIcon size={32} strokeWidth={isAlert ? 2.5 : 2} />
                                    </motion.div>
                                 </AnimatePresence>
                              </div>

                              <div className="flex-1 relative z-10">
                                 {isAlert && !actuallyResolved && (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white mb-3 shadow-sm animate-pulse">
                                     <AlertTriangle size={14}/> Detekováno Riziko
                                   </span>
                                 )}
                                 {isAlert && actuallyResolved && (
                                   <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-500 text-white mb-3 shadow-sm">
                                     <CheckCircle2 size={14}/> Vyřešeno Produkty Generali
                                   </motion.span>
                                 )}
                                 {!isAlert && <span className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">{item.type === 'goal' ? 'Váš cíl' : 'Záznam'}</span>}
                                 
                                 <h4 className={cn("text-[20px] mb-2 transition-colors duration-500", titleColor)}>
                                   {actuallyResolved ? solutionObj.title : item.key}
                                 </h4>
                                 
                                 {actuallyResolved ? (
                                   <div className="text-[15px] space-y-3">
                                     <p className="text-gray-400 line-through max-w-xl text-[14px]">{item.value}</p>
                                     <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-gray-800 font-medium leading-relaxed bg-[#f4fcf6] p-4 rounded-xl border border-green-200 shadow-sm relative">
                                        <Sparkles size={20} className="absolute -top-3 -right-3 text-green-500 drop-shadow-sm" />
                                        {solutionObj.desc}
                                     </motion.p>
                                   </div>
                                 ) : (
                                   <p className={cn("text-[15px] leading-relaxed max-w-2xl transition-colors duration-500", isAlert ? "text-red-700 font-medium" : "text-gray-600")}>
                                     {item.value}
                                   </p>
                                 )}
                              </div>
                            </div>
                         </motion.div>
                       );
                     })}
                   </AnimatePresence>

                   {!isListening && extractedData.length === 0 && (
                     <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 bg-white/50 mt-10">
                        <Clock size={64} className="mx-auto mb-6 opacity-20" />
                        <h3 className="text-[24px] font-bold mb-3 text-gray-800 tracking-tight">Váš vizuální profil čeká na první záznam</h3>
                        <p className="text-[16px] text-gray-500 max-w-sm mx-auto">V reálném čase zde rozebereme vaši situaci a zaměříme se na to klíčové.</p>
                     </div>
                   )}
                </div>

                {/* Velké ukázání řešení (až po skončení přepisu) */}
                {isFinished && !isSolvingMode && extractedData.some(d => d.type === 'risk') && (
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 20 }} className="fixed bottom-0 left-0 w-full p-8 transition-all pointer-events-none flex justify-center z-50">
                    <div className="relative pointer-events-auto shadow-2xl rounded-2xl w-full max-w-[800px]">
                      <Button onClick={handleSolveRisks} className="w-full h-[64px] bg-gradient-to-r from-[#c8102e] to-[#a00c24] border-none text-white rounded-2xl text-[18px] font-bold tracking-wide shadow-[0_15px_40px_rgba(200,16,46,0.4)] flex items-center justify-center group overflow-hidden relative">
                        <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <Sparkles size={24} className="mr-3 group-hover:scale-110 transition-transform" /> 
                        UKÁZAT NÁVRHY AI ŘEŠENÍ RIZIK
                      </Button>
                    </div>
                  </motion.div>
                )}

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
