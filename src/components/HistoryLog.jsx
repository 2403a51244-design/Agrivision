import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Eye, 
  Trash2, 
  ArrowUpDown,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function HistoryLog({ scanHistory, onSelectScan, onClearHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');

  const crops = Array.from(new Set(scanHistory.map(item => item.crop)));

  const filteredHistory = scanHistory.filter(item => {
    const matchesSearch = item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.pathogen?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || item.severity.toLowerCase() === severityFilter.toLowerCase();
    const matchesCrop = cropFilter === 'all' || item.crop === cropFilter;

    return matchesSearch && matchesSeverity && matchesCrop;
  });

  const exportCSV = () => {
    const headers = ["ID", "Crop", "Disease", "Pathogen", "Severity", "Confidence", "Date", "Intervention Window"];
    const rows = filteredHistory.map(h => [
      h.id,
      `"${h.crop}"`,
      `"${h.diseaseName}"`,
      `"${h.pathogen || 'N/A'}"`,
      h.severity,
      `${h.confidence}%`,
      `"${h.scanDate || 'Recent'}"`,
      `"${h.sprayWindow || 'Standard'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `agrivision-diagnostics-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>Farm Pathology Archives & Agronomic Auditing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Crop Diagnostics & Treatment History
          </h1>
          <p className="text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
            Keep track of all foliar disease scans, infection trends, treatment interventions, and recurring pathogen hot-spots across your harvest seasons.
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Export */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop, pathogen or disease..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Crop Filter */}
          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Crops ({crops.length})</option>
            {crops.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="none">Healthy</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* History Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No matching diagnostic records found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search criteria or scan new leaf samples in the AI Disease Scanner tab.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Specimen</th>
                  <th className="py-3 px-4">Crop & Variety</th>
                  <th className="py-3 px-4">Diagnosis & Pathogen</th>
                  <th className="py-3 px-4">Severity & Risk</th>
                  <th className="py-3 px-4 text-center">AI Confidence</th>
                  <th className="py-3 px-4">Scan Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <img
                        src={item.customImage || item.imageUrl}
                        alt={item.crop}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                    </td>

                    {/* Crop */}
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {item.crop}
                    </td>

                    {/* Disease */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 text-sm">{item.diseaseName}</div>
                      <div className="text-[11px] text-slate-500 italic font-serif">{item.pathogen}</div>
                    </td>

                    {/* Severity */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        item.severity === 'Critical'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : item.severity === 'High'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : item.severity === 'Moderate'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {item.severity === 'None' ? (
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        <span>{item.severity === 'None' ? 'Healthy Tissue' : item.severity}</span>
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                      {item.confidence}%
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.scanDate || 'Recent'}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectScan(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg transition-colors border border-emerald-200 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
