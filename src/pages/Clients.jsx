import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Filter, MoreHorizontal, Plus, Phone, Mail, X, Activity, MessageSquare, ArrowRight, ShieldCheck, PieChart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

const initialClients = [
  { id: 1, name: "Martina Nováková", role: "CEO @ NovaTech", email: "martina@novatech.cz", phone: "+420 777 123 456", status: "Aktivní", lastContact: "Před 2 dny", value: "3.2M Kč", aiInsight: "Zletilost dítěte za 3 měsíce. Příležitost pro dospělý investiční fond." },
  { id: 2, name: "Petr Svoboda", role: "Freelance Designer", email: "petr@svoboda.design", phone: "+420 603 987 654", status: "Čekající návrh", lastContact: "Včera", value: "850k Kč", aiInsight: "Fixace hypotéky končí za půl roku. Vhodný čas na refinancování a křížový prodej Pojištění majetku." },
  { id: 3, name: "Rodina Dvořákova", role: "Rodinné finance", email: "rodina@dvorak.cz", phone: "+420 732 111 222", status: "Aktivní", lastContact: "Před týdnem", value: "12.5M Kč", aiInsight: "Narození druhého dítěte. Fatální podpojištění hlavního živitele. Nutná revize Rizikového životního pojištění." },
  { id: 4, name: "Tomáš Kovář", role: "Software Engineer", email: "tomas.kovar@gmail.com", phone: "+420 777 999 888", status: "Aktivní", lastContact: "Před 3 týdny", value: "2.1M Kč", aiInsight: "Riziko odchodu 85%. Negativní sentiment v klientské zóně. Doporučen okamžitý retenční hovor." },
  { id: 5, name: "Lucie Černá", role: "Lékařka", email: "lucie.cerna@hospital.cz", phone: "+420 606 555 444", status: "Neaktivní", lastContact: "Před 2 měsíci", value: "---", aiInsight: "Blíží se exspirace AML/KYC dotazníku. Odeslat automatizovanou výzvu do portálu." },
];

export const Clients = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Vše");
  
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");

  const navigate = useNavigate();

  // Filtrování klienta (hledání + status)
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Vše" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    
    const newClient = {
      id: Date.now(),
      name: newClientName,
      role: "Nový Klient",
      email: "email@nezadan.cz",
      phone: "+420 --- --- ---",
      status: "Čekající návrh",
      lastContact: "Dnes",
      value: "0 Kč",
      aiInsight: "Nový klient v systému. Spusťte AI Analýzu Potřeb pro zjištění dat."
    };

    setClients([newClient, ...clients]);
    setNewClientName("");
    setIsAddingClient(false);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#222]">
      <div className="px-6 lg:px-12 py-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-[32px] font-semibold text-[#222] mb-2 tracking-tight">Databáze Klientů</h1>
            <p className="text-[#888] font-light text-[16px]">Správa a segmentace vašeho poradenského kmene.</p>
          </div>
          <Button onClick={() => setIsAddingClient(true)} className="h-[48px] px-8 text-[14px] font-bold bg-[#c8102e] text-white hover:bg-[#a00c24] rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <Plus size={18} className="mr-2" /> Vytvořit novou kartu
          </Button>
        </div>

        {/* Modal přidání klienta */}
        <AnimatePresence>
          {isAddingClient && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsAddingClient(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-2xl font-bold">Přidat Klienta</h2>
                   <button onClick={() => setIsAddingClient(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                 </div>
                 <form onSubmit={handleAddClient} className="space-y-6">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Jméno a Příjmení</label>
                     <input 
                       autoFocus
                       type="text" 
                       value={newClientName}
                       onChange={e => setNewClientName(e.target.value)}
                       placeholder="Např. Jan Novák" 
                       className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] outline-none transition-all"
                     />
                   </div>
                   <Button type="submit" disabled={!newClientName.trim()} className="w-full h-12 bg-[#c8102e] hover:bg-[#a00c24] text-white rounded-xl font-bold text-[15px]">
                     Uložit Klienta
                   </Button>
                 </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="border-0 shadow-modern-card overflow-hidden rounded-2xl">
          {/* Toolbar */}
          <div className="p-6 flex flex-col sm:flex-row gap-4 bg-white items-center border-b border-gray-100">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" size={18} />
              <input 
                type="text" 
                placeholder="Hledat jméno, firmu, telefon..." 
                className="w-full pl-12 pr-4 h-[44px] rounded-xl border border-gray-200 outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] hover:border-gray-300 transition-colors text-[14px] font-medium bg-[#fcfcfc]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-xl">
               {["Vše", "Aktivní", "Čekající návrh", "Neaktivní"].map(status => (
                 <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={cn("px-4 py-2 text-[13px] font-bold rounded-lg transition-all", filterStatus === status ? "bg-white text-[#222] shadow-sm" : "text-gray-500 hover:text-gray-700")}
                 >
                   {status}
                 </button>
               ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white min-h-[400px]">
            <table className="w-full text-left text-[14px] whitespace-nowrap bg-white">
              <thead className="bg-[#fcfcfc] border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[12px] font-bold text-[#888] uppercase tracking-wider w-[350px]">Profil Klienta</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-[#888] uppercase tracking-wider">Status CRM</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-[#888] uppercase tracking-wider">AUM / Objem</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-[#888] uppercase tracking-wider">Poslední Aktivita</th>
                  <th className="px-8 py-5 text-center text-[12px] font-bold text-[#888] uppercase tracking-wider text-right">Zkratky</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filteredClients.length === 0 && (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <td colSpan={5} className="py-20 text-center text-gray-400">
                        <Search size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-bold">Žádní klienti nenalezeni</p>
                        <p>Zkuste upravit hledaný výraz nebo filtry.</p>
                      </td>
                    </motion.tr>
                  )}
                  {filteredClients.map((client) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={client.id} 
                      onClick={() => setSelectedClient(client)}
                      className="hover:bg-gray-50/80 hover:shadow-[inset_4px_0_0_0_#c8102e] transition-all group cursor-pointer"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-[18px] shrink-0 border", 
                            client.status === 'Aktivní' ? "bg-green-50 text-green-700 border-green-100" :
                            client.status === 'Čekající návrh' ? "bg-[#fcf4f5] text-[#c8102e] border-red-100" :
                            "bg-gray-50 text-gray-500 border-gray-200"
                          )}>
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#222] text-[16px] mb-0.5">{client.name}</p>
                            <p className="text-[13px] text-[#888] font-medium">{client.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1.5 text-[12px] font-bold tracking-wide rounded-md inline-flex items-center gap-1.5",
                          client.status === 'Aktivní' ? "bg-green-50 text-green-700" :
                          client.status === 'Čekající návrh' ? "bg-[#fdf2f3] text-[#c8102e]" :
                          "bg-gray-100 text-gray-500"
                        )}>
                          {client.status === 'Aktivní' && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                          {client.status === 'Čekající návrh' && <div className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse" />}
                          {client.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-bold text-[#222] text-[16px]">{client.value}</td>
                      <td className="px-8 py-6 text-[#555] font-medium text-[14px]">{client.lastContact}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-[#555] hover:text-[#c8102e] bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition-all" onClick={(e) => { e.stopPropagation(); window.open(`tel:${client.phone}`); }}><Phone size={16} /></Button>
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-[#555] hover:text-[#c8102e] bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition-all" onClick={(e) => { e.stopPropagation(); window.open(`mailto:${client.email}`); }}><Mail size={16} /></Button>
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-[#555] hover:text-[#222] bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition-all" onClick={() => setSelectedClient(client)}><ArrowRight size={16} /></Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* DETAIL KLIENTA MODAL / DRAWER */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end"
            onClick={() => setSelectedClient(null)}
          >
             <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="bg-white h-full w-full max-w-xl shadow-2xl flex flex-col"
               onClick={e => e.stopPropagation()}
             >
                <div className="p-8 border-b border-gray-100 bg-[#f7f8fa] relative">
                   <button onClick={() => setSelectedClient(null)} className="absolute top-8 right-8 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"><X size={20} className="text-gray-500"/></button>
                   
                   <div className="flex items-center gap-6 mt-4">
                      <div className="w-20 h-20 rounded-3xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-3xl font-bold text-[#c8102e]">
                        {selectedClient.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-1">{selectedClient.name}</h2>
                        <span className="text-gray-500 font-medium tracking-wide flex items-center gap-2"><Star size={16} className="text-[#c8102e]" fill="#c8102e"/> VIP Segment</span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
                   
                   {/* Kontakty */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group cursor-pointer hover:border-gray-300 transition-colors">
                        <Phone size={20} className="text-[#c8102e] mb-2" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Telefon</p>
                        <p className="font-bold text-[#222]">{selectedClient.phone}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group cursor-pointer hover:border-gray-300 transition-colors">
                        <Mail size={20} className="text-[#c8102e] mb-2" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail</p>
                        <p className="font-bold text-[#222]">{selectedClient.email}</p>
                      </div>
                   </div>

                   {/* AI Insight */}
                   <div>
                     <div className="flex items-center gap-2 mb-4">
                        <Activity size={20} className="text-[#c8102e]" />
                        <h3 className="font-bold text-xl">REDy AI Insight</h3>
                     </div>
                     <div className="p-5 rounded-2xl bg-[#fcf4f5] border border-[#f5d0d4] relative overflow-hidden">
                        <ShieldCheck size={100} className="absolute -right-6 -bottom-6 text-red-100 pointer-events-none" />
                        <p className="relative z-10 text-[#c8102e] font-bold leading-relaxed">{selectedClient.aiInsight}</p>
                     </div>
                   </div>

                   {/* Stats */}
                   <div>
                     <div className="flex items-center gap-2 mb-4">
                        <PieChart size={20} className="text-gray-400" />
                        <h3 className="font-bold text-xl">Finanční Souhrn</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Pod Správou</span>
                          <span className="text-2xl font-bold text-[#222]">{selectedClient.value}</span>
                        </div>
                        <div className="p-5 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Smluv</span>
                          <span className="text-2xl font-bold text-[#222]">4 aktivní</span>
                        </div>
                     </div>
                   </div>

                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 grid grid-cols-2 gap-4">
                   {/* Tlacitko pro start Zivotni Mapy rovnou s klientem */}
                   <Button onClick={() => navigate('/map')} className="col-span-2 h-14 bg-[#c8102e] hover:bg-[#a00c24] text-white rounded-xl shadow-lg font-bold text-[15px] group">
                     Spustit AI Životní Mapu <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                   <Button variant="secondary" className="h-12 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-100">
                     <MessageSquare size={18} className="mr-2" /> Zápis z porady
                   </Button>
                   <Button onClick={() => handleDeleteClient(selectedClient.id)} variant="ghost" className="h-12 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold rounded-xl transition-colors">
                     Smazat kartu
                   </Button>
                </div>

             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
