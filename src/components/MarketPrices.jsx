import React, { useState } from 'react';
import { MARKET_PRICES } from '../data/marketData';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function MarketPrices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredPrices = MARKET_PRICES.filter((item) => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.mandi.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'sell') return matchesSearch && item.aiSignal.includes('SELL');
    if (selectedFilter === 'hold') return matchesSearch && item.aiSignal.includes('HOLD');
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
            <span>APMC Mandi Intelligence & Wholesale Price Forecaster</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Live AgriMarket Prices & AI Selling Signals
          </h1>
          <p className="text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
            Monitor real-time mandi wholesale prices, arrival trends, and algorithmic market signals to make data-driven decisions on when to sell your harvest or hold in cold storage.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search commodity or mandi..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* AI Signal Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Commodities' },
            { id: 'sell', label: '🟢 Sell Recommended' },
            { id: 'hold', label: '🟡 Hold for Higher Rates' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrices.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Commodity + AI Signal Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{item.commodity}</h3>
                  <span className="text-xs text-slate-500">{item.variety}</span>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 border shrink-0 ${
                  item.aiSignal.includes('SELL')
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : item.aiSignal.includes('HOLD')
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>AI: {item.aiSignal}</span>
                </span>
              </div>

              {/* Mandi Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item.mandi}</span>
              </div>

              {/* Modal Price & Fluctuation */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Modal Mandi Price</span>
                    <span className="text-2xl font-black text-slate-900">₹{item.modalPrice.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-1">/ Quintal</span>
                  </div>

                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                    item.trend === 'up' ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {item.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{item.changePercent}</span>
                  </div>
                </div>

                {/* Min / Max Range Meter */}
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-between text-[11px] text-slate-500">
                  <span>Min: ₹{item.minPrice}</span>
                  <span className="font-semibold text-slate-700">Volume: {item.volume}</span>
                  <span>Max: ₹{item.maxPrice}</span>
                </div>
              </div>

              {/* AI Strategic Reasoning */}
              <p className="text-xs text-slate-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/70 leading-relaxed">
                <span className="font-bold text-emerald-800">Market Insight: </span>
                {item.signalReason}
              </p>
            </div>

            {/* Footer timestamp */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.lastUpdated}
              </span>
              <span className="font-medium text-emerald-600 hover:underline cursor-pointer">
                View Mandi Chart →
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
