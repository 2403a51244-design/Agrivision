import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DiseaseDetector from './components/DiseaseDetector';
import SmartAdvisory from './components/SmartAdvisory';
import DroneFieldMap from './components/DroneFieldMap';
import AgriBot from './components/AgriBot';
import MarketPrices from './components/MarketPrices';
import HistoryLog from './components/HistoryLog';
import AuthModal from './components/AuthModal';
import { DISEASE_DATABASE } from './data/diseaseDatabase';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldCheck, 
  Sprout, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agribotQuery, setAgribotQuery] = useState('');
  const [selectedScan, setSelectedScan] = useState(null);

  // Initial realistic scan history
  const [scanHistory, setScanHistory] = useState([
    {
      ...DISEASE_DATABASE[0], // Tomato Late Blight
      id: "scan-101",
      scanDate: "Today, 08:30 AM",
      affectedArea: "32%",
      severity: "Critical"
    },
    {
      ...DISEASE_DATABASE[1], // Rice Bacterial Blight
      id: "scan-102",
      scanDate: "Yesterday, 04:15 PM",
      affectedArea: "24%",
      severity: "High"
    },
    {
      ...DISEASE_DATABASE[5], // Wheat Stripe Rust
      id: "scan-103",
      scanDate: "Nov 15, 2026",
      affectedArea: "15%",
      severity: "Moderate"
    },
    {
      ...DISEASE_DATABASE[7], // Healthy
      id: "scan-104",
      scanDate: "Nov 14, 2026",
      affectedArea: "0%",
      severity: "None"
    }
  ]);

  const handleSaveScanToHistory = (newScan) => {
    setScanHistory(prev => [newScan, ...prev]);
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  const handleNavigateToBot = (query) => {
    setAgribotQuery(query);
    setActiveTab('agribot');
  };

  const handleInspectHistoricalScan = (item) => {
    setSelectedScan(item);
    setActiveTab('detector');
  };

  const handleInspectZoneFromMap = (zone) => {
    // If Late Blight is detected in sector B, open tomato late blight
    if (zone.id === 'zone-2') {
      setSelectedScan(DISEASE_DATABASE[0]);
    } else {
      setSelectedScan(DISEASE_DATABASE[1]);
    }
    setActiveTab('detector');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Advisory Ticker */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 border-b border-emerald-900 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
            <span className="font-bold text-white uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-emerald-900 border border-emerald-700 shrink-0">
              Agro Warning
            </span>
            <span className="text-emerald-100 truncate">
              Northern Plains: Anticipated high humidity (RH &gt; 85%) favors late blight sporulation. Keep systemic fungicides on standby.
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-emerald-300">
            <span className="flex items-center gap-1 font-semibold text-white">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              Kisan Toll-Free: 1800-180-1551
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenScanner={() => {
          setSelectedScan(null);
          setActiveTab('detector');
        }} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab}
            onOpenScanner={() => {
              setSelectedScan(null);
              setActiveTab('detector');
            }}
            scanHistory={scanHistory}
          />
        )}

        {activeTab === 'detector' && (
          <DiseaseDetector 
            onNavigateToBot={handleNavigateToBot}
            onSaveScanToHistory={handleSaveScanToHistory}
            selectedItem={selectedScan}
          />
        )}

        {activeTab === 'advisory' && (
          <SmartAdvisory />
        )}

        {activeTab === 'field-map' && (
          <DroneFieldMap 
            onInspectZone={handleInspectZoneFromMap}
          />
        )}

        {activeTab === 'agribot' && (
          <AgriBot 
            initialQuery={agribotQuery} 
          />
        )}

        {activeTab === 'mandi' && (
          <MarketPrices />
        )}

        {activeTab === 'history' && (
          <HistoryLog 
            scanHistory={scanHistory}
            onSelectScan={handleInspectHistoricalScan}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Global Modals */}
      <AuthModal />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            {/* Col 1: Brand & Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="text-base font-extrabold text-white">Agri<span className="text-emerald-400">Vision</span> AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Next-generation computer vision and agronomy intelligence platform empowering farmers with instant foliar pathogen diagnosis, precision NPK dosage planning, and drone multispectral telemetry.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
                <Cpu className="w-3.5 h-3.5" />
                <span>Inference Engine: ResNet-50 + YOLO-v8 Crop Pathology</span>
              </div>
            </div>

            {/* Col 2: Smart Farming Modules */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Modules</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveTab('detector')} className="hover:text-emerald-400 transition-colors">
                    AI Crop Disease Pathology Scanner
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('advisory')} className="hover:text-emerald-400 transition-colors">
                    Scientific NPK Fertilizer Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('field-map')} className="hover:text-emerald-400 transition-colors">
                    UAV Drone Multispectral NDVI Map
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('agribot')} className="hover:text-emerald-400 transition-colors">
                    AgriBot Voice Agronomist Assistant
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('mandi')} className="hover:text-emerald-400 transition-colors">
                    APMC Mandi Real-Time Wholesale Rates
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Agronomic Hotlines & Support */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Farmer Helplines</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kisan Call Center: <strong>1800-180-1551</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Pesticide Safety Advisory: <strong>1800-425-1556</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>PM-KISAN Samman: <strong>155261</strong></span>
                </li>
              </ul>
            </div>

            {/* Col 4: Agronomic Disclaimer */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Agronomic Advisory Notice
              </span>
              <p className="text-[11px] text-slate-400 leading-snug">
                AI diagnostic recommendations are generated based on foliar symptomatic imaging. Always verify spray concentrations with local agricultural extension officers before applying systemic agrochemicals.
              </p>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} AgriVision AI Inc. All rights reserved. Precision Agriculture for Sustainable Yields.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Crop Telemetry Terms</span>
              <span>•</span>
              <span>Agronomy Certifications</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </AuthProvider>
  );
}
