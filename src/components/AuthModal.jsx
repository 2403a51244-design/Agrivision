import React, { useState } from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { X, Lock, Mail, User, Sprout, MapPin, CheckCircle, ArrowRight, ShieldCheck, Sparkles, Building } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithCredentials, loginAsDemo, registerUser } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  // Login state
  const [email, setEmail] = useState('farmer@agrivision.ai');
  const [password, setPassword] = useState('farmer123');
  const [error, setError] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFarmName, setRegFarmName] = useState('');
  const [regFarmSize, setRegFarmSize] = useState('10 Acres');
  const [regRole, setRegRole] = useState('farmer');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = loginWithCredentials(email, password);
    if (res.success) {
      setIsAuthModalOpen(false);
    } else {
      setError(res.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!regName || !regEmail || !regPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    const res = registerUser({
      name: regName,
      email: regEmail,
      password: regPassword,
      farmName: regFarmName || 'Family Agro Estate',
      farmSize: regFarmSize,
      role: regRole,
      crops: ['Wheat', 'Tomato'],
      location: 'Regional Farm Sector'
    });
    if (res.success) {
      setIsAuthModalOpen(false);
    }
  };

  const quickFill = (accountKey) => {
    const acc = DEMO_ACCOUNTS[accountKey];
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 pb-7">
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">AgriVision AI Authentication</h2>
              <p className="text-xs text-emerald-200 font-medium">Smart Farming & Crop Disease Intelligence</p>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-4 bg-emerald-950/40 rounded-xl p-3 border border-emerald-500/30">
            <div className="flex items-center justify-between text-xs text-emerald-200 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Instant 1-Click Demo Profiles:
              </span>
              <span className="text-[11px] opacity-75">No typing needed</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { loginAsDemo('farmer'); setIsAuthModalOpen(false); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 border border-emerald-400/30 text-left transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  👨‍🌾
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-100 truncate">Ramesh Patel</div>
                  <div className="text-[10px] text-emerald-200 truncate">Farmer (14.5 Acres)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { loginAsDemo('expert'); setIsAuthModalOpen(false); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-teal-700/60 hover:bg-teal-600 border border-teal-400/30 text-left transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  🔬
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white group-hover:text-teal-100 truncate">Dr. S. Jenkins</div>
                  <div className="text-[10px] text-teal-200 truncate">Plant Pathologist</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
              mode === 'login' 
                ? 'border-emerald-600 text-emerald-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In with Credentials
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
              mode === 'register' 
                ? 'border-emerald-600 text-emerald-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Farm Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span className="font-bold">Notice:</span> {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Demo Credentials Info helper */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                <div className="font-semibold mb-1 flex items-center gap-1.5 text-amber-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600" /> Pre-Configured Test Credentials:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] mt-1.5">
                  <div 
                    onClick={() => quickFill('farmer')} 
                    className="p-1.5 bg-white rounded border border-amber-200 hover:border-emerald-500 cursor-pointer transition-all hover:shadow-sm"
                  >
                    <span className="font-bold text-emerald-800 block">🌾 Farmer Login</span>
                    <span className="text-slate-600 block">farmer@agrivision.ai</span>
                    <span className="text-slate-400 block font-mono">farmer123</span>
                  </div>
                  <div 
                    onClick={() => quickFill('expert')} 
                    className="p-1.5 bg-white rounded border border-amber-200 hover:border-teal-500 cursor-pointer transition-all hover:shadow-sm"
                  >
                    <span className="font-bold text-teal-800 block">🔬 Expert Login</span>
                    <span className="text-slate-600 block">expert@agrivision.ai</span>
                    <span className="text-slate-400 block font-mono">expert123</span>
                  </div>
                </div>
                <p className="text-[10px] text-amber-700 mt-1 italic">Click either box above to auto-fill the credentials.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. farmer@agrivision.ai"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                Sign In to AgriVision <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Gurpreet Singh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="gurpreet@myfarm.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Farm / Enterprise Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={regFarmName}
                      onChange={(e) => setRegFarmName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. Golden Harvest Farms"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Farm Size</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={regFarmSize}
                      onChange={(e) => setRegFarmSize(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. 15 Acres"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">User Role</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="farmer">Crop Farmer / Landholder</option>
                  <option value="agronomist">Agronomist / Plant Pathologist</option>
                  <option value="consultant">Agricultural Field Officer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-3"
              >
                Register & Start Farming Smart <CheckCircle className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          AgriVision System v2.4 • End-to-End Encrypted Agricultural Data
        </div>
      </div>
    </div>
  );
}
