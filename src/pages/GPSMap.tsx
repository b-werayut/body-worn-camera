import { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Map as MapIcon } from 'lucide-react';
import { mapTranslations, type SupportedLanguage } from '../locales/mapTranslations';

interface LocationData {
  deviceCategory: string;
  deviceCode: string;
  deviceName: string;
  deviceType: string;
  gpsX: number; // Longitude
  gpsY: number; // Latitude
  orgCode: string | null;
  orgName: string;
  status: string;
  updateTime: number;
}

interface LocationApiResponse {
  code: number;
  data?: LocationData;
  msg?: string;
}

interface GPSMapProps {
  language?: SupportedLanguage;
  darkMode?: boolean;
}

export function GPSMap({ language = 'th', darkMode = false }: GPSMapProps) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const t = mapTranslations[language];
  const txtConnecting = 'connectingGps' in t ? t['connectingGps' as keyof typeof t] : (language === 'th' ? 'กำลังเชื่อมต่อสัญญาณ GPS...' : 'Connecting to GPS...');
  const txtTracking = 'deviceTracking' in t ? t['deviceTracking' as keyof typeof t] : (language === 'th' ? '1 อุปกรณ์กำลังติดตาม' : '1 Device tracking');
  const txtDisconnected = 'gpsDisconnected' in t ? t['gpsDisconnected' as keyof typeof t] : (language === 'th' ? 'ขาดการเชื่อมต่อ GPS' : 'GPS Disconnected');
  const txtOpenMap = 'openFullMap' in t ? t['openFullMap' as keyof typeof t] : (language === 'th' ? 'เปิดแผนที่เต็ม' : 'Open Full Map');
  const txtOnline = 'onlineLatestCoords' in t ? t['onlineLatestCoords' as keyof typeof t] : (language === 'th' ? 'ออนไลน์ (พิกัดล่าสุด)' : 'Online (Latest coords)');
  const txtUpdated = 'updatedAt' in t ? t['updatedAt' as keyof typeof t] : (language === 'th' ? 'อัปเดต:' : 'Updated:');

  const fetchLocation = async () => {
    try {
      const response = await fetch('/api/v1/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          User: "true",
          location: "true",
          deviceCode: "1000093"
        })
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const result = (await response.json()) as LocationApiResponse;
      
      if (result.code === 1000 && result.data && result.data.gpsX) {
        setLocationData(result.data);
        setLastUpdated(new Date());
        setIsError(false);
      } else if (result.code === 7000) {
        // จำลองข้อมูลกรณี Auth Failed
        const mockData: LocationData = {
          deviceCategory: "1",
          deviceCode: "1000093",
          deviceName: "Bodycam",
          deviceType: "5",
          gpsX: 100.521467,
          gpsY: 13.718384,
          orgCode: null,
          orgName: "Test Location",
          status: "1",
          updateTime: Math.floor(Date.now() / 1000)
        };

        setLocationData(mockData);
        setLastUpdated(new Date());
        setIsError(false);
      } else {
        throw new Error(`Data Error: ${JSON.stringify(result)}`);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Failed to fetch location:", errorMessage);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchLocation(); 
    const intervalId = setInterval(() => {
      fetchLocation();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  const getMapUrl = () => {
    if (!locationData) {
      return "https://www.openstreetmap.org/export/embed.html?bbox=100.4518%2C13.7063%2C100.5518%2C13.8063&layer=mapnik";
    }

    const zoom = 0.005; 
    const minLon = locationData.gpsX - zoom;
    const minLat = locationData.gpsY - zoom;
    const maxLon = locationData.gpsX + zoom;
    const maxLat = locationData.gpsY + zoom;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik`;
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800">
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
      
      {/* OpenStreetMap Static Iframe */}
      <iframe
        src={getMapUrl()}
        style={{ 
          border: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          filter: darkMode ? 'contrast(0.8) saturate(1.2) invert(1) hue-rotate(180deg)' : 'contrast(0.9) saturate(1.2)'
        }}
        title="GPS Map"
      />

      {/* Marker */}
      {locationData && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative group cursor-pointer pointer-events-auto">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center relative z-10">
               <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap z-50">
              <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {locationData.deviceName} - {locationData.deviceCode}
                </p>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div> 
                  {txtOnline as string}
                </div>
                {lastUpdated && (
                  <p className="text-[10px] text-gray-500 mt-1">
                    {txtUpdated as string} {lastUpdated.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ป้ายมุมซ้ายล่าง */}
      <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 z-10">
        <p className="text-xs font-bold text-[#0c274b] dark:text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" /> 
          {('realTimeMap' in t ? t['realTimeMap' as keyof typeof t] : (language === 'th' ? 'แผนที่แบบเรียลไทม์' : 'Real-time Map')) as string}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
          {locationData ? (txtTracking as string) : (txtConnecting as string)}
        </p>
      </div>

      {/* ป้ายเตือนกรณี API Error */}
      {isError && (
        <div className="absolute top-4 left-4 bg-red-100 dark:bg-red-900/80 px-3 py-2 rounded-lg shadow border border-red-200 dark:border-red-800 z-10 flex items-center gap-2">
           <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
           <span className="text-xs font-bold text-red-600 dark:text-red-400">{txtDisconnected as string}</span>
        </div>
      )}

      {/* ปุ่มขยายแผนที่ มุมขวาบน */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (locationData) {
              window.open(`https://www.openstreetmap.org/?mlat=${locationData.gpsY}&mlon=${locationData.gpsX}#map=16/${locationData.gpsY}/${locationData.gpsX}`, '_blank');
            } else {
              window.open('https://www.openstreetmap.org', '_blank');
            }
          }}
          className="bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs font-bold text-[#0c274b] dark:text-white border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <MapIcon className="w-4 h-4 text-blue-500" />
          {txtOpenMap as string}
        </button>
      </div>
      
    </div>
  );
}