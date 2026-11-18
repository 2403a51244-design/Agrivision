import React, { createContext, useContext, useState } from 'react';

const TRANSLATIONS = {
  en: {
    brandName: "AgriVision AI",
    tagline: "AI-Powered Crop Disease Diagnostics & Smart Agronomy",
    dashboard: "Dashboard",
    detector: "AI Disease Scanner",
    advisory: "Smart Farm Advisory",
    agribot: "AgriBot AI Assistant",
    mandi: "Market Mandi Rates",
    history: "Farm Diagnostics Log",
    login: "Sign In",
    logout: "Log Out",
    welcome: "Welcome back",
    scanNow: "Diagnose Leaf Now",
    quickDemo: "1-Click Demo",
    weatherAlert: "Agro-Meteorological Advisory",
    healthyNotice: "Field Status: High Vigilance Required for Humidity Risks",
    scanLeafTitle: "Upload or Capture Crop Leaf Image",
    dropZoneText: "Drag & drop leaf photo here, or browse files",
    analyzingText: "Running Deep CNN Vision Pathology Model...",
    confidenceLabel: "Confidence Score",
    severityLabel: "Severity Level",
    remedyOrganic: "Bio-Organic Treatment",
    remedyChemical: "Chemical Fungicide / Pesticide",
    prevention: "Long-term Preventive Protocol",
    downloadReport: "Download Prescription Report",
    calculateFertilizer: "Calculate Balanced NPK Doses",
    askAgribot: "Ask AgriBot any crop or farming query..."
  },
  hi: {
    brandName: "एग्रीविज़न AI",
    tagline: "एआई-आधारित फसल रोग पहचान एवं स्मार्ट कृषि सहायक",
    dashboard: "डैशबोर्ड",
    detector: "एआई रोग स्कैनर",
    advisory: "स्मार्ट कृषि सलाह",
    agribot: "एग्रीबॉट सहायक",
    mandi: "मंडी भाव एवं रुझान",
    history: "रोग इतिहास रिकॉर्ड",
    login: "लॉग इन करें",
    logout: "लॉग आउट",
    welcome: "स्वागत है",
    scanNow: "पत्ती की तुरंत जांच करें",
    quickDemo: "डेमो लॉगिन",
    weatherAlert: "कृषि मौसम सलाह",
    healthyNotice: "खेत की स्थिति: उच्च आर्द्रता के कारण फंगल जोखिम",
    scanLeafTitle: "फसल की पत्ती का फोटो अपलोड करें",
    dropZoneText: "पत्ती की तस्वीर यहाँ खींचें या फाइल चुनें",
    analyzingText: "गहन एआई मॉडल द्वारा पत्ती का विश्लेषण जारी है...",
    confidenceLabel: "सटीकता दर",
    severityLabel: "गंभीरता का स्तर",
    remedyOrganic: "जैविक / देशी उपचार",
    remedyChemical: "रासायनिक कवकनाशी / कीटनाशक",
    prevention: "दीर्घकालिक बचाव के उपाय",
    downloadReport: "नुस्खा रिपोर्ट डाउनलोड करें",
    calculateFertilizer: "संतुलित एनपीके खाद की गणना करें",
    askAgribot: "एग्रीबॉट से फसल व खेती का कोई भी प्रश्न पूछें..."
  },
  es: {
    brandName: "AgriVision AI",
    tagline: "Diagnóstico de Enfermedades de Cultivos por IA y Asesoría Agronómica",
    dashboard: "Panel de Control",
    detector: "Escáner de Patología IA",
    advisory: "Asesoría Agrícola Inteligente",
    agribot: "Asistente AgriBot",
    mandi: "Precios de Mercado",
    history: "Historial de Diagnósticos",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    welcome: "Bienvenido",
    scanNow: "Diagnosticar Hoja",
    quickDemo: "Demo Rápido",
    weatherAlert: "Aviso Agrometeorológico",
    healthyNotice: "Estado del Campo: Alerta por Humedad",
    scanLeafTitle: "Sube o Captura una Foto de la Hoja",
    dropZoneText: "Arrastra y suelta la foto aquí, o busca en archivos",
    analyzingText: "Ejecutando modelo de visión patológica profunda...",
    confidenceLabel: "Nivel de Confianza",
    severityLabel: "Gravedad de la Infección",
    remedyOrganic: "Tratamiento Bio-Orgánico",
    remedyChemical: "Tratamiento Químico / Fungicida",
    prevention: "Protocolo de Prevención",
    downloadReport: "Descargar Receta Agronómica",
    calculateFertilizer: "Calcular Dosis de Fertilizante NPK",
    askAgribot: "Hazle cualquier pregunta agrícola a AgriBot..."
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
