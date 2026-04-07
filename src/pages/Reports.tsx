import { useState, useMemo } from 'react';
import { Calendar, ChevronDown, Search, FileText, Download, Eye, Filter, X, ChevronLeft, ChevronRight, Trash2, MoreVertical } from 'lucide-react';
import { initialReportData } from '../data/reportMockData';
import { ReportDetailModal, DeleteReportModal } from '../components/modals/ReportDetailModal';
import { reportTranslations, type ReportLanguage } from '../locales/reportTranslations';

export interface ReportSqlData {
  id: string;         
  missionId: string | null; 
  missionName: string | null;
  officerId: string;
  officerName: string;
  startTime: string;
  endTime: string;
  duration: string;
  videoUrl?: string;
  location?: string;
}

interface ReportsProps {
  darkMode: boolean;
  language: ReportLanguage; 
}

export function Reports({ darkMode, language = 'th' }: ReportsProps) {
  const t = reportTranslations[language];

  const [reports, setReports] = useState<ReportSqlData[]>(initialReportData as unknown as ReportSqlData[]);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('all');
  const [missionQuery, setMissionQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modals & Dropdowns
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportSqlData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const uniqueOfficers = useMemo(() => {
    const officersMap = new Map();
    reports.forEach(report => {
      if (!officersMap.has(report.officerId)) {
        officersMap.set(report.officerId, report.officerName);
      }
    });
    return Array.from(officersMap.entries()).map(([id, name]) => ({ id, name }));
  }, [reports]);

  // --- Filtering ---
  const filteredData = reports.filter((report) => {
    const matchesOfficer = selectedOfficer === 'all' || report.officerId === selectedOfficer;
    
    const safeMissionName = report.missionName || '';
    const safeMissionId = report.missionId || '';
    
    const matchesMission = safeMissionName.toLowerCase().includes(missionQuery.toLowerCase()) || 
                           safeMissionId.toLowerCase().includes(missionQuery.toLowerCase());
    
    // Date Logic
    const reportDate = new Date(report.startTime);
    let matchesDate = true;
    if (startDate && endDate && !isNaN(reportDate.getTime())) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = reportDate >= start && reportDate <= end;
    } 
    return matchesOfficer && matchesMission && matchesDate;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // --- Handlers ---
  const handlePageChange = (page: number) => setCurrentPage(page);
  
  const handleReset = () => {
    setStartDate(''); 
    setEndDate(''); 
    setSelectedOfficer('all'); 
    setMissionQuery(''); 
    setCurrentPage(1);
  };

  const handleExportPDF = (reportId: string) => console.log('Export PDF:', reportId);
  const handleExportExcel = (reportId: string) => console.log('Export Excel:', reportId);

  const handleViewDetails = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setShowModal(true);
    }
  };

  const handleDeleteReport = (reportId: string) => {
    setReportToDelete(reportId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteReport = () => {
    if (reportToDelete) {
      setReports(prev => prev.filter(r => r.id !== reportToDelete));
      setReportToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>{t.listTitle}</h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.showingAll} {filteredData.length} {t.itemsTotal}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.startDate}</label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all`} />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.endDate}</label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all`} />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.filterOfficer}</label>
            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <select value={selectedOfficer} onChange={(e) => setSelectedOfficer(e.target.value)} className={`w-full pl-10 pr-10 py-2.5 rounded-lg border appearance-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all cursor-pointer`}>
                <option value="all">{t.allOfficers}</option>
                {uniqueOfficers.map((officer) => (
                  <option key={officer.id} value={officer.id}>
                    {officer.name} ({officer.id})
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.filterMission}</label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input type="text" value={missionQuery} onChange={(e) => setMissionQuery(e.target.value)} placeholder={t.missionPlaceholder} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all`} />
            </div>
          </div>
          <div className="flex gap-3 md:items-end">
            <button onClick={handleReset} className={`px-6 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>
              <X className="w-5 h-5" /> <span>{t.reset}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {filteredData.length === 0 ? (
          <div className={`p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <FileText className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.noData}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.noDataMessage}</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-blue-500 to-blue-600">
                    <th className="px-4 py-3 text-center text-sm font-semibold text-white border-r border-white/10 w-16">{t.tableNo}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{t.tableCode}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{t.tableDate}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{t.tableOfficer}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{t.tableMission}</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-white border-r border-white/10">ระยะเวลา (Duration)</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-white w-24">{t.tableActions}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((report, index) => (
                    <tr key={report.id} className={`border-b transition-all hover:bg-opacity-50 ${index % 2 === 0 ? darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-white hover:bg-gray-50' : darkMode ? 'bg-gray-700/10 hover:bg-gray-700/30' : 'bg-gray-50 hover:bg-gray-100'} ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <td className={`px-4 py-4 text-center border-r ${darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-600'}`}>{startIndex + index + 1}</td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold border-r ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        {report.missionId ? (
                          <span className={darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}>{report.missionId}</span>
                        ) : (
                          <span className="text-red-500">{t.na}</span>
                        )}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm border-r ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'}`}>
                        {report.startTime?.includes('T') ? new Date(report.startTime).toLocaleString(language === 'th' ? 'th-TH' : 'en-US') : report.startTime}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm border-r ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'}`}>{report.officerName}</td>
                      <td className={`px-4 py-4 text-sm border-r ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'}`}>
                        {report.missionName ? (
                          <span>{report.missionName}</span>
                        ) : (
                          <div className="flex flex-col items-start gap-1">
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200 whitespace-nowrap">
                              {t.unassigned}
                            </span>
                            <button className="text-xs text-blue-500 hover:underline cursor-pointer">
                              {t.assignActivity}
                            </button>
                          </div>
                        )}
                      </td>
                      
                      <td className={`px-4 py-4 text-center whitespace-nowrap text-sm border-r ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'}`}>{report.duration}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="relative inline-block">
                          <button onClick={() => setOpenDropdown(openDropdown === report.id ? null : report.id)} className={`p-2 rounded-lg transition-all hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`} title={t.moreActions}>
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          {openDropdown === report.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
                              <div className={`absolute right-0 w-48 rounded-xl shadow-2xl z-20 border overflow-hidden ${index >= currentData.length - 3 ? 'bottom-full mb-2' : 'mt-2'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                                <button onClick={() => { handleViewDetails(report.id); setOpenDropdown(null); }} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-all cursor-pointer ${darkMode ? 'hover:bg-blue-600 text-gray-200 hover:text-white' : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'}`}>
                                  <Eye className="w-4 h-4" />{t.viewDetails}
                                </button>
                                <button onClick={() => { handleExportPDF(report.id); setOpenDropdown(null); }} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-all border-t cursor-pointer ${darkMode ? 'hover:bg-red-600 text-gray-200 hover:text-white border-gray-700' : 'hover:bg-red-50 text-gray-700 hover:text-red-600 border-gray-100'}`}>
                                  <FileText className="w-4 h-4" />{t.exportPDF}
                                </button>
                                <button onClick={() => { handleExportExcel(report.id); setOpenDropdown(null); }} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-all border-t cursor-pointer ${darkMode ? 'hover:bg-[oklch(65%_0.24_149.579)] text-gray-200 hover:text-white border-gray-700' : 'hover:bg-[oklch(90%_0.1_149.579)] text-gray-700 hover:text-[oklch(45%_0.25_149.579)] border-gray-100'}`}>
                                  <Download className="w-4 h-4" />{t.exportExcel}
                                </button>
                                <button onClick={() => { handleDeleteReport(report.id); setOpenDropdown(null); }} className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-all border-t cursor-pointer ${darkMode ? 'hover:bg-red-600 text-gray-200 hover:text-white border-gray-700' : 'hover:bg-red-50 text-gray-700 hover:text-red-600 border-gray-100'}`}>
                                  <Trash2 className="w-4 h-4" />{t.delete}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((report) => (
                <div key={report.id} className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {report.missionId ? (
                          <span className={`text-sm font-bold ${darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}`}>{report.missionId}</span>
                        ) : (
                          <span className="text-sm font-bold text-red-500">{t.na}</span>
                        )}
                      </div>
                      
                      {report.missionName ? (
                        <div className={`text-sm mb-1 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{report.missionName}</div>
                      ) : (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md">{t.unassigned}</span>
                          <button className="text-xs text-blue-500 hover:underline cursor-pointer">{t.assignActivity}</button>
                        </div>
                      )}
                      
                      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.officerName}</div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {report.startTime?.includes('T') ? new Date(report.startTime).toLocaleString(language === 'th' ? 'th-TH' : 'en-US') : report.startTime} • {report.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleViewDetails(report.id)} className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"><Eye className="w-4 h-4" /><span className="text-xs">{t.viewDetails}</span></button>
                    <button onClick={() => handleExportPDF(report.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg cursor-pointer"><span className="text-xs">PDF</span></button>
                    <button onClick={() => handleExportExcel(report.id)} className="px-4 py-2 bg-green-500 hover:bg-[oklch(65%_0.24_149.579)] text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg cursor-pointer"><span className="text-xs">Excel</span></button>
                    <button onClick={() => handleDeleteReport(report.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.itemsPerPage}:</label>
                  <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg border text-sm cursor-pointer ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50`}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.showing} {startIndex + 1} {t.to} {Math.min(endIndex, filteredData.length)} {t.of} {filteredData.length} {t.items}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${currentPage === 1 ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed' : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}><ChevronLeft className="w-4 h-4" /></button>
                  {getPageNumbers().map((page, index) => {
                    if (page === '...') return <span key={`ellipsis-${index}`} className={`px-3 py-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>...</span>;
                    return (
                      <button 
                        key={page} 
                        onClick={() => handlePageChange(page as number)} 
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          currentPage === page 
                            ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700' 
                            : darkMode 
                              ? 'bg-gray-700 text-white hover:bg-gray-600' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${currentPage >= totalPages ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed' : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <DeleteReportModal 
        show={showDeleteConfirm} 
        reportId={reportToDelete} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={confirmDeleteReport} 
        language={language} 
        darkMode={darkMode} 
      />
      
      {showModal && selectedReport && (
        <ReportDetailModal 
          report={selectedReport} 
          darkMode={darkMode} 
          language={language} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}