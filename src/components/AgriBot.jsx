import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw, 
  User, 
  Check, 
  Copy, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Namaste & Welcome! 🌿 I am **AgriBot**, your AI Agronomist and smart farming companion.\n\nI can assist you with:\n- **Crop disease diagnosis & treatment** (organic & chemical)\n- **Fertilizer dosages** (Urea, DAP, Potash, Micronutrients)\n- **Soil health & pH correction**\n- **Pest management & bio-controls**\n\nHow can I help your farm today?",
    time: "Just now"
  }
];

const PREDEFINED_QA = [
  {
    keywords: ["late blight", "tomato", "potato", "phytophthora"],
    response: "🍅 **Late Blight Management Protocol:**\n\n**1. Immediate Biological Action:**\n- Spray *Bacillus subtilis* or copper hydroxide (Bordeaux mixture 1%) thoroughly under leaf surfaces.\n- Clip and burn heavily blighted lower leaves immediately to stop airborne sporulation.\n\n**2. Chemical Prescription (if > 10% canopy affected):**\n- **Metalaxyl 8% + Mancozeb 64% WP** (Ridomil Gold) @ 2.5 g per liter of water.\n- Alternatively, spray **Cymoxanil + Mancozeb** @ 2.0 g/L.\n\n**3. Agronomic Prevention:**\n- Transition from sprinkler to drip irrigation to prevent foliar wetness.\n- Ensure 60cm row spacing for good air circulation."
  },
  {
    keywords: ["wheat", "fertilizer", "urea", "dap", "npk"],
    response: "🌾 **Scientific Fertilizer Schedule for High-Yield Wheat (Per Acre):**\n\n- **Total Requirement:** ~2.5 Bags Urea (45kg), ~1 Bag DAP (50kg), ~0.5 Bag MOP (Potash).\n\n**Application Stages:**\n1. **Basal Dose (At Sowing):** Apply 100% of DAP (50kg) + 100% of MOP (25kg) + 1/3rd of Urea (35kg).\n2. **First Top Dressing (CRI Stage, 21-25 days):** Apply 1/3rd Urea (35kg) just before first irrigation.\n3. **Second Top Dressing (Jointing Stage, 45-50 days):** Apply remaining 1/3rd Urea (35kg) along with a Zinc sulfate (21%) foliar spray."
  },
  {
    keywords: ["yellow", "yellowing", "leaves", "nitrogen", "iron", "chlorosis"],
    response: "🍃 **Diagnosing Yellowing Leaves (Chlorosis):**\n\n- **Older/Lower Leaves Yellow First:** Nitrogen (N) deficiency. *Remedy: Top-dress with Urea or spray 2% foliar Urea solution.*\n- **Young/New Top Leaves Yellow First with Green Veins:** Iron (Fe) or Zinc (Zn) deficiency. *Remedy: Spray Ferrous Sulphate (0.5%) + Citric acid or Chelated Zinc (1 g/L).*\n- **Yellowing between leaf veins with purple edges:** Magnesium (Mg) or Phosphorus deficiency. *Remedy: Spray Magnesium Sulphate (10 g/L).*\n- **Waterlogged Roots:** If field has poor drainage, root suffocation causes uniform pale yellowing. Aerate soil and drain excess standing water."
  },
  {
    keywords: ["cotton", "whitefly", "curl", "neem"],
    response: "🌱 **Cotton Whitefly & Leaf Curl Integrated Management:**\n\n**1. Mechanical & Bio Control:**\n- Erect yellow sticky traps (15-20 traps/acre) slightly above crop canopy.\n- Spray 5% Neem Seed Kernel Extract (NSKE) or Cold-Pressed Neem Oil (3000 ppm) @ 5 ml/liter of water.\n\n**2. Chemical Vector Suppression:**\n- **Diafenthiuron 50% WP** @ 1.2 g/L or **Flonicamid 50% WG** @ 0.4 g/L.\n- Always spray early morning or late evening targeting undersides of leaves where nymphs colony."
  },
  {
    keywords: ["organic", "pesticide", "neem", "cow", "dung", "panchagavya"],
    response: "🌿 **Homemade Bio-Pesticides & Tonics:**\n\n**1. Neem Leaf / Seed Decoction:**\n- Boil 5 kg crushed neem leaves in 10L water for 30 minutes. Dilute 1 liter in 15 liters of water. Excellent against caterpillars and aphids.\n\n**2. Agniastra (Natural Broad-Spectrum Insecticide):**\n- 10L cow urine + 2 kg crushed neem leaves + 500g hot green chillies + 500g garlic + 250g tobacco leaves. Ferment for 48 hours and strain. Use 250ml per 15L spray tank.\n\n**3. Fermented Buttermilk (Chhachh) Spray:**\n- Sour buttermilk diluted with water (1:10) is a potent organic fungicide against powdery mildew and rust."
  }
];

export default function AgriBot({ initialQuery }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState(initialQuery || '');
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakText = (text) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Strip markdown characters for natural voice reading
    const cleanText = text.replace(/[*_#`[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (queryText = null) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching knowledge
      const lower = textToSend.toLowerCase();
      const match = PREDEFINED_QA.find(qa => qa.keywords.some(k => lower.includes(k)));
      
      let botResponse = "";
      if (match) {
        botResponse = match.response;
      } else {
        botResponse = `🌾 **Agronomic Recommendation for: "${textToSend}"**\n\nBased on your query, here are the key field practices to observe:\n\n1. **Soil & Moisture Check:** Verify rhizosphere moisture at 4-6 inches depth before applying additional inputs.\n2. **Pathogen / Nutrient Triangulation:** Ensure leaf symptoms aren't confused with micronutrient deficiencies (e.g. Zinc, Iron).\n3. **Application Window:** Best results occur when foliar sprays are conducted between 7:00 AM - 10:00 AM or after 4:30 PM under calm wind conditions (< 8 km/h).\n\nFeel free to upload a leaf photograph in the **AI Disease Scanner** tab for full microscopic lesion analysis!`;
      }

      const botMsg = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(botResponse);
    }, 700);
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const samplePrompts = [
    "How to treat Tomato Late Blight organically?",
    "What is the best NPK fertilizer dose for Wheat?",
    "Why are my crop leaves turning yellow?",
    "How to manage Whitefly in Cotton with neem?",
    "How to prepare homemade organic bio-pesticides?"
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[750px]">
      
      {/* Bot Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Bot className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold">AgriBot Assistant</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-emerald-200">AI Agronomist & Farm Advisory</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Toggle */}
          <button
            type="button"
            onClick={() => {
              if (speechEnabled) window.speechSynthesis?.cancel();
              setSpeechEnabled(!speechEnabled);
            }}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              speechEnabled 
                ? 'bg-amber-400 text-slate-900 shadow-md font-bold' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="Read answers aloud"
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{speechEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Bar */}
      <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 py-2.5 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
        <span className="font-bold text-emerald-900 shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Suggested:
        </span>
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-100 text-emerald-950 font-medium border border-emerald-200 transition-colors shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-teal-700 text-white shadow-sm'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm relative group ${
              msg.sender === 'user'
                ? 'bg-emerald-600 text-white rounded-tr-none'
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-line leading-relaxed">
                {msg.text}
              </div>

              <div className={`flex items-center justify-between mt-2 pt-1 border-t text-[10px] ${
                msg.sender === 'user' ? 'border-emerald-500/50 text-emerald-100' : 'border-slate-100 text-slate-400'
              }`}>
                <span>{msg.time}</span>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-emerald-700"
                    title="Copy Answer"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AgriBot any crop disease, fertilizer dosage, or pest query..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
