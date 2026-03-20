import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { LifeJourney } from './pages/LifeJourney';
import { InteractiveMap } from './pages/InteractiveMap';
import { LiveNotes } from './pages/LiveNotes';
import { Clients } from './pages/Clients';
import { Insights } from './pages/Insights';
import { DiscoveryCore } from './pages/DiscoveryCore';
import { Intro } from './pages/Intro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        
        {/* Všechny vnitřní stránky jsou obaleny v Layout s menu */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discovery" element={<DiscoveryCore />} />
          <Route path="/journey" element={<LifeJourney />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/notes" element={<LiveNotes />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
