import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  PenTool, BrainCircuit, ShieldCheck, AlertTriangle, 
  TrendingUp, Activity, Home, Baby, Play, CheckCircle2 
} from 'lucide-react';
import { cn } from '../utils/cn';

// Simulace AI keyword detection
const KEYWORD_RULES = [
  {
    keywords: ['hypotéka', 'dům', 'byt', 'bydlení'],
    type: 'goal',
    title: 'Vlastní bydlení a Majetek',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    product: 'Pojištění majetku',
    reason: 'Dům, byt nebo věci v domácnosti? Můžete být v klidu, váš domov bude u nás v bezpečí.'
  },
  {
    keywords: ['dítě', 'děti', 'syn', 'dcera', 'rodina'],
    type: 'goal',
    title: 'Krytí a příprava na děti',
    icon: Baby,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    product: 'Úrazové pojištění (Dětský úraz)',
    reason: 'S dětmi roste riziko a odpovědnost. Je nezbytné sjednat kvalitní úrazové pojištění.'
  },
  {
    keywords: ['životní', 'bez životka', 'úraz'],
    type: 'risk',
    title: 'Fatální výpadek příjmů',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    product: 'Rizikové životní pojištění',
    reason: 'Hlavní chlebodárce bez invalidity III. stupně = okamžitý bankrot rodiny se zadlužením v případě těžké nemoci. Myslíme na vás i vaše blízké, aby byl život klidnější.'
  },
  {
    keywords: ['příjem', 'vydělává', 'tisíc', 'mzda', 'plat', 'rezerva'],
    type: 'data',
    title: 'Volné Cashflow k investici',
    icon: TrendingUp,
    color: 'text-green-600',
    bg: 'bg-green-50',
    product: 'Investiční fondy a portfolia',
    reason: 'Z volných prostředků odkládat min. 10 % měsíčně. Vytvořit dlouhodobou ochranu před inflací a základ pro rentu.'
  }
];

export const LiveNotes = () => {
  const [notes, setNotes] = useState('');
  const [extractedItems, setExtractedItems] = useState([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [buttonStates, setButtonStates] = useState({});
  
  const bottomRef = useRef(null);

  // Auto Scroll Textu
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notes]);

  // Sledování změn v textu pro simulaci AI extrakce
  useEffect(() => {
    if (!notes.trim()) return;

    const text = notes.toLowerCase();
    const newItems = [];

    KEYWORD_RULES.forEach(rule => {
      // Když "AI" najde keyword v textu, přidá ho do vyhodnocených (ukáže jen ty unikátní)
      const found = rule.keywords.some(kw => text.includes(kw));
      if (found) {
        newItems.push(rule);
      }
    });

    setExtractedItems(newItems);
  }, [notes]);

  const handleStartSimulation = () => {
    setIsSimulationRunning(true);
    setHasFinished(false);
    setNotes('');
    setExtractedItems([]);
    setButtonStates({});

    const simulationText = `PŘEPIS SCHŮZKY ZE DNE: 24. 8. 2026\nÚČASTNÍK: Pan Dvořák (34 let)\n\nZÁPIS Z JEDNÁNÍ:\nPan Dvořák má celkový čistý měsíční příjem přibližně 75 tisíc korun. Často zmiňuje, že mají v plánu s rodinou růst. Vlastně zrovna zjistili fantastickou novinku, že manželka čeká druhé dítě.\n\nZ Toho důvodu se minulý týden rozhodli pro zásadní krok - vzali si úvěr a hypotéka na nový rodinný dům na okraji Prahy už je podepsaná na částku 8 milionů.\n\nKdyž jsem se ptal na ochranu celého tohoto závazku, ukázalo se poměrně závažné zjištění. Pan Dvořák je aktuálně úplně bez životka a má vyřešené akorát staré povinné ručení na auto. \n\nZbytkem volných peněz na účtu tvoří drobná rezerva k investici.\n\n--- KONEC ZÁPISU ---`;
    
    let currentText = "";
    let i = 0;
    
    const typeNextChar = () => {
      if (i < simulationText.length) {
        currentText += simulationText.charAt(i);
        setNotes(currentText);
        i++;
        
        let delay = simulationText.charAt(i) === ' ' ? 80 : 25;
        if (simulationText.charAt(i) === '\n') delay = 500;
        
        setTimeout(typeNextChar, delay);
      } else {
        setIsSimulationRunning(false);
        setHasFinished(true);
      }
    };
    
    typeNextChar();
  };

  const handleProductAction = (title) => {
    setButtonStates(prev => ({ ...prev, [title]: 'loading' }));
    setTimeout(() => {
      setButtonStates(prev => ({ ...prev, [title]: 'done' }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#222]">
      
      {/* Hlavní lišta */}
      <header className="h-[80px] px-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 top-0 sticky z-20">
         <div className="flex items-center text-[#c8102e] font-serif text-[24px]">
            <img src="https://www.generaliceska.cz/cp-2020-theme/images/generali-ceska-pojistovna.svg" className="h-8 object-contain" alt="Generali Česká pojišťovna" />
            <span className="ml-4 pl-4 border-l border-gray-200 text-[16px] font-sans font-bold text-gray-800 flex items-center gap-2">
               <PenTool size={18} /> Osobní AI Asistent Generali
            </span>
         </div>
         {hasFinished && (
           <Button onClick={handleStartSimulation} variant="secondary" className="h-[40px] px-4 font-bold bg-[#fcf4f5] text-[#c8102e] border-none shadow-none hover:bg-[#f5d0d4]">
              Přehrát znova
           </Button>
         )}
      </header>

      <main className="max-w-[1400px] mx-auto p-6 lg:p-10">
        
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] min-h-[600px]">
          
          {/* LEVÝ PANEL S NADPISEM */}
          <div className="flex-1 flex flex-col h-full">
            <div className="mb-6 shrink-0 block md:flex justify-between items-end">
              <div>
                <h1 className="text-[32px] font-bold text-[#222] tracking-tight mb-2">Generování CRM z Poznámek</h1>
                <p className="text-[16px] text-gray-500">Zatímco si vy (nebo AI z hovoru) píšete hrubý nekonečný text, systém okamžitě chytá data a staví obchod.</p>
              </div>
            </div>

            <Card className="flex-1 shadow-modern-card border border-gray-100 flex flex-col overflow-hidden relative">
              <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between z-10 shrink-0">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   Zápis ze Schůzky
                 </span>
              </div>
              
              <div className="flex-1 p-6 md:p-8 text-[18px] text-gray-800 leading-loose overflow-y-auto custom-scrollbar bg-white font-mono opacity-90 relative">
                 
                 {/* Pokud simulace ještě nezačala, ukaž velké spouštěcí CTA */}
                 {!isSimulationRunning && !hasFinished && notes === '' && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                      <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center max-w-sm border border-gray-100">
                         <div className="w-16 h-16 rounded-full bg-[#fcf4f5] text-[#c8102e] flex items-center justify-center mb-6">
                           <Play size={32} />
                         </div>
                         <h3 className="text-[20px] font-bold text-[#222] mb-2 tracking-tight">Ukázka Live Přepisu</h3>
                         <p className="text-[#555] text-[15px] mb-8 leading-relaxed">Spusťte ukázku a sledujte, jak se automaticky plní text a na pozadí pracující AI navrhuje vaše produkty.</p>
                         <Button onClick={handleStartSimulation} className="w-full h-14 bg-[#c8102e] hover:bg-[#a00c24] text-white text-[15px] font-bold tracking-wide rounded-xl shadow-lg flex items-center gap-2 relative overflow-hidden group hover:scale-105 transition-all">
                           SPUSTIT SIMULACI PSANÍ
                           <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                         </Button>
                      </div>
                   </div>
                 )}

                 {/* Zobrazování textu rozděleně po odstavcích */}
                 <div className="pb-10">
                   {notes.split('\n').map((line, i) => (
                     <React.Fragment key={i}>
                       {line}
                       {i < notes.split('\n').length - 1 && <br />}
                     </React.Fragment>
                   ))}
                   {isSimulationRunning && (
                     <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-5 bg-[#c8102e] align-middle ml-1" />
                   )}
                   <div ref={bottomRef} className="h-4" />
                 </div>
              </div>
            </Card>
          </div>

          {/* PRAVÝ PANEL: AI Vyhodnocování v reálném čase */}
          <div className="w-full lg:w-[480px] flex flex-col h-full">
             <div className="bg-[#222] rounded-t-2xl p-6 text-white pb-8 relative overflow-hidden border border-[#222] shrink-0">
                <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                  <BrainCircuit size={150} />
                </div>
                <h3 className="text-[18px] font-bold flex items-center gap-2 relative z-10 mb-2">
                  <Activity className={cn("text-red-400", isSimulationRunning ? "animate-pulse" : "")} size={22} />
                  REDy AI Detekce Produktů
                </h3>
                <p className="text-gray-400 text-[13px] relative z-10 font-medium">Automatické vytěžování prodejního potenciálu z textu.</p>
             </div>

             <div className="flex-1 bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-modern-card p-6 overflow-y-auto custom-scrollbar relative">
                
                {!isSimulationRunning && extractedItems.length === 0 && !hasFinished && (
                   <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <BrainCircuit size={64} className="text-gray-200 mb-6 opacity-50" />
                      <p className="text-gray-400 font-bold mb-2 tracking-wide text-[16px]">Žádná záchytná data</p>
                      <p className="text-[14px] text-gray-500 max-w-[250px]">Spusťte simulaci vlevo a analyzátor začne navrhovat balíčky.</p>
                   </div>
                )}

                <div className="space-y-6">
                   <AnimatePresence>
                     {extractedItems.map((item, idx) => {
                       const IconItem = item.icon;
                       const status = buttonStates[item.title] || 'idle';
                       
                       return (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.9, x: 20 }} 
                           animate={{ opacity: 1, scale: 1, x: 0 }} 
                           transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                           key={item.title} 
                           className="flex flex-col border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                         >
                            {/* Highlight detekce z textu */}
                            <div className={cn("flex flex-row items-center gap-4 p-5 border-b border-gray-100", item.bg)}>
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                 <IconItem size={24} className={item.color} />
                               </div>
                               <div>
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                   AI detekovalo signál z textu
                                 </span>
                                 <h4 className={cn("font-bold text-[18px] leading-tight mt-1", item.color)}>{item.title}</h4>
                               </div>
                            </div>
                            
                            {/* Generali Návrh produktu */}
                            <div className="p-6 bg-white space-y-4">
                               <div className="flex items-center gap-2">
                                 <ShieldCheck size={20} className="text-[#c8102e]" />
                                 <span className="font-bold text-[15px] text-[#222] tracking-tight">AI Doporučuje k prodeji</span>
                               </div>
                               
                               <div className="bg-[#fcf4f5] border border-[#f5d0d4] px-4 py-3 rounded-xl border-l-4 border-l-[#c8102e]">
                                 <p className="text-[#c8102e] font-bold text-[15px]">{item.product}</p>
                               </div>

                               <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                                 {item.reason}
                               </p>

                               <Button 
                                 onClick={() => handleProductAction(item.title)}
                                 disabled={status !== 'idle'}
                                 className={cn("w-full mt-2 tracking-wide font-bold text-[13px] h-11 transition-all rounded-xl shadow-sm",
                                    status === 'done' ? "bg-green-50 text-green-700 border border-green-200 pointer-events-none" : 
                                    status === 'loading' ? "bg-[#c8102e]/50 text-white cursor-wait" :
                                    "bg-white text-[#c8102e] hover:bg-[#c8102e] hover:text-white border border-[#c8102e]/30"
                                 )}
                               >
                                 {status === 'done' ? (
                                    <span className="flex items-center justify-center gap-2">
                                      <CheckCircle2 size={16} /> VYGENEROVÁNO DO CRM
                                    </span>
                                 ) : status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-2">
                                      <CheckCircle2 size={16} className="animate-spin" /> GENERUJI NÁVRHY...
                                    </span>
                                 ) : (
                                    "Vygenerovat Produktovou Nabídku"
                                 )}
                               </Button>
                            </div>

                         </motion.div>
                       )
                     })}
                   </AnimatePresence>
                </div>
             </div>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </main>
    </div>
  );
};
