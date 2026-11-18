import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Scan, 
  Calculator, 
  TrendingUp, 
  Bot, 
  CloudSun, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Droplet, 
  Wind, 
  Thermometer, 
  Calendar,
  Layers,
  Clock
} from 'lucide-react';

export default function Dashboard({ setActiveTab, onOpenScanner, scanHistory }) {
  const { user, setIsAuthModalOpen } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 skew-x-12 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{user?.badge || 'Smart Agro Hub'} • Real-Time AI Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('welcome')}, {user?.name || 'Farmer'}! 🌾
            </h1>
            <p className="text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
              Monitoring <span className="font-semibold text-white">{user?.farmName || 'Green Valley Agro'}</span> ({user?.farmSize || '14.5 Acres'}). 
              Weather conditions are currently optimal for systemic fungicide spraying and basal fertilization.
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={onOpenScanner}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              <Scan className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>{t('scanNow')}</span>
            </button>
            <button
              onClick={() => setActiveTab('advisory')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span>Fertilizer Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Field Health */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Crop Health Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">94.2%</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-1 font-semibold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>+2.4% vs last week</span>
          </div>
        </div>

        {/* AI Scans Executed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Scans Executed</span>
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{scanHistory.length + 12}</div>
          <div className="flex items-center gap-1.5 text-xs text-teal-700 mt-1 font-semibold">
            <span>98.6% Pathogen Accuracy</span>
          </div>
        </div>

        {/* Active Outbreak Risk */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Humidity Spore Alert</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">Moderate</div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 mt-1 font-semibold">
            <span>Fungal Risk in Tomato & Potato</span>
          </div>
        </div>

        {/* Market Rate Ticker */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('mandi')}>
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Wheat Mandi Rate</span>
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">₹2,480</div>
          <div className="flex items-center gap-1 text-xs text-emerald-700 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+₹45 / Qtl (Khanna Mandi)</span>
          </div>
        </div>

      </div>

      {/* Main Row: Agricultural Weather + AI Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weather & Agronomic Microclimate Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-amber-500" />
                Agro-Meteorological Advisory
              </h2>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Live Sensor Feed
              </span>
            </div>

            {/* Current Conditions Card */}
            <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-emerald-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-extrabold text-slate-900">26°C</span>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">Partly Cloudy • Clear Visibility</p>
                </div>
                <CloudSun className="w-12 h-12 text-amber-500 animate-pulse-slow" />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-200/40 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Relative Humidity</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Droplet className="w-3 h-3 text-blue-500" /> 58%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Wind Speed</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Wind className="w-3 h-3 text-teal-500" /> 8 km/h
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Precipitation Risk</span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
                    10% Low
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Day Farm Weather Forecast */}
            <div className="mt-4 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                4-Day Agricultural Spray Window
              </span>
              {[
                { day: "Today (Wed)", temp: "26°C / 16°C", condition: "Sunny", spray: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                { day: "Tomorrow (Thu)", temp: "27°C / 17°C", condition: "Clear Sky", spray: "Optimal", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                { day: "Friday", temp: "24°C / 18°C", condition: "Humid / Overcast", spray: "Caution (High RH)", color: "text-amber-700 bg-amber-50 border-amber-200" },
                { day: "Saturday", temp: "22°C / 15°C", condition: "Light Showers", spray: "Do Not Spray", color: "text-red-700 bg-red-50 border-red-200" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{item.day}</span>
                  </div>
                  <span className="text-slate-500 font-medium">{item.temp}</span>
                  <span className={`px-2 py-0.5 rounded-md border font-bold text-[10px] ${item.color}`}>
                    {item.spray}
                  </span>
                </div>
              ))}
            </div>

            {/* Advisory Note */}
            <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-snug">
              <span className="font-bold block text-blue-800 mb-0.5">Agrometeorological Recommendation:</span>
              Spray systemic fungicide applications before Friday noon to avoid wash-off from anticipated weekend precipitation.
            </div>

          </div>
        </div>

        {/* Feature Hub & Recent Scans (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Action Card 1: AI Scanner */}
            <div 
              onClick={onOpenScanner}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Scan className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                AI Leaf Pathology Scanner
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Snapshot or upload leaf photos for instant disease detection, lesion boundary highlighting, and organic remedies.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">
                <span>Start Detection</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 2: Fertilizer & Agronomy */}
            <div 
              onClick={() => setActiveTab('advisory')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Smart Fertilizer Dose Calculator
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Calculate precise Urea, DAP, and MOP bags tailored for your soil profile, crop stage, and farm size.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-teal-600">
                <span>Calculate Doses</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 3: AgriBot Assistant */}
            <div 
              onClick={() => setActiveTab('agribot')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                AgriBot Voice & Text Assistant
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                24/7 AI agronomist with speech capability. Ask crop health queries, pesticide compatibility, and schemes.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-indigo-600">
                <span>Chat with AgriBot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 4: Mandi Rates */}
            <div 
              onClick={() => setActiveTab('mandi')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-green-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                Mandi Commodity Market
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Track live wholesale prices across regional APMC mandis with AI "Hold or Sell" price trend signals.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-green-600">
                <span>View Live Rates</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

          {/* Recent Scans Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Recent Diagnostic Scans
              </h3>
              <button 
                onClick={() => setActiveTab('history')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                View Full Log ({scanHistory.length})
              </button>
            </div>

            {scanHistory.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                <Scan className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No recent scans recorded yet today.</p>
                <button
                  onClick={onOpenScanner}
                  className="mt-2 text-xs font-bold text-emerald-600 hover:underline"
                >
                  Run your first crop leaf scan now →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {scanHistory.slice(0, 3).map((scan, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <img 
                        src={scan.customImage || scan.imageUrl} 
                        alt={scan.crop} 
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200" 
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{scan.diseaseName}</div>
                        <div className="text-[11px] text-slate-500">{scan.crop} • {scan.scanDate || 'Today'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        scan.severity === 'Critical' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : scan.severity === 'High' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {scan.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {scan.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
