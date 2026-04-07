import { useState, useEffect } from 'react';
import { AlertCircle, MapPin, Camera, Bell, Circle, Eye, Navigation, Clock, X, Play, User, Battery, Wifi, Info } from 'lucide-react';
import { cameras, gpsDevices, allAlerts, type AlertData, type CameraData, type GpsDeviceData } from '../data/mockData';
import { GPSMap } from './GPSMap';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { dashboardTranslations, type SupportedLanguage } from '../locales/dashboardTranslations';

interface DashboardProps {
  language: SupportedLanguage; 
  darkMode: boolean;
}

export function Dashboard({ language, darkMode }: DashboardProps) {
  const t = dashboardTranslations[language];

  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [showGPSMap, setShowGPSMap] = useState(false);
  const [alertStartDate, setAlertStartDate] = useState('');
  const [alertEndDate, setAlertEndDate] = useState('');
  const [alertStartTime, setAlertStartTime] = useState('');
  const [alertEndTime, setAlertEndTime] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAlert !== null || showGPSMap) {
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
  }, [selectedAlert, showGPSMap]);

  // 🚀 Filter alerts based on date and time (ปรับให้รองรับข้อมูลแบบใหม่ที่ไม่มี datetime)
  const filteredAlerts = allAlerts.filter(alert => {
    // สมมติวันที่ปัจจุบันให้กับการแจ้งเตือนที่ไม่มี datetime เพื่อให้ระบบ filter ทำงานได้
    const baseDate = alert.date || new Date().toISOString().split('T')[0];
    const alertDateTime = new Date(`${baseDate}T${alert.time}:00`);
    
    let startDateTime: Date | null = null;
    if (alertStartDate) {
      const startDateStr = alertStartTime 
        ? `${alertStartDate}T${alertStartTime}:00`
        : `${alertStartDate}T00:00:00`;
      startDateTime = new Date(startDateStr);
    }
    let endDateTime: Date | null = null;
    if (alertEndDate) {
      const endDateStr = alertEndTime 
        ? `${alertEndDate}T${alertEndTime}:00`
        : `${alertEndDate}T23:59:59`;
      endDateTime = new Date(endDateStr);
    }
    if (startDateTime && alertDateTime < startDateTime) return false;
    if (endDateTime && alertDateTime > endDateTime) return false;
    return true;
  });

  const alerts = filteredAlerts;
  const totalAlerts = filteredAlerts.length;

  const selectedAlertData = selectedAlert ? alerts.find(a => a.id === selectedAlert) : null;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">{t.onlineCameras}</p>
              <h3 className="text-4xl font-bold mt-2">2</h3>
              <p className="text-green-100 text-xs mt-1">{t.totalCameras}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Camera className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">{t.gpsDevices}</p>
              <h3 className="text-4xl font-bold mt-2">2</h3>
              <p className="text-blue-100 text-xs mt-1">{t.tracking}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <MapPin className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-[#fcd500] to-[#fed300] rounded-2xl shadow-xl p-6 text-[#0c274b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#0c274b]/70 text-sm font-medium">{t.alerts}</p>
              <h3 className="text-4xl font-bold mt-2">{totalAlerts}</h3>
              <p className="text-[#0c274b]/70 text-xs mt-1">{t.pending}</p>
            </div>
            <div className="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Bell className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera List */}
        <div className={`rounded-2xl border shadow-lg hover:shadow-xl transition-shadow ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b rounded-t-2xl ${
            darkMode ? 'border-gray-700 bg-linear-to-r from-gray-700 to-gray-800' : 'border-gray-100 bg-linear-to-r from-gray-50 to-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-[#0c274b] to-[#1a3a5c] rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>{t.cameraList}</h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.cameraListDesc}</p>
              </div>
            </div>
          </div>
          <div className="p-2 space-y-2">
            {cameras.map((camera: CameraData) => (
              <div key={camera.id} className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${
                darkMode 
                  ? 'hover:bg-gray-700 border-transparent hover:border-gray-600' 
                  : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
              }`}>
                <div className={`w-4 h-4 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'} shadow-lg relative`}>
                  <div className={`absolute inset-0 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-ping opacity-75 z-1`}></div>
                </div>
                <div className="flex-1">
                  <span className={`font-bold block ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {camera.serialNo || camera.name} 
                  </span>
                  
                  <div className={`flex items-center gap-3 mt-1 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center gap-1">
                      <Battery className={`w-3.5 h-3.5 ${camera.battery !== undefined && camera.battery < 20 ? 'text-red-500' : 'text-green-500'}`} />
                      {camera.battery !== undefined ? camera.battery : '85'}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Wifi className={`w-3.5 h-3.5 ${camera.signal === 'Weak' ? 'text-orange-500' : 'text-blue-500'}`} />
                      {camera.signal || 'Strong'}
                    </span>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  camera.status === 'online' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <Circle className={`w-2.5 h-2.5 ${camera.status === 'online' ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500'}`} />
                  {camera.status === 'online' ? t.online : t.offline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GPS Map Summary */}
        <div className={`rounded-2xl border shadow-lg hover:shadow-xl transition-shadow ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b rounded-t-2xl ${
            darkMode ? 'border-gray-700 bg-linear-to-r from-gray-700 to-gray-800' : 'border-gray-100 bg-linear-to-r from-gray-50 to-white'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>{t.gpsMap}</h2>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.gpsMapDesc}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowGPSMap(true)}
                className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm cursor-pointer">
                {t.viewMap}
              </button>
            </div>
          </div>
          <div className="p-2 space-y-2">
            {gpsDevices.map((device: GpsDeviceData) => (
              <div key={device.id} className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${
                darkMode 
                  ? 'hover:bg-gray-700 border-transparent hover:border-gray-600' 
                  : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
              }`}>
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75 z-1"></div>
                </div>
                <div className="flex-1">
                  <span className={`font-bold block ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {device.serialNo || device.name}
                  </span>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Lat: {device.latitude || `13.${7563 + device.id * 100}`} / Lng: {device.longitude || `100.${5018 + device.id * 100}`}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-blue-500" />
              </div>
            ))}
            <div className="rounded-xl overflow-hidden shadow-sm h-300px border dark:border-gray-700 relative">
              <GPSMap language={language} />
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts Section */}
      <div className={`rounded-2xl border shadow-lg hover:shadow-xl transition-shadow ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b rounded-t-2xl ${
          darkMode ? 'border-gray-700 bg-linear-to-r from-gray-700 to-gray-800' : 'border-gray-100 bg-linear-to-r from-gray-50 to-white'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>{t.alertsSection}</h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.alertsSectionDesc}</p>
              </div>
            </div>
            
            {/* Date & Time Filter */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.startDate}
                  </label>
                  <input
                    type="date"
                    value={alertStartDate}
                    onChange={(e) => setAlertStartDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'
                    } focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.startTime}
                  </label>
                  <input
                    type="time"
                    value={alertStartTime}
                    onChange={(e) => setAlertStartTime(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'
                    } focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.endDate}
                  </label>
                  <input
                    type="date"
                    value={alertEndDate}
                    onChange={(e) => setAlertEndDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'
                    } focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.endTime}
                  </label>
                  <input
                    type="time"
                    value={alertEndTime}
                    onChange={(e) => setAlertEndTime(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-[#fcd500]' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-[#0c274b]'
                    } focus:outline-none focus:ring-2 focus:ring-[#fcd500]/50`}
                  />
                </div>
              </div>
              
              {/* Clear Filter Button & Results Count */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.showingResults} <span className={`font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{alerts.length}</span> {t.ofTotal} <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{allAlerts.length}</span> {t.items}
                </div>
                {(alertStartDate || alertEndDate || alertStartTime || alertEndTime) && (
                  <button
                    onClick={() => {
                      setAlertStartDate('');
                      setAlertEndDate('');
                      setAlertStartTime('');
                      setAlertEndTime('');
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 cursor-pointer ${
                      darkMode
                        ? 'bg-gray-600 text-white hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {t.clearFilter}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {alerts.length === 0 ? (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-semibold">{t.noAlertsFound}</p>
              <p className="text-sm mt-1">{t.tryAdjustFilter}</p>
            </div>
          ) : (
            alerts.map((alert: AlertData) => (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border-l-4 flex items-center justify-between transition-all hover:shadow-md ${
                alert.severity === 'high'
                  ? darkMode
                    ? 'bg-linear-to-r from-pink-900/40 to-red-900/40 border-pink-500'
                    : 'bg-linear-to-r from-pink-50 to-red-50 border-pink-500'
                  : darkMode
                    ? 'bg-linear-to-r from-orange-900/40 to-yellow-900/40 border-orange-500'
                    : 'bg-linear-to-r from-orange-50 to-yellow-50 border-orange-500'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <div className={`px-3 py-1 rounded-lg font-bold text-sm ${
                    alert.severity === 'high' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-orange-500 text-white'
                  }`}>
                    {t[alert.typeKey as keyof typeof t] || alert.typeKey} 
                  </div>
                  
                  {/* Time */}
                  <span className={`text-sm px-3 py-1 rounded-full border ${
                    darkMode 
                      ? 'text-gray-300 bg-gray-700 border-gray-600' 
                      : 'text-gray-500 bg-white border-gray-200'
                  }`}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {alert.time} น.
                  </span>
                </div>
                
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} flex flex-col gap-1`}>
                  <span className="font-semibold flex items-center gap-1"><User className="w-4 h-4"/> {alert.officer}</span>
                  <span className="flex items-center gap-1 truncate"><MapPin className="w-4 h-4"/> {alert.location}</span>
                </div>
              </div>
              
              <button className="ml-4 px-6 py-2.5 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                onClick={() => setSelectedAlert(alert.id)}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{t.detailsBtn}</span>
              </button>
            </div>
            ))
          )}
        </div>
      </div>

      {/* -------------------- ALERT DETAIL MODAL -------------------- */}
      {selectedAlertData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedAlert(null)}
        >
          <div className={`rounded-3xl max-w-5xl w-full max-h-[95vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="bg-linear-to-r from-pink-500 to-red-500 text-white p-6 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t.alertDetails}</h2>
                    <p className="text-pink-100 text-sm">Alert #{selectedAlertData.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-6">
                
                {/* 🚀 New Info Cards Section (เพิ่ม Location & Details) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`rounded-2xl p-5 border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-pink-50 border-pink-200'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className={`w-5 h-5 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                      <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>{t.type}</span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {t[selectedAlertData.typeKey as keyof typeof t] || selectedAlertData.typeKey}
                    </p>
                  </div>

                  <div className={`rounded-2xl p-5 border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <User className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t.officer}</span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAlertData.officer}</p>
                  </div>

                  <div className={`rounded-2xl p-5 border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                      <span className={`text-xs font-semibold uppercase ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{t.time}</span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAlertData.time} {t.timeUnit}</p>
                  </div>
                  
                  {/* กล่องแสดงรายละเอียด และสถานที่ เพิ่มเข้ามาใหม่ */}
                  <div className={`col-span-1 md:col-span-3 rounded-2xl p-5 border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Info className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>รายละเอียด (Details)</span>
                        </div>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{selectedAlertData.details}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>สถานที่ (Location)</span>
                        </div>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{selectedAlertData.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video/Image Section (ลบกรอบสีแดง AI ออก) */}
                <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-4 bg-black/30 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">{t.liveFeed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer">
                        <Play className="w-4 h-4" />
                        {t.playVideo}
                      </button>
                    </div>
                  </div>
                  <div className="relative aspect-video bg-gray-900">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1765340950943-9900aea37a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3YWxraW5nJTIwc3RyZWV0JTIwY2N0dnxlbnwxfHx8fDE3NzE0OTEzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Body Camera Footage"
                      className="w-full h-full object-cover"
                    />
                    {/* Timestamp มุมซ้ายล่าง */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-white text-sm font-mono">2026-03-25 {selectedAlertData.time}:00</p>
                    </div>
                    {/* ปุ่ม REC มุมขวาบน */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-bold">REC</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 flex-wrap">
                  <button className="flex-1 min-w-200px px-6 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                    <span className="text-xl">✓</span>
                    {t.actionCompleted}
                  </button>
                  <button className="flex-1 min-w-200px px-6 py-4 bg-linear-to-r from-[#fcd500] to-[#fed300] text-[#0c274b] rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                    <Navigation className="w-5 h-5" />
                    {t.sendOfficer}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- GPS MAP MODAL -------------------- */}
      {/* ... (ส่วนแสดงผล GPS MAP แบบเต็มจอ ไม่มีการเปลี่ยนแปลง) ... */}
      {showGPSMap && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowGPSMap(false)}
        >
          <div className={`rounded-3xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="bg-linear-to-r from-blue-500 to-cyan-500 text-white p-6 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t.gpsMap}</h2>
                    <p className="text-blue-100 text-sm">{t.gpsMapDesc}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowGPSMap(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-6">
                {/* GPS Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-green-600 uppercase">{t.onlineDevices}</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">2</p>
                    <p className="text-xs text-gray-600 mt-1">{t.trackingStatus}</p>
                  </div>

                  <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-blue-600 uppercase">{t.accuracy}</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">±5m</p>
                    <p className="text-xs text-gray-600 mt-1">{t.highPrecision}</p>
                  </div>

                  <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-yellow-600 uppercase">{t.lastUpdate}</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">2{t.updateTimeUnit}</p>
                    <p className="text-xs text-gray-600 mt-1">{t.updateAgo}</p>
                  </div>
                </div>

                {/* Large Map */}
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200 h-400px">
                  <GPSMap language={language} />
                </div>

                {/* Device List with Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gpsDevices.map((device: GpsDeviceData) => (
                    <div key={device.id} className={`rounded-2xl p-6 border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {device.serialNo || device.name}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">{t.coordinates}:</span>
                          <span>{device.latitude || `13.${7563 + device.id * 100}`}°N, {device.longitude || `100.${5018 + device.id * 100}`}°E</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <Navigation className="w-4 h-4 text-green-500" />
                          <span className="font-semibold">{t.speed}:</span>
                          <span>{device.id === 1 ? '0' : '25'} {t.speedUnit}</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span className="font-semibold">{t.updatedAt}:</span>
                          <span>{t.justNow}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all cursor-pointer">
                          {t.trackBtn}
                        </button>
                        <button className="flex-1 px-4 py-2 bg-linear-to-r from-[#fcd500] to-[#fed300] text-[#0c274b] rounded-xl text-sm font-semibold hover:shadow-lg transition-all cursor-pointer">
                          {t.detailsBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setShowGPSMap(false)}
                  className="w-full py-3.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all cursor-pointer">
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}