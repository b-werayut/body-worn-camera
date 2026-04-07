import { useState } from 'react';
import { Calendar, ChevronDown, Search, Play, Archive, X, User, Video, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { type VideoLibrarySqlData, initialVideoData } from '../data/videoLibraryMockData';
import { VideoLibraryModal } from '../components/modals/VideoLibraryModal';
import { videoLibraryTranslations, type VideoLibraryLanguage } from '../locales/videoLibraryTranslations';

interface VideoLibraryProps {
  darkMode: boolean;
  language: VideoLibraryLanguage;
}

export function VideoLibrary({ darkMode, language = 'th' }: VideoLibraryProps) {
  const translations = videoLibraryTranslations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('all');
  const [selectedSpotCheck, setSelectedSpotCheck] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoLibrarySqlData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [videos, setVideos] = useState<VideoLibrarySqlData[]>(initialVideoData);

  const filteredData = videos.filter((video) => {
    // ป้องกัน Error จากค่า null ตอนทำ Search
    const safeMissionId = video.missionId || '';
    const safeMissionName = video.missionName || '';
    const safeOfficerName = video.officerName || '';
    const safeLocation = video.location || '';

    const matchesSearch = 
      safeMissionId.toLowerCase().includes(searchQuery.toLowerCase()) || 
      safeMissionName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      safeOfficerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      safeLocation.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesOfficer = selectedOfficer === 'all' || video.officerName === selectedOfficer;
    const matchesSpotCheck = selectedSpotCheck === 'all' || video.missionId === selectedSpotCheck;
    
    let matchesDate = true;
    if (startDate && endDate) {
      const videoDate = new Date(video.startTime.split('T')[0]);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = videoDate >= start && videoDate <= end;
    }
    
    return matchesSearch && matchesOfficer && matchesSpotCheck && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePlayVideo = (video: VideoLibrarySqlData) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handleArchiveVideo = (videoId: string) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, isArchived: !v.isArchived } : v));
    if (selectedVideo && selectedVideo.id === videoId) {
      setSelectedVideo({ ...selectedVideo, isArchived: !selectedVideo.isArchived });
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

  const formatDate = (isoString: string) => {
    if (!isoString || !isoString.includes('T')) return isoString;
    return new Date(isoString).toLocaleDateString('th-TH');
  };
  const formatTime = (isoString: string) => {
    if (!isoString || !isoString.includes('T')) return isoString;
    return isoString.split('T')[1].substring(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>
              {translations.listTitle}
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {translations.showingAllItems} {filteredData.length} {translations.items}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{translations.startDate}</label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all`} />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{translations.endDate}</label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all`} />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{translations.filterOfficer}</label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <select value={selectedOfficer} onChange={(e) => setSelectedOfficer(e.target.value)} className={`w-full pl-10 pr-10 py-2.5 rounded-lg border appearance-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all cursor-pointer`}>
                <option value="all">{translations.allOfficers}</option>
                {/* 🚀 2. อัปเดตรายชื่อให้ตรงกับ Mock Data ใหม่ */}
                <option value="ส.ต.อ. สมชาย รักดี">ส.ต.อ. สมชาย รักดี</option>
                <option value="จ.ส.ต. สมเกียรติ กล้าหาญ">จ.ส.ต. สมเกียรติ กล้าหาญ</option>
                <option value="ด.ต. วีระยุทธ มั่นคง">ด.ต. วีระยุทธ มั่นคง</option>
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{translations.filterSpotCheck}</label>
            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <select value={selectedSpotCheck} onChange={(e) => setSelectedSpotCheck(e.target.value)} className={`w-full pl-10 pr-10 py-2.5 rounded-lg border appearance-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all cursor-pointer`}>
                <option value="all">{translations.allSpotChecks}</option>
                {/* 🚀 3. อัปเดตรหัส Activity ให้ตรงกับ Mock Data ใหม่ */}
                <option value="ACT-69001">ACT-69001</option>
                <option value="ACT-69000">ACT-69000</option>
                <option value="ACT-68999">ACT-68999</option>
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={translations.searchPlaceholder} className={`w-full pl-12 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fcd500]' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#0c274b]'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 transition-all`} />
          </div>
          <button onClick={() => { setSearchQuery(''); setStartDate(''); setEndDate(''); setSelectedOfficer('all'); setSelectedSpotCheck('all'); setCurrentPage(1); }} className={`px-6 py-3 rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 whitespace-nowrap cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>
            <X className="w-5 h-5" />
            <span>{translations.reset}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {filteredData.length === 0 ? (
          <div className={`p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Video className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{translations.noData}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.noDataMessage}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-blue-500 to-blue-600">
                    <th className="px-4 py-3 text-center text-sm font-semibold text-white border-r border-white/10 w-16">{translations.tableNo}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{translations.tableCode}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{translations.tableTitle}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10">{translations.tableOfficer}</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-white w-56">{translations.tableActions}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((video, index) => (
                    <tr key={video.id} className={`border-b transition-all hover:bg-opacity-50 ${index % 2 === 0 ? darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-white hover:bg-gray-50' : darkMode ? 'bg-gray-700/10 hover:bg-gray-700/30' : 'bg-gray-50 hover:bg-gray-100'} ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <td className={`px-4 py-4 text-center border-r ${darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
                        {startIndex + index + 1}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold border-r ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        {/* 🚀 4. ดักเช็คแสดงรหัส หรือขึ้นป้าย N/A กรณีฉุกเฉิน */}
                        {video.missionId ? (
                          <span className={darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}>{video.missionId}</span>
                        ) : (
                          <span className="text-red-500">N/A</span>
                        )}
                      </td>
                      <td className={`px-4 py-4 text-sm border-r ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'}`}>
                        <div>
                          {/* 🚀 5. แสดงชื่อแผนงาน หรือปุ่มผูกแผนงาน */}
                          {video.missionName ? (
                            <div className="font-medium">{video.missionName}</div>
                          ) : (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200">
                                วิดีโอฉุกเฉิน (Unassigned)
                              </span>
                              <button className="text-xs text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">
                                + ผูกแผนงาน
                              </button>
                            </div>
                          )}
                          <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {formatDate(video.startTime)} {formatTime(video.startTime)} • {video.duration}
                          </div>
                        </div>
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm border-r ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-900'}`}>
                        {video.officerId} {video.officerName}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handlePlayVideo(video)} className="px-4 py-2 bg-linear-to-r from-[#fcd500] to-[#fed300] hover:from-[#fed300] hover:to-[#fcd500] text-[#0c274b] rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer">
                            <Play className="w-4 h-4" />
                            <span>{translations.play}</span>
                          </button>
                          <button onClick={() => handleArchiveVideo(video.id)} className={`px-4 py-2 rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer ${video.isArchived ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                            <Archive className="w-4 h-4" />
                            <span>{video.isArchived ? translations.archived : translations.archive}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((video) => (
                <div key={video.id} className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {video.missionId ? (
                          <span className={`text-sm font-bold ${darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}`}>{video.missionId}</span>
                        ) : (
                          <span className="text-sm font-bold text-red-500">N/A</span>
                        )}
                      </div>
                      
                      {video.missionName ? (
                        <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{video.missionName}</div>
                      ) : (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md">วิดีโอฉุกเฉิน</span>
                          <button className="text-xs text-blue-500 hover:underline cursor-pointer">+ ผูกแผนงาน</button>
                        </div>
                      )}

                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{video.officerId} {video.officerName}</div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{formatDate(video.startTime)} {formatTime(video.startTime)} • {video.duration}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handlePlayVideo(video)} className="flex-1 px-4 py-2 bg-linear-to-r from-[#fcd500] to-[#fed300] hover:from-[#fed300] hover:to-[#fcd500] text-[#0c274b] rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                      <Play className="w-4 h-4" /><span>{translations.play}</span>
                    </button>
                    <button onClick={() => handleArchiveVideo(video.id)} className={`flex-1 px-4 py-2 rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer ${video.isArchived ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                      <Archive className="w-4 h-4" /><span>{video.isArchived ? translations.archived : translations.archive}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{translations.itemsPerPage}:</label>
                  <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50 cursor-pointer`}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {translations.showing} {startIndex + 1} {translations.to} {Math.min(endIndex, filteredData.length)} {translations.of} {filteredData.length} {translations.items}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1 ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed' : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 cursor-pointer'}`}><ChevronLeft className="w-4 h-4" /></button>
                  {getPageNumbers().map((page, index) => {
                    if (page === '...') return <span key={`ellipsis-${index}`} className={`px-3 py-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>...</span>;
                    return <button key={page} onClick={() => handlePageChange(page as number)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${currentPage === page ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700' : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}>{page}</button>;
                  })}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage >= totalPages ? darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed' : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 cursor-pointer'}`}><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- External Modal --- */}
      <VideoLibraryModal 
        show={showVideoModal} 
        video={selectedVideo} 
        onClose={() => setShowVideoModal(false)} 
        onArchive={handleArchiveVideo} 
        translations={translations} 
        language={language}
        darkMode={darkMode} 
      />

    </div>
  );
}