import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TrendingUp, ArrowRight, ShieldAlert, Sparkles, X, Mail, CheckCircle2, User, Phone, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const MOCK_OPPORTUNITIES = [
  { 
    id: 1,
    client: "Martina Nováková", 
    opp: "Zletilost Dítěte", 
    desc: "Založení nezávislého investičního účtu pro dceru Terezku.", 
    aiReasoning: "Dcera klienta Terezka dosáhne příští měsíc plnoletosti. Současné dětské spoření exspiruje. Ideální moment pro konverzi na dospělý investiční fond.",
    aiAction: "Odeslat e-mail s gratulací a nabídkou investičního startovacího portfolia.",
    phone: "+420 777 123 456",
    city: "Praha",
    status: 'pending'
  },
  { 
    id: 2,
    client: "Petr Svoboda", 
    opp: "Refinancování", 
    desc: "Fixace končí za 6 měsíců. Vhodné sjednat nové pojištění.", 
    aiReasoning: "Klient má hypotéku s úrokem 5.8%, v aktuálním trhu můžeme nabídnout lepší podmínky a přefinancovat i předschválený úvěr.",
    aiAction: "Vygenerovat porovnání sazeb a poslat do klientské zóny.",
    phone: "+420 603 987 654",
    city: "Brno",
    status: 'pending'
  },
  { 
    id: 3,
    client: "Rodina Dvořákova", 
    opp: "Podpojištění", 
    desc: "Nová pracovní pozice = vyšší příjem. Nutno upravit rizika.", 
    aiReasoning: "Dle dat z bankovních transakcí se klientovi zvýšil plat o 30%. Současné Rizikové životní pojištění je nastaveno na staré příjmy.",
    aiAction: "Zavolat klientovi a navrhnout aktualizaci pojistných částek (navýšení o 2 mil. Kč).",
    phone: "+420 732 111 222",
    city: "Ostrava",
    status: 'pending'
  },
];

const MOCK_SEGMENT_CLIENTS = [
  { id: 101, name: "Karel Vacek", status: 'pending' },
  { id: 102, name: "Jana Malá", status: 'pending' },
  { id: 103, name: "Filip Černý", status: 'pending' },
  { id: 104, name: "Tereza Nová", status: 'pending' }
];

export const Insights = () => {
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Makro Trend State
  const [showSegment, setShowSegment] = useState(false);
  const [segmentClients, setSegmentClients] = useState(MOCK_SEGMENT_CLIENTS);
  
  // Sidebar states
  const [churnState, setChurnState] = useState('pending'); // pending | loading | resolved
  const [amlState, setAmlState] = useState('pending'); // pending | loading | resolved

  const handleResolveOpportunity = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOpportunities(prev => prev.map(o => o.id === selectedOpp.id ? {...o, status: 'resolved'} : o));
      setTimeout(() => setSelectedOpp(null), 1000); 
    }, 1500);
  };

  const handleSegmentClientAction = (id) => {
    setSegmentClients(prev => prev.map(c => c.id === id ? {...c, status: 'processing'} : c));
    setTimeout(() => {
      setSegmentClients(prev => prev.map(c => c.id === id ? {...c, status: 'resolved'} : c));
    }, 1000);
  };

  const handleSidebarAction = (type) => {
    if (type === 'churn') {
      setChurnState('loading');
      setTimeout(() => setChurnState('resolved'), 1500);
    } else {
      setAmlState('loading');
      setTimeout(() => setAmlState('resolved'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#222]">
      <div className="px-6 lg:px-12 py-10 max-w-[1400px] mx-auto">
        
        {/* Header (Cleaned up, no unused buttons) */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-10">
          <div>
            <h1 className="text-[32px] font-semibold tracking-tight text-[#222] mb-2 flex items-center gap-3">
               <ShieldAlert className="text-[#c8102e]" size={36} /> AI Intelligence Centrum
            </h1>
            <p className="text-[#888] font-light text-[16px]">Automatická diagnostika celého poradcova kmene pomocí Generali REDy AI.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Highlight Card (Makro Trend) */}
          <Card className="lg:col-span-3 border-0 shadow-modern-card bg-gradient-to-br from-[#c8102e] to-[#9a0c24] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <CardContent className="p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex items-start gap-8">
                <div className="p-5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shrink-0 shadow-inner">
                  <TrendingUp size={40} className="text-white" strokeWidth={1.5} />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-4">
                     <span className="bg-white text-[#c8102e] text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm animate-pulse">
                       Makro Trend Detekován
                     </span>
                   </div>
                   <h2 className="text-[32px] font-semibold mb-3 leading-tight tracking-tight">Ochrana hotovosti před inflací</h2>
                   <p className="text-white/80 max-w-3xl text-[16px] leading-relaxed font-light">
                     AI systém identifikoval <strong>vybraných klientů</strong> s masivním podílem hotovosti na běžných účtech. 
                     REDy AI doporučuje okamžitě spustit automatizovanou kampaň s nabídkou investičních fondů.
                   </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowSegment(!showSegment)}
                className="shrink-0 bg-white text-[#c8102e] rounded-xl px-10 h-[56px] text-[15px] shadow-lg hover:bg-gray-50 hover:scale-105 transition-all border-0 font-bold"
              >
                {showSegment ? "ZAVŘÍT PŘEHLED KLIENTŮ" : "ZOBRAZIT NALEZENÉ KLIENTY"}
              </Button>
            </CardContent>
            
            {/* Rozbalovací sekce segmentu plně funkční */}
            <AnimatePresence>
              {showSegment && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-black/20 backdrop-blur-md border-t border-white/10 overflow-hidden">
                  <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                     {segmentClients.map(client => (
                       <motion.div layout key={client.id} className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center justify-between transition-colors">
                         <div className="flex items-center gap-3">
                           {client.status === 'resolved' ? (
                              <CheckCircle2 size={16} className="text-green-400" />
                           ) : (
                              <User size={16} className="text-white/70" />
                           )}
                           <span className={cn("text-sm font-medium", client.status === 'resolved' ? "text-green-400" : "text-white")}>{client.name}</span>
                         </div>
                         <Button 
                            onClick={() => handleSegmentClientAction(client.id)}
                            disabled={client.status !== 'pending'}
                            className={cn("h-7 text-[11px] px-3 font-bold transition-all", 
                              client.status === 'resolved' ? "bg-transparent text-green-400 border-none shadow-none px-0" : 
                              client.status === 'processing' ? "bg-white/50 text-[#c8102e] cursor-wait" : 
                              "bg-white text-[#c8102e]"
                            )}
                          >
                            {client.status === 'resolved' ? "Odesláno" : client.status === 'processing' ? "Zpracovávám..." : "Oslovit"}
                          </Button>
                       </motion.div>
                     ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Main List: Detekované Obchodní Příležitosti */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-modern-card border border-gray-100 flex flex-col h-full overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 flex flex-row items-center gap-3 p-8 pb-6">
                 <Sparkles className="text-[#c8102e]" size={24} />
                <h3 className="text-[20px] font-semibold text-[#222] tracking-tight">AI Obchodní Příležitosti</h3>
              </div>
              
              <div className="flex-1 divide-y divide-gray-100">
                <AnimatePresence>
                  {opportunities.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }}
                      className={cn(
                        "p-6 lg:p-8 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6",
                        item.status === 'resolved' ? "bg-green-50/30 grayscale" : "hover:bg-gray-50/50"
                      )}
                    >
                      <div className="flex gap-6 items-start">
                        <div className={cn("w-12 h-12 flex items-center justify-center font-bold text-[18px] rounded-xl shrink-0 shadow-sm", item.status === 'resolved' ? "bg-green-100 text-green-700" : "bg-[#fcf4f5] text-[#c8102e]")}>
                          {item.status === 'resolved' ? <CheckCircle2 size={24} /> : item.client.charAt(0)}
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-1.5">
                             <p className={cn("text-[18px] font-bold tracking-tight", item.status === 'resolved' ? "text-gray-500 line-through" : "text-[#222]")}>{item.client}</p>
                             <span className={cn("text-[11px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider", item.status === 'resolved' ? "bg-green-100 text-green-700" : "text-[#c8102e] bg-[#fdf2f3]")}>{item.opp}</span>
                           </div>
                           <p className="text-[14px] text-[#666] font-medium leading-relaxed max-w-xl">{item.desc}</p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => setSelectedOpp(item)}
                        disabled={item.status === 'resolved'}
                        className={cn("sm:self-center self-start h-10 px-6 font-bold tracking-wider text-[13px] rounded-lg transition-all", item.status === 'resolved' ? "bg-green-100 text-green-700 border-none shadow-none" : "bg-white text-[#c8102e] border border-red-100 shadow-sm hover:bg-[#c8102e] hover:text-white group")}
                      >
                         {item.status === 'resolved' ? "VYŘEŠENO" : "ANALYZOVAT A ŘEŠIT"} 
                         {item.status !== 'resolved' && <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {opportunities.filter(o => o.status === 'pending').length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center text-gray-500 flex flex-col items-center">
                     <CheckCircle2 size={48} className="text-green-500 mb-4 opacity-50" />
                     <p className="text-lg font-bold text-gray-800">Skvělá práce!</p>
                     <p>Pro dnešek jste vyřešili všechny proaktivní úkoly.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Rizika a Udržba kmene (Sidebar - Plně funkční tlačítka) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-modern-card border border-gray-100 flex flex-col h-full overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 flex flex-row items-center gap-3 p-8 pb-6">
                 <ShieldAlert className="text-[#888]" size={24} />
                <h3 className="text-[20px] font-semibold text-[#222] tracking-tight">Údržba kmene</h3>
              </div>
              <div className="flex-1 p-8 space-y-6 bg-white">
                  
                  {/* Churn Risk */}
                  <motion.div layout className={cn("p-6 border rounded-xl shadow-sm transition-all relative overflow-hidden group", churnState === 'resolved' ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:shadow-md")}>
                    {churnState === 'pending' && <div className="absolute top-0 right-0 w-2 h-full bg-red-500 opacity-20 group-hover:opacity-100 transition-opacity" />}
                    <div className="flex justify-between items-start mb-4">
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm", churnState === 'resolved' ? "bg-green-100 text-green-700" : "text-red-600 bg-red-50")}>
                        {churnState === 'resolved' ? "Vyřešeno" : "Riziko Odchodu 85%"}
                      </span>
                    </div>
                    <div className={cn("font-bold text-[20px] mb-2 tracking-tight", churnState === 'resolved' ? "text-green-800 line-through opacity-70" : "text-[#222]")}>Tomáš Kovář</div>
                    <p className={cn("text-[13px] font-medium leading-relaxed mb-6", churnState === 'resolved' ? "text-green-700" : "text-[#555]")}>
                      {churnState === 'resolved' ? "E-mail s pozvánkou na schůzku byl úspěšně vygenerován a odeslán." : "Analýza detekuje negativní sentiment a časté prohlížení zrušení smluv."}
                    </p>
                    <Button 
                      onClick={() => handleSidebarAction('churn')}
                      disabled={churnState !== 'pending'}
                      variant={churnState === 'pending' ? "secondary" : "ghost"} 
                      className={cn("w-full text-[13px] rounded-lg font-bold tracking-wide transition-all", 
                        churnState === 'resolved' ? "bg-green-100 text-green-700" : "bg-white border border-gray-200 shadow-sm hover:border-red-300"
                      )}
                    >
                      {churnState === 'pending' ? "Naplánovat Intervenci" : churnState === 'loading' ? "Plánuji..." : "Mítink Navržen"}
                    </Button>
                  </motion.div>

                  {/* AML Risk */}
                  <motion.div layout className={cn("p-6 border rounded-xl relative overflow-hidden transition-all", amlState === 'resolved' ? "bg-green-50 border-green-200" : "bg-[#fcf4f5] border-[#f5d0d4]")}>
                    <ShieldAlert size={100} className={cn("absolute -bottom-6 -right-6 pointer-events-none transition-colors", amlState === 'resolved' ? "text-green-100" : "text-red-100")} />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest border px-2 py-1 rounded-sm shadow-sm", amlState === 'resolved' ? "bg-green-500 border-green-500 text-white" : "text-white bg-[#c8102e] border-[#c8102e]")}>
                        {amlState === 'resolved' ? "Odesláno klientům" : "AML / KYC Exspirace"}
                      </span>
                    </div>
                    <div className={cn("font-bold text-[20px] mb-2 tracking-tight relative z-10", amlState === 'resolved' ? "text-green-800" : "text-[#c8102e]")}>
                      2 klienti v prodlení
                    </div>
                    <p className={cn("text-[13px] font-bold leading-relaxed mb-6 relative z-10", amlState === 'resolved' ? "text-green-700" : "text-[#c8102e]/80")}>
                      {amlState === 'resolved' ? "Dotazníky odeslány na email." : "Povinnost! Hrozí automatické omezení klientské zóny a propad provize."}
                    </p>
                    <Button 
                      onClick={() => handleSidebarAction('aml')}
                      disabled={amlState !== 'pending'}
                      className={cn("w-full text-white border-none text-[13px] rounded-lg shadow-md font-bold tracking-wide relative z-10 transition-all", 
                        amlState === 'resolved' ? "bg-green-500" : "bg-[#c8102e] hover:bg-[#a00c24]"
                      )}
                    >
                      {amlState === 'pending' ? "Odeslat Dotazníky" : amlState === 'loading' ? "Odesílám..." : "Odesláno a Vyřešeno"}
                    </Button>
                  </motion.div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* INTERAKTIVNÍ MODAL (ŘEŠENÍ HLAVNÍ PŘÍLEŽITOSTI) */}
      <AnimatePresence>
        {selectedOpp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => !isProcessing && setSelectedOpp(null)}
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-white rounded-3xl shadow-2xl w-full max-w-[700px] overflow-hidden flex flex-col"
               onClick={e => e.stopPropagation()}
             >
                {/* Modal Header */}
                <div className="bg-[#fcf4f5] p-6 lg:p-8 border-b border-[#f5d0d4] flex justify-between items-start relative overflow-hidden">
                   <Sparkles size={120} className="absolute -right-10 -bottom-10 text-white opacity-50 pointer-events-none" />
                   <div>
                      <span className="text-[12px] font-bold text-[#c8102e] uppercase tracking-widest mb-2 block animate-pulse">AI Analýza Příležitosti</span>
                      <h2 className="text-[28px] font-bold text-[#222] tracking-tight relative z-10">{selectedOpp.client}</h2>
                      <div className="flex gap-4 mt-3 relative z-10">
                         <span className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600 bg-white/60 px-2 py-1 rounded-md"><Phone size={14}/> {selectedOpp.phone}</span>
                         <span className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600 bg-white/60 px-2 py-1 rounded-md"><MapPin size={14}/> {selectedOpp.city}</span>
                      </div>
                   </div>
                   <button onClick={() => !isProcessing && setSelectedOpp(null)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors z-10 shadow-sm text-gray-500">
                     <X size={20} />
                   </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 lg:p-8 flex flex-col gap-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 border border-gray-100 rounded-xl bg-gray-50 shadow-sm relative hover:border-gray-300 transition-colors">
                         <Search className="absolute right-4 top-4 text-gray-300" size={20} />
                         <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Jak na to AI přišlo?</p>
                         <p className="text-[14px] text-gray-700 font-medium leading-relaxed">{selectedOpp.aiReasoning}</p>
                      </div>
                      <div className="p-5 border border-[#d1fad8] rounded-xl bg-[#f4fcf6] shadow-sm relative">
                         <ShieldAlert className="absolute right-4 top-4 text-green-200" size={20} />
                         <p className="text-[12px] font-bold text-green-600 uppercase tracking-widest mb-2">Doporučený postup</p>
                         <p className="text-[14px] text-green-800 font-medium leading-relaxed">{selectedOpp.aiAction}</p>
                      </div>
                   </div>

                   <div className="mt-4 p-5 bg-white border-2 border-dashed border-gray-200 rounded-xl text-center flex flex-col items-center">
                     <Mail size={32} className="text-[#c8102e] mb-3 opacity-50" />
                     <h4 className="font-bold text-[#222] mb-1">AI připravilo textaci do e-mailu a model v CRM</h4>
                     <p className="text-[13px] text-gray-500">Nabídka vyžaduje pouze vaši autorizaci na 1 kliknutí pro odeslání do portálu klienta.</p>
                   </div>
                </div>

                {/* Modal Footer / Action */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                   <Button 
                     onClick={handleResolveOpportunity}
                     disabled={isProcessing}
                     className={cn("h-[56px] px-8 rounded-xl font-bold tracking-wider text-[15px] shadow-lg transition-all w-full md:w-auto", 
                         isProcessing ? "bg-[#c8102e]/80 text-white cursor-wait" : "bg-[#c8102e] hover:bg-[#a00c24] text-white"
                     )}
                   >
                     {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="animate-spin" size={20} /> AUTORIZUJI A ODESÍLÁM...
                        </div>
                     ) : (
                        <div className="flex items-center gap-2">
                          <Sparkles size={20} /> POTVRDIT A ODESLAT KLIENTOVI
                        </div>
                     )}
                   </Button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
