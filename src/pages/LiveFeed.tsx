import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Circle, MapPin, User, Video, Calendar, Radio } from 'lucide-react';
import { type LiveFeedSqlData, initialLiveFeedData } from '../data/liveFeedMockData';
import { LiveFeedVideoModal, LiveFeedDetailsModal } from '../components/modals/LiveFeedModals';
import { liveFeedTranslations, type SupportedLanguage } from '../locales/liveFeedTranslations';

interface LiveFeedProps {
  darkMode: boolean;
  language: SupportedLanguage;
}

export function LiveFeed({ darkMode, language }: LiveFeedProps) {
  const [selectedFeed, setSelectedFeed] = useState<LiveFeedSqlData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const t = liveFeedTranslations[language];

  const liveFeedData = initialLiveFeedData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500 text-white border-green-600';
      case 'maintenance': return 'bg-yellow-500 text-white border-yellow-600';
      case 'offline': return 'bg-red-500 text-white border-red-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return t.statusOnline;
      case 'maintenance': return t.statusMaintenance;
      case 'offline': return t.statusOffline;
      default: return 'Unknown';
    }
  };

  const handleConnect = (item: LiveFeedSqlData) => {
    setSelectedFeed(item);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setSelectedFeed(null);
    setIsPlaying(false);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedFeed(null);
  };

  const handleOpenVideo = () => {
    setShowDetailsModal(false);
    setShowVideoModal(true);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  useEffect(() => {
    if (showDetailsModal || showVideoModal) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showDetailsModal, showVideoModal]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>
              {t.title}
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="font-bold">{t.live}</span>
          </div>
        </div>
      </div>

      {/* Live Feed Table - Desktop */}
      <div className={`hidden lg:block rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-blue-500 to-blue-600">
                <th className="px-6 py-3 text-left text-sm font-semibold text-white border-r border-white/10">
                  {t.tableCode}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white border-r border-white/10">
                  {t.tableStatus}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  {t.tableTools}
                </th>
              </tr>
            </thead>
            <tbody>
              {liveFeedData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.noData}
                    </div>
                  </td>
                </tr>
              ) : (
                liveFeedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b transition-all hover:bg-opacity-50 ${
                      index % 2 === 0
                        ? darkMode
                          ? 'bg-gray-700/30 hover:bg-gray-700/50'
                          : 'bg-white hover:bg-gray-50'
                        : darkMode
                          ? 'bg-gray-700/10 hover:bg-gray-700/30'
                          : 'bg-gray-50 hover:bg-gray-100'
                    } ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                  >
                    <td className={`px-6 py-4 border-r ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="space-y-2">
                        {/* 🚀 รองรับกรณีไม่มี missionId (กรณีฉุกเฉิน) */}
                        <div className="flex items-center gap-2">
                          {item.missionId ? (
                            <p className={`font-bold text-lg ${darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}`}>
                              {item.missionId} 
                            </p>
                          ) : (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200">
                              {t.unassigned}
                            </span>
                          )}
                          
                          {item.isLive && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                              <Circle className="w-2 h-2 fill-white animate-pulse" />
                              {t.live}
                            </span>
                          )}
                        </div>
                        
                        {/* 🚀 รองรับกรณีไม่มี missionName */}
                        {item.missionName ? (
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.missionName}
                          </p>
                        ) : (
                          <button className="text-sm font-medium text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">
                            {t.assignActivity}
                          </button>
                        )}
                        
                        <div className="flex flex-wrap gap-3 text-sm mt-2">
                          <div className="flex items-center gap-1.5">
                            <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {item.officerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {item.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Video className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {t.camera} {item.deviceId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={`px-6 py-4 border-r ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="flex justify-center">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold border ${getStatusColor(item.deviceStatus)}`}>
                          {getStatusText(item.deviceStatus)}  
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleConnect(item)}
                          disabled={item.deviceStatus === 'offline'}
                          className={`px-6 py-2 font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer ${
                            item.deviceStatus === 'offline' 
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                              : 'bg-linear-to-r from-[#fcd500] to-[#fed300] hover:from-[#fed300] hover:to-[#fcd500] text-[#0c274b] hover:scale-105'
                          }`}
                        >
                          {item.isLive ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                          <span>{t.connect}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {liveFeedData.length === 0 ? (
          <div className={`rounded-xl shadow-lg p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.noData}
            </div>
          </div>
        ) : (
          liveFeedData.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="bg-linear-to-r from-blue-500 to-blue-600 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {/* 🚀 รองรับกรณีฉุกเฉินใน Mobile */}
                      {item.missionId ? (
                        <span className="text-white font-bold text-lg">{item.missionId}</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md">
                          {t.unassigned}
                        </span>
                      )}
                      
                      {item.isLive && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded animate-pulse">
                          <Circle className="w-2 h-2 fill-white" /> {t.live}
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ml-auto ${getStatusColor(item.deviceStatus)}`}>
                        {getStatusText(item.deviceStatus)}
                      </span>
                    </div>
                    {/* 🚀 รองรับกรณีฉุกเฉินใน Mobile */}
                    {item.missionName ? (
                      <p className="text-white/90 text-sm font-medium">{item.missionName}</p>
                    ) : (
                      <button className="text-white/90 text-sm font-medium underline">
                        {t.assignActivity}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {item.officerName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {item.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Video className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {t.camera} {item.deviceId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {/* จัดรูปแบบให้แสดงวันที่และเวลาสวยงาม */}
                      {item.startTime.includes('T') 
                        ? new Date(item.startTime).toLocaleString(language === 'th' ? 'th-TH' : 'en-US', { dateStyle: 'short', timeStyle: 'short' }) 
                        : item.startTime}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleConnect(item)}
                    disabled={item.deviceStatus === 'offline'}
                    className={`w-full px-4 py-2.5 font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      item.deviceStatus === 'offline'
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-linear-to-r from-[#fcd500] to-[#fed300] hover:from-[#fed300] hover:to-[#fcd500] text-[#0c274b]'
                    }`}
                  >
                    {item.isLive ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                    <span>{t.connect}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <LiveFeedDetailsModal 
        show={showDetailsModal} 
        feed={selectedFeed} 
        onClose={handleCloseDetailsModal} 
        onOpenVideo={handleOpenVideo} 
        getStatusColor={getStatusColor} 
        translations={t} 
        language={language} 
        darkMode={darkMode} 
      />
      <LiveFeedVideoModal 
        show={showVideoModal} 
        feed={selectedFeed} 
        onClose={handleCloseModal} 
        translations={t} 
        language={language} 
        isPlaying={isPlaying} 
        isMuted={isMuted} 
        togglePlay={togglePlay} 
        toggleMute={toggleMute} 
      />
      
    </div>
  );
}