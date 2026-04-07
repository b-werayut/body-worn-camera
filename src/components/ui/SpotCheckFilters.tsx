import { Search, Calendar, X } from 'lucide-react';
import type { SpotCheckTranslationData } from '../../locales/spotCheckTranslations';

export interface SpotCheckFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  selectedOfficer: string;
  setSelectedOfficer: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedReportType: string;
  setSelectedReportType: (value: string) => void;
  onReset: () => void;
  darkMode: boolean;
  translations: SpotCheckTranslationData; 
}

export function SpotCheckFilters({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedOfficer,
  setSelectedOfficer,
  selectedStatus,
  setSelectedStatus,
  selectedReportType,
  setSelectedReportType,
  onReset,
  translations,
  darkMode
}: SpotCheckFiltersProps) {
  return (
    <div className={`rounded-xl shadow-lg overflow-hidden p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        
        {/* ค้นหา */}
        <div className="lg:col-span-2">
          <label className={`text-xs font-medium block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {translations.search}
          </label>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input 
              type="text" 
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border px-10 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`} 
            />
          </div>
        </div>

        {/* วันที่เริ่มต้น */}
        <div>
          <label className={`text-xs font-medium block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Calendar className="w-3 h-3 inline mr-1" />
            {translations.startDate}
          </label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-full border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white scheme-dark' 
                : 'bg-white border-gray-300 text-gray-900'
            }`} 
          />
        </div>

        {/* วันที่สิ้นสุด */}
        <div>
          <label className={`text-xs font-medium block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Calendar className="w-3 h-3 inline mr-1" />
            {translations.endDate}
          </label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-full border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white scheme-dark' 
                : 'bg-white border-gray-300 text-gray-900'
            }`} 
          />
        </div>

        {/* เจ้าหน้าที่ */}
        <div>
          <label className={`text-xs font-medium block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {translations.filterOfficer}
          </label>
          <select 
            value={selectedOfficer}
            onChange={(e) => setSelectedOfficer(e.target.value)}
            className={`w-full border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.allOfficers}</option>
            <option value="A" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>เจ้าหน้าที่ A</option>
            <option value="B" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>เจ้าหน้าที่ B</option>
            <option value="C" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>เจ้าหน้าที่ C</option>
            <option value="D" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>เจ้าหน้าที่ D</option>
          </select>
        </div>

        {/* สถานะ */}
        <div>
          <label className={`text-xs font-medium block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {translations.filterStatus}
          </label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`w-full border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.allStatus}</option>
            <option value="waiting" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.statusWaiting}</option>
            <option value="accepted" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.statusAccepted}</option>
            <option value="in-progress" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.statusInProgress}</option>
            <option value="completed" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.statusCompleted}</option>
            <option value="cancelled" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.statusCancelled}</option>
          </select>
        </div>

        {/* ประเภทรายงาน */}
        <div>
          <label className={`text-xs font-medium block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {translations.filterReportType}
          </label>
          <select 
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className={`w-full border px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.allReportTypes}</option>
            <option value="daily" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.reportTypeDaily}</option>
            <option value="incident" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.reportTypeIncident}</option>
            <option value="inspection" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.reportTypeInspection}</option>
            <option value="training" className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>{translations.reportTypeTraining}</option>
          </select>
        </div>

        {/* ปุ่มรีเซ็ต */}
        <div className="flex items-end">
          <button 
            onClick={onReset}
            className={`w-full px-6 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            <X className="w-5 h-5" />
            <span>{translations.reset}</span>
          </button>
        </div>

      </div>
    </div>
  );
}