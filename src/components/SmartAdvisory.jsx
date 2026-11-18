import React, { useState } from 'react';
import { CROPS_DATA, SOIL_TYPES, calculateFertilizer } from '../data/agronomyData';
import { 
  Calculator, 
  Sprout, 
  Droplet, 
  Layers, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Download
} from 'lucide-react';

export default function SmartAdvisory() {
  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [areaAcres, setAreaAcres] = useState(5);
  const [selectedSoil, setSelectedSoil] = useState('alluvial');

  const selectedCrop = CROPS_DATA.find(c => c.id === selectedCropId) || CROPS_DATA[0];
  const selectedSoilData = SOIL_TYPES.find(s => s.id === selectedSoil) || SOIL_TYPES[0];

  const fertilizerResult = calculateFertilizer(selectedCropId, Number(areaAcres) || 1, selectedSoil);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/40 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-300" />
            <span>Precision Agronomy & Nutrient Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Smart Crop Advisory & Fertilizer Calculator
          </h1>
          <p className="text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
            Eliminate fertilizer wastage and soil degradation. Compute scientifically balanced N-P-K nutrient doses, commercial bag requirements (Urea, DAP, MOP), and irrigation schedules customized for your acreage and soil type.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Sprout className="w-4 h-4 text-emerald-600" />
              Field Parameters & Crop Choice
            </h2>

            {/* Crop Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Crop
                </label>
                <select
                  value={selectedCropId}
                  onChange={(e) => setSelectedCropId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CROPS_DATA.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name} ({crop.season})
                    </option>
                  ))}
                </select>
              </div>

              {/* Farm Area Slider & Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Farm Area (in Acres)
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {areaAcres} Acres (~{(areaAcres / 2.471).toFixed(2)} Ha)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-2"
                />
                <div className="flex items-center gap-2">
                  {[1, 2.5, 5, 10, 20].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAreaAcres(preset)}
                      className={`text-[11px] font-semibold py-1 px-2 rounded-lg border transition-all ${
                        areaAcres === preset 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {preset} Ac
                    </button>
                  ))}
                </div>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Soil Classification
                </label>
                <select
                  value={selectedSoil}
                  onChange={(e) => setSelectedSoil(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {SOIL_TYPES.map((soil) => (
                    <option key={soil.id} value={soil.id}>
                      {soil.name}
                    </option>
                  ))}
                </select>

                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Natural Fertility:</span>
                    <span className="font-semibold text-slate-800">{selectedSoilData.fertility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Water Holding:</span>
                    <span className="font-semibold text-slate-800">{selectedSoilData.waterRetention}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ideal pH Range:</span>
                    <span className="font-semibold text-emerald-700">{selectedSoilData.phRange}</span>
                  </div>
                </div>
              </div>

              {/* Crop Tips Card */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-amber-800">Agronomist Pro Tip:</span>
                  <p className="mt-0.5 text-amber-800 leading-snug">{selectedCrop.tips}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Output: Fertilizer Recommendations & Water Calendar (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Calculation Output */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Fertilizer Requirement
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  Commercial Bags for {areaAcres} Acres of {selectedCrop.name.split(' ')[0]}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Formula: Standard NPK ({selectedCrop.standardNPK.n}:{selectedCrop.standardNPK.p}:{selectedCrop.standardNPK.k})
              </span>
            </div>

            {/* Bags Cards */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Urea */}
              <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Urea (46% N)
                </span>
                <div className="my-2">
                  <span className="text-3xl font-extrabold text-emerald-700">{fertilizerResult.ureaBags}</span>
                  <span className="text-xs text-emerald-800 font-semibold block">Bags (45 kg)</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Total: {fertilizerResult.ureaKg} kg
                </div>
              </div>

              {/* DAP */}
              <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                  DAP (18-46-0)
                </span>
                <div className="my-2">
                  <span className="text-3xl font-extrabold text-teal-700">{fertilizerResult.dapBags}</span>
                  <span className="text-xs text-teal-800 font-semibold block">Bags (50 kg)</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Total: {fertilizerResult.dapKg} kg
                </div>
              </div>

              {/* MOP */}
              <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-4 text-center shadow-xs">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  MOP (Potash 60%)
                </span>
                <div className="my-2">
                  <span className="text-3xl font-extrabold text-amber-700">{fertilizerResult.mopBags}</span>
                  <span className="text-xs text-amber-800 font-semibold block">Bags (50 kg)</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Total: {fertilizerResult.mopKg} kg
                </div>
              </div>

            </div>

            {/* Split Dose Application Schedule */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Recommended Split-Dose Application Timeline
              </h4>

              <div className="space-y-2.5">
                {fertilizerResult.applicationSchedule.map((sched, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{sched.stage}</div>
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">{sched.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Irrigation & Water Schedule */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                Critical Water Requirements & Growth Stages
              </h4>

              <div className="flex items-center gap-4 p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs mb-3">
                <div>
                  <span className="text-slate-500 block text-[11px]">Total Season Water:</span>
                  <span className="font-extrabold text-blue-800 text-sm">{selectedCrop.waterRequirement}</span>
                </div>
                <div className="w-px h-6 bg-blue-200"></div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Growth Period:</span>
                  <span className="font-extrabold text-blue-800 text-sm">{selectedCrop.growthDurationDays} Days</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedCrop.stages.map((stage, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs">
                    <span className="text-[10px] text-emerald-700 font-bold block">Stage {idx + 1}</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{stage}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
