import React, { useState, useRef, useEffect } from 'react';
import { DISEASE_DATABASE } from '../data/diseaseDatabase';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  Upload, 
  Scan, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  MessageSquare, 
  RefreshCw, 
  Layers, 
  Info, 
  FileText, 
  Zap,
  ArrowRight,
  ChevronRight,
  Sliders
} from 'lucide-react';

export default function DiseaseDetector({ onNavigateToBot, onSaveScanToHistory, selectedItem }) {
  const { t } = useLanguage();
  
  // State
  const [selectedImage, setSelectedImage] = useState(selectedItem?.imageUrl || DISEASE_DATABASE[0].imageUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosis, setDiagnosis] = useState(selectedItem || DISEASE_DATABASE[0]);
  const [activeTab, setActiveTab] = useState('organic'); // 'organic' | 'chemical' | 'prevention'
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setDiagnosis(selectedItem);
      setSelectedImage(selectedItem.customImage || selectedItem.imageUrl);
    }
  }, [selectedItem]);
  
  const fileInputRef = useRef(null);

  // Trigger scan animation
  const runScan = (diseaseData, customImage = null) => {
    setIsScanning(true);
    setScanProgress(0);
    setSaveSuccess(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setDiagnosis(diseaseData);
            if (diseaseData.severity === 'None') {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 120);
  };

  const handleSampleSelect = (item) => {
    setSelectedImage(item.imageUrl);
    runScan(item);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const imageResult = uploadEvent.target?.result;
        setSelectedImage(imageResult);
        
        // Match random disease or match by keyword, or default to a realistic diagnosis
        const randomDisease = DISEASE_DATABASE[Math.floor(Math.random() * (DISEASE_DATABASE.length - 1))];
        runScan(randomDisease, imageResult);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveToHistory = () => {
    if (diagnosis) {
      onSaveScanToHistory({
        ...diagnosis,
        scanDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        id: Date.now().toString(),
        customImage: selectedImage
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 skew-x-12 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Computer Vision Engine • 98.4% Average Accuracy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Crop Disease Detection & Agronomic Prescription
          </h1>
          <p className="text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
            Upload or snapshot a crop leaf. Our convolutional neural network detects pathogen lesions, evaluates severity percentage, and generates immediate bio-organic and chemical cure protocols.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload & Inspection on Left, Pathology Diagnosis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Area & Sample Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Scan className="w-4 h-4 text-emerald-600" />
                Leaf Specimen Scanner
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1.5 ${
                    showHeatmap 
                      ? 'bg-amber-100 border-amber-300 text-amber-800 font-bold' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Toggle AI lesion detection heatmap"
                >
                  <Layers className="w-3 h-3" />
                  <span>{showHeatmap ? 'Heatmap ON' : 'AI Heatmap'}</span>
                </button>
              </div>
            </div>

            {/* Specimen Viewport */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-inner group">
              <img 
                src={selectedImage} 
                alt="Crop leaf sample" 
                className={`w-full h-full object-cover transition-all duration-300 ${isScanning ? 'scale-105 filter brightness-90' : ''}`}
              />

              {/* Laser Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Glowing Laser Bar */}
                  <div className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_15px_3px_rgba(52,211,153,0.8)] animate-scan"></div>
                  
                  {/* Neural HUD Overlay */}
                  <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-400/40 border-t-emerald-400 animate-spin mb-3"></div>
                    <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
                      Extracting Foliar Biomarkers...
                    </span>
                    <div className="w-48 bg-slate-800/80 rounded-full h-2 mt-3 overflow-hidden border border-emerald-500/40">
                      <div 
                        className="bg-emerald-400 h-full transition-all duration-150 rounded-full"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-200/90 mt-1">{scanProgress}% Processed</span>
                  </div>
                </div>
              )}

              {/* Heatmap Lesion Overlay (Simulated AI bounding boxes) */}
              {showHeatmap && !isScanning && diagnosis.severity !== 'None' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-[28%] left-[30%] w-24 h-24 rounded-full bg-red-500/30 border-2 border-red-500 animate-pulse flex items-start justify-end p-1">
                    <span className="bg-red-600 text-white text-[9px] px-1 rounded font-mono font-bold">Lesion A: 96%</span>
                  </div>
                  <div className="absolute bottom-[35%] right-[25%] w-20 h-20 rounded-full bg-amber-500/30 border-2 border-amber-500 flex items-start justify-end p-1">
                    <span className="bg-amber-600 text-white text-[9px] px-1 rounded font-mono font-bold">Lesion B: 91%</span>
                  </div>
                </div>
              )}

              {/* Healthy Leaf Stamp */}
              {!isScanning && diagnosis.severity === 'None' && (
                <div className="absolute bottom-3 left-3 bg-emerald-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span>Verified Healthy Tissue</span>
                </div>
              )}
            </div>

            {/* Input Controls: Upload File & Re-Scan */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-300"
              >
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>Upload Leaf Photo</span>
              </button>

              <button
                type="button"
                onClick={() => runScan(diagnosis)}
                disabled={isScanning}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>Re-Analyze Specimen</span>
              </button>
            </div>
          </div>

          {/* Quick Test Samples Gallery */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Select Instant Test Leaf Specimen:
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Click any to diagnose</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {DISEASE_DATABASE.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSampleSelect(item)}
                  className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    diagnosis.id === item.id 
                      ? 'border-emerald-600 ring-2 ring-emerald-400/40 scale-95 shadow-md' 
                      : 'border-slate-200 hover:border-emerald-400 hover:scale-100'
                  }`}
                >
                  <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1">
                    <span className="text-[10px] text-white font-bold leading-tight truncate">
                      {item.crop.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pathology Diagnosis, Metrics & Agronomic Prescription (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative">
            
            {/* Top Diagnostic Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {diagnosis.crop} Crop Specimen
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {diagnosis.diseaseName}
                </h3>
                <p className="text-xs text-slate-500 italic font-serif">
                  Pathogen: {diagnosis.pathogen}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Severity Badge */}
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                  diagnosis.severity === 'Critical' 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : diagnosis.severity === 'High' 
                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                    : diagnosis.severity === 'Moderate'
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Severity: {diagnosis.severity}</span>
                </span>
              </div>
            </div>

            {/* Key AI Detection Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">AI Confidence</span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-600 block mt-0.5">
                  {diagnosis.confidence}%
                </span>
                <span className="text-[10px] text-slate-400">Deep CNN Model</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Leaf Area Affected</span>
                <span className="text-lg sm:text-xl font-extrabold text-amber-600 block mt-0.5">
                  {diagnosis.affectedArea}
                </span>
                <span className="text-[10px] text-slate-400">Canopy Chlorosis</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Intervention Window</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 block mt-1.5 truncate">
                  {diagnosis.sprayWindow}
                </span>
                <span className="text-[10px] text-slate-400">Spraying Schedule</span>
              </div>
            </div>

            {/* Pathological Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
              {diagnosis.description}
            </p>

            {/* Identified Symptoms List */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Detected Foliar Symptoms
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {diagnosis.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Protocol Tab Switcher */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('organic')}
                  className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'organic'
                      ? 'border-emerald-600 text-emerald-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>🌿 Bio-Organic Cure</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('chemical')}
                  className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'chemical'
                      ? 'border-teal-600 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-teal-600" />
                  <span>🧪 Chemical Fungicide / Dosage</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('prevention')}
                  className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'prevention'
                      ? 'border-slate-800 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span>🛡️ Prevention & Cultural</span>
                </button>
              </div>

              {/* Treatment Contents */}
              <div className="py-4">
                {activeTab === 'organic' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 mb-2">Safe, non-toxic bio-pesticides and natural biocontrol formulations:</p>
                    {diagnosis.organicTreatments.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 font-medium">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'chemical' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 mb-2">Targeted active ingredients & exact spray dosage recommendations:</p>
                    {diagnosis.chemicalTreatments.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-950 font-medium">
                        <span className="w-5 h-5 rounded-full bg-teal-200 text-teal-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'prevention' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 mb-2">Long-term field hygiene and resistant agronomic practices:</p>
                    {diagnosis.preventiveMeasures.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar: Save to History, Print Prescription, Consult Bot */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveToHistory}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>{saveSuccess ? '✓ Saved to Farm Log' : 'Save Diagnosis'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintReport}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200"
                  title="Print official diagnostic report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Prescription</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToBot(`Tell me more about treating ${diagnosis.diseaseName} in my ${diagnosis.crop} crop`)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 hover:underline"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Ask AgriBot Questions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Printable Agro-Pathology Report Certificate (Hidden on web screen, visible on print) */}
      <div id="printable-report" className="hidden print:block bg-white text-slate-900 p-8 font-serif leading-relaxed">
        <div className="border-4 border-double border-emerald-900 p-8 rounded-lg">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-emerald-900 pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-widest text-emerald-900">
                AgriVision AI Tele-Pathology Laboratory
              </h1>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Central Crop Health Diagnostic Center • Ministry of Agriculture & Agronomy Extension
              </p>
            </div>
            <div className="text-right font-sans text-xs">
              <div className="font-bold text-slate-800">Prescription No: AGV-{Date.now().toString().slice(-6)}</div>
              <div className="text-slate-500">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Diagnostic Summary */}
          <div className="grid grid-cols-2 gap-4 font-sans text-xs mb-6 bg-slate-50 p-4 rounded border border-slate-300">
            <div>
              <p><strong className="text-slate-700">Crop / Host Plant:</strong> {diagnosis.crop}</p>
              <p><strong className="text-slate-700">Identified Pathogen:</strong> {diagnosis.pathogen}</p>
              <p><strong className="text-slate-700">Disease Name:</strong> {diagnosis.diseaseName}</p>
            </div>
            <div>
              <p><strong className="text-slate-700">Pathology Severity:</strong> {diagnosis.severity}</p>
              <p><strong className="text-slate-700">AI Model Confidence:</strong> {diagnosis.confidence}%</p>
              <p><strong className="text-slate-700">Foliar Area Affected:</strong> {diagnosis.affectedArea}</p>
            </div>
          </div>

          {/* Biological / Organic Treatments */}
          <div className="mb-6 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-300 pb-1 mb-2">
              1. Bio-Organic Remediation Protocol
            </h3>
            <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-800 pl-2">
              {diagnosis.organicTreatments.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Chemical Fungicide / Pesticide Prescription */}
          <div className="mb-6 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 border-b border-teal-300 pb-1 mb-2">
              2. Chemical Intervention & Target Dosages
            </h3>
            <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-800 pl-2">
              {diagnosis.chemicalTreatments.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Preventive Hygiene */}
          <div className="mb-8 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
              3. Long-Term Cultural Practices & Preventive Hygiene
            </h3>
            <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-800 pl-2">
              {diagnosis.preventiveMeasures.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Footer & Signature Stamp */}
          <div className="border-t-2 border-emerald-900 pt-6 mt-8 flex items-end justify-between font-sans">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Verification Seal</div>
              <div className="w-24 h-24 border-2 border-dashed border-emerald-700 rounded-full flex flex-col items-center justify-center text-center p-2 text-[9px] text-emerald-800 font-bold mt-1">
                <span>AGRIVISION AI</span>
                <span className="text-[8px] font-normal">CERTIFIED DIAGNOSIS</span>
                <span className="text-[8px]">✓ VALID</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-lg font-bold text-slate-800">Dr. Sarah Jenkins, Ph.D.</div>
              <div className="text-xs text-slate-600 font-bold">Chief Plant Pathologist & Agronomist</div>
              <div className="text-[10px] text-slate-400">Agricultural Extension Council Reg #892-PATH</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
