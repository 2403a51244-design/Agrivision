import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sprout, 
  User, 
  LogOut, 
  LogIn, 
  Globe, 
  ChevronDown, 
  CloudSun, 
  ShieldCheck, 
  Sparkles,
  Camera,
  ExternalLink,
  SlidersHorizontal,
  LayoutDashboard,
  Scan,
  Calculator,
  Plane,
  Bot,
  TrendingUp,
  FileText,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ onOpenScanner, activeTab, setActiveTab }) {
  const { user, logout, setIsAuthModalOpen, loginAsDemo } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const NAV_ITEMS = [
    { id: 'dashboard', label: t('dashboard') || 'Dashboard', icon: LayoutDashboard },
    { id: 'detector', label: t('detector') || 'AI Disease Scanner', icon: Scan, badge: 'AI 98%' },
    { id: 'advisory', label: t('advisory') || 'Smart Advisory', icon: Calculator },
    { id: 'field-map', label: 'Drone Field Map', icon: Plane, badge: 'Live UAV' },
    { id: 'agribot', label: t('agribot') || 'AgriBot AI', icon: Bot },
    { id: 'mandi', label: t('mandi') || 'Mandi Prices', icon: TrendingUp },
    { id: 'history', label: t('history') || 'Diagnostics Log', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white">
              <Sprout className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">Agri<span className="text-emerald-600">Vision</span></span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  AI v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Smart Crop Pathology & Farm Advisory</p>
            </div>
          </div>

          {/* Quick Stats / Microclimate Widget (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-4 py-1.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>26°C Sunny • 58% Humidity</span>
            </div>
            <div className="w-px h-3.5 bg-slate-300"></div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Spraying Window: Favorable</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Scanner Action Button */}
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all group"
            >
              <Camera className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Scan Crop Leaf</span>
              <span className="sm:hidden">Scan</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => { setLangDropdownOpen(!langDropdownOpen); setProfileDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase font-bold">{lang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors ${
                        lang === l.code ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile or Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setLangDropdownOpen(false); }}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-white transition-all group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-emerald-400/50"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-emerald-700 truncate max-w-[110px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fade-in">
                    
                    {/* User Card */}
                    <div className="flex items-center gap-3 p-2 bg-emerald-50/70 rounded-xl border border-emerald-100 mb-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{user.name}</h4>
                        <p className="text-[11px] text-emerald-800 font-medium truncate">{user.farmName || user.roleLabel}</p>
                        <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.5 bg-emerald-200/80 text-emerald-900 rounded font-semibold">
                          {user.badge || 'Verified'}
                        </span>
                      </div>
                    </div>

                    {/* Switch Demo Roles Quickly */}
                    <div className="border-t border-slate-100 pt-2 mb-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                        Switch Demo Role
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                        <button
                          onClick={() => { loginAsDemo('farmer'); setProfileDropdownOpen(false); }}
                          className={`text-[11px] p-1.5 rounded-lg border text-left flex items-center gap-1.5 ${
                            user.role === 'farmer' ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold' : 'hover:bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span>👨‍🌾</span> Farmer
                        </button>
                        <button
                          onClick={() => { loginAsDemo('expert'); setProfileDropdownOpen(false); }}
                          className={`text-[11px] p-1.5 rounded-lg border text-left flex items-center gap-1.5 ${
                            user.role === 'agronomist' ? 'bg-teal-100/70 border-teal-400 text-teal-900 font-bold' : 'hover:bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span>🔬</span> Expert
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-slate-100 pt-2 flex flex-col gap-1">
                      <button
                        onClick={() => { setIsAuthModalOpen(true); setProfileDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-left transition-colors"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                        <span>Manage Profile & Fields</span>
                      </button>
                      <button
                        onClick={() => { logout(); setProfileDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg text-left transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Secondary Desktop Navigation Strip */}
      <div className="hidden md:block bg-slate-50/90 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-fade-in shadow-lg">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

    </header>
  );
}
