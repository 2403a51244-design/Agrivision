import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Layers, 
  Droplet, 
  Thermometer, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  MapPin, 
  Activity, 
  Zap, 
  RefreshCw,
  Info,
  Maximize2
} from 'lucide-react';

const FIELD_ZONES = [
  {
    id: "zone-1",
    name: "Sector A: North High-Density Wheat",
    crop: "Wheat (Durum)",
    area: "4.2 Acres",
    ndvi: 0.84,
    status: "Optimal Vegetative Vigor",
    color: "from-emerald-500/80 to-emerald-600/80",
    border: "border-emerald-500",
    soilMoisture: "38% (Sufficient)",
    canopyTemp: "24.2°C",
    nitrogenStress: "Low (Deficit 0 kg/ha)",
    alert: null,
    recommendation: "Maintain standard irrigation. Zero fungicide required."
  },
  {
    id: "zone-2",
    name: "Sector B: Tomato Field / Nursery",
    crop: "Tomato (Hybrid)",
    area: "3.5 Acres",
    ndvi: 0.32,
    status: "Severe Pathogen Outbreak (Late Blight)",
    color: "from-red-500/80 to-amber-600/80",
    border: "border-red-500",
    soilMoisture: "52% (Excess Waterlogging)",
    canopyTemp: "21.0°C (High Evaporative Cooling)",
    nitrogenStress: "Severe Chlorosis",
    alert: "Critical Spore Sporulation Alert",
    recommendation: "Activate Variable-Rate Spraying: Apply Metalaxyl-Mancozeb immediately. Cut off furrow irrigation."
  },
  {
    id: "zone-3",
    name: "Sector C: Paddy / Rice Basin",
    crop: "Basmati Rice",
    area: "5.0 Acres",
    ndvi: 0.68,
    status: "Moderate Nitrogen Deficiency",
    color: "from-yellow-400/80 to-emerald-500/80",
    border: "border-yellow-400",
    soilMoisture: "85% (Standing Water Ok)",
    canopyTemp: "25.8°C",
    nitrogenStress: "Moderate Deficit (18 kg N/ha)",
    alert: "Early Bacterial Blight risk in North-East corner",
    recommendation: "Apply Neem-coated Urea top-dressing. Keep water level at 3cm."
  },
  {
    id: "zone-4",
    name: "Sector D: Mustard / Pulses Border",
    crop: "Mustard & Chickpea",
    area: "1.8 Acres",
    ndvi: 0.79,
    status: "Healthy Vegetative Canopy",
    color: "from-emerald-400/80 to-teal-600/80",
    border: "border-emerald-400",
    soilMoisture: "30% (Optimum)",
    canopyTemp: "26.1°C",
    nitrogenStress: "Low",
    alert: null,
    recommendation: "Good honeybee pollination activity. Avoid pesticide sprays during daylight."
  }
];

export default function DroneFieldMap({ onInspectZone }) {
  const [selectedZone, setSelectedZone] = useState(FIELD_ZONES[1]);
  const [mapMode, setMapMode] = useState('ndvi'); // 'ndvi' | 'moisture' | 'thermal' | 'rgb'
  const [isDroneFlying, setIsDroneFlying] = useState(true);
  const [droneTelemetry, setDroneTelemetry] = useState({
    altitude: 35, // meters
    speed: 18.4, // km/h
    battery: 86, // %
    signal: 98, // %
    satelliteFix: 14,
    heading: 142
  });

  // Simulated telemetry ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setDroneTelemetry(prev => ({
        ...prev,
        altitude: Math.round(34 + Math.random() * 2),
        speed: +(17.5 + Math.random() * 2).toFixed(1),
        battery: Math.max(20, +(prev.battery - 0.05).toFixed(1)),
        heading: (prev.heading + 1) % 360
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Plane className="w-3.5 h-3.5 text-amber-300" />
            <span>Autonomous Agricultural Drone & Multispectral NDVI Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Smart Field Map & Precision Scouting
          </h1>
          <p className="text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
            Monitor real-time vegetative canopy vigor, early foliar pathogen clusters, and moisture stress using simulated multi-spectral drone imagery with targeted variable-rate intervention zones.
          </p>
        </div>
      </div>

      {/* Drone Flight Live HUD Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <Plane className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">AgriHawk UAV-4 (Autonomous Mission)</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE PATROL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Flight Plan: 14.5 Acres Perimeter Grid • Waypoint 7 of 18</p>
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-[10px] text-slate-400 block uppercase">Altitude</span>
            <span className="text-emerald-400 font-bold">{droneTelemetry.altitude} m AGL</span>
          </div>

          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-[10px] text-slate-400 block uppercase">Speed</span>
            <span className="text-cyan-400 font-bold">{droneTelemetry.speed} km/h</span>
          </div>

          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-[10px] text-slate-400 block uppercase">Battery</span>
            <span className="text-amber-400 font-bold">{droneTelemetry.battery}%</span>
          </div>

          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-[10px] text-slate-400 block uppercase">GPS Fix</span>
            <span className="text-emerald-300 font-bold">{droneTelemetry.satelliteFix} Sats</span>
          </div>
        </div>
      </div>

      {/* Main Map View + Selected Zone Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Field Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            
            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Multispectral Field Layer
                </h3>
                <span className="text-[11px] text-slate-500">Click any sector to inspect microclimate & pathology</span>
              </div>

              {/* Mode Buttons */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                {[
                  { id: 'ndvi', label: 'NDVI Biomass' },
                  { id: 'moisture', label: 'Soil Moisture' },
                  { id: 'thermal', label: 'Thermal Stress' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setMapMode(mode.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      mapMode === mode.id
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Farm Satellite Map Container */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-inner group">
              
              {/* Background Farm Satellite Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center filter brightness-50 contrast-125"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80')` 
                }}
              ></div>

              {/* Grid Overlay Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"></div>

              {/* 4 Interactive Sectors */}
              <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-3">
                {FIELD_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  
                  // Dynamic coloring based on map mode
                  let bgClass = "bg-emerald-600/40 hover:bg-emerald-600/60";
                  if (mapMode === 'ndvi') {
                    if (zone.ndvi < 0.4) bgClass = "bg-red-500/50 hover:bg-red-500/70";
                    else if (zone.ndvi < 0.7) bgClass = "bg-amber-400/50 hover:bg-amber-400/70";
                    else bgClass = "bg-emerald-500/50 hover:bg-emerald-500/70";
                  } else if (mapMode === 'moisture') {
                    bgClass = zone.soilMoisture.includes('Excess') 
                      ? "bg-blue-600/60 hover:bg-blue-600/80" 
                      : "bg-teal-500/40 hover:bg-teal-500/60";
                  } else if (mapMode === 'thermal') {
                    bgClass = zone.canopyTemp > "25°C"
                      ? "bg-orange-500/50 hover:bg-orange-500/70"
                      : "bg-cyan-500/40 hover:bg-cyan-500/60";
                  }

                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={`relative rounded-xl p-3 text-left transition-all backdrop-blur-[2px] border-2 flex flex-col justify-between ${bgClass} ${
                        isSelected 
                          ? 'border-white ring-4 ring-emerald-400/50 shadow-2xl scale-[1.02] z-10' 
                          : 'border-white/40 hover:border-white/80'
                      }`}
                    >
                      {/* Sector Badge */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white font-mono uppercase">
                            {zone.name.split(':')[0]}
                          </span>
                          <h4 className="text-xs font-extrabold text-white mt-1 drop-shadow-md">
                            {zone.crop}
                          </h4>
                        </div>

                        {/* Status Icon */}
                        {zone.alert ? (
                          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center animate-bounce shadow-md">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-emerald-700/80 text-emerald-200 flex items-center justify-center">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Bottom Metric */}
                      <div className="flex items-end justify-between text-white drop-shadow">
                        <span className="text-[10px] font-semibold text-white/90">{zone.area}</span>
                        <div className="text-right font-mono">
                          <span className="text-[10px] text-white/70 block uppercase">NDVI</span>
                          <span className="text-sm font-extrabold">{zone.ndvi}</span>
                        </div>
                      </div>

                    </button>
                  );
                })}
              </div>

              {/* Flight Waypoint Marker (Animated Drone HUD) */}
              <div 
                className="absolute top-1/3 left-2/3 pointer-events-none transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-10 h-10 rounded-full border-2 border-emerald-400/80 animate-ping absolute"></div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/80 flex items-center justify-center text-white shadow-[0_0_20px_rgba(52,211,153,1)]">
                  <Plane className="w-4 h-4 transform rotate-45" />
                </div>
              </div>

            </div>

            {/* Map Legend */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span className="font-bold text-slate-800">NDVI Health Scale:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Critical (&lt; 0.4)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span>Stressed (0.4 - 0.7)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span>Optimal (&gt; 0.7)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Selected Sector Telemetry & Advisory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedZone.name.split(':')[0]} Analysis
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedZone.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedZone.crop} • {selectedZone.area}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">NDVI Index</span>
                <span className={`text-xl font-extrabold font-mono ${
                  selectedZone.ndvi < 0.4 ? 'text-red-600' : selectedZone.ndvi < 0.7 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {selectedZone.ndvi}
                </span>
              </div>
            </div>

            {/* Health Status Callout */}
            <div className={`p-3.5 rounded-xl border text-xs mb-4 ${
              selectedZone.alert
                ? 'bg-red-50 text-red-900 border-red-200'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedZone.alert ? (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                )}
                <span>{selectedZone.status}</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {selectedZone.alert || 'Field biomass and chlorophyll absorption within expected physiological range.'}
              </p>
            </div>

            {/* Agro-Microclimate Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                  <Droplet className="w-3 h-3 text-blue-500" />
                  Rhizosphere Moisture
                </span>
                <span className="font-extrabold text-slate-800 block text-sm">
                  {selectedZone.soilMoisture}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                  <Thermometer className="w-3 h-3 text-amber-500" />
                  Thermal Canopy
                </span>
                <span className="font-extrabold text-slate-800 block text-sm">
                  {selectedZone.canopyTemp}
                </span>
              </div>

              <div className="col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                  <Activity className="w-3 h-3 text-teal-600" />
                  Nitrogen Stress Index
                </span>
                <span className="font-bold text-slate-800 block">
                  {selectedZone.nitrogenStress}
                </span>
              </div>
            </div>

            {/* Smart Precision Recommendation */}
            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-950">
              <span className="font-bold text-teal-900 block mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-teal-700" />
                Variable-Rate Application (VRA) Advisory:
              </span>
              <p className="leading-relaxed font-medium">
                {selectedZone.recommendation}
              </p>
            </div>

            {/* Variable Rate Action Button */}
            {selectedZone.alert && (
              <button
                onClick={() => onInspectZone && onInspectZone(selectedZone)}
                className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-red-200" />
                <span>Launch Foliar Leaf Pathology Scan for this Hotspot</span>
              </button>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
