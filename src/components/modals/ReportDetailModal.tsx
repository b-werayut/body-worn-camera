import { useEffect } from 'react';
import { X, Play, FileText, Clock, User, Calendar, AlertTriangle, Trash2, MapPin } from 'lucide-react';
import type { ReportSqlData } from '../../pages/Reports';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { reportTranslations } from '../../locales/reportTranslations';
import { mockReportImages } from '../../data/reportMockData';

type TranslationsType = Record<string, string>;

interface BaseProps {
  darkMode: boolean;
  language: 'th' | 'en';
  translations: TranslationsType;
}

interface ReportInfoCardProps extends BaseProps {
  report: ReportSqlData;
}

interface ReportVideoSectionProps extends BaseProps {
  mainVideoImage: string;
  thumbnailImages: string[];
}

interface ReportDetailModalProps {
  report: ReportSqlData;
  darkMode: boolean;
  language: 'th' | 'en';
  onClose: () => void;
}

interface DeleteReportModalProps {
  show: boolean;
  reportId: string | null;
  onClose: () => void;
  onConfirm: () => void;
  language: 'th' | 'en';
  darkMode: boolean;
}

function ReportInfoCard({ report, darkMode, language, translations }: ReportInfoCardProps) {
  const getEndTimeStr = (startStr: string) => {
    if (!startStr || !startStr.includes('T')) return "-";
    if (report.endTime && report.endTime.includes('T')) {
      return report.endTime.split('T')[1].substring(0, 5);
    }
    const timeParts = startStr.split('T')[1].split(':');
    const hour = (parseInt(timeParts[0], 10) + 2).toString().padStart(2, '0');
    return `${hour}:${timeParts[1].substring(0, 2)}`;
  };

  const formatTimeOnly = (isoString: string) => {
    if (!isoString || !isoString.includes('T')) return isoString || "-";
    return isoString.split('T')[1].substring(0, 5);
  };

  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`px-5 py-3 border-b ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-linear-to-r from-gray-50 to-gray-100 border-gray-200'}`}>
        <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>
          <FileText className="w-5 h-5 text-[#fcd500]" />
          {language === 'th' ? 'ข้อมูลรายงาน' : 'Report Information'}
        </h3>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-[#fcd500]' : 'bg-[#0c274b]'}`}></div>
          </div>
          <div className="flex-1">
            <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.reportNumber}</p>
            {report.missionId ? (
              <p className={`text-lg font-bold ${darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}`}>{report.missionId}</p>
            ) : (
              <span className="inline-block px-2.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200 mt-1">
                {translations.unassigned}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
          <div className="flex-1">
            <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.date}</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {report.startTime?.includes('T') ? new Date(report.startTime).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US') : report.startTime}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <User className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
          <div className="flex-1">
            <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.officer}</p>
            <p className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{report.officerName}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.mission}:</span>
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} ${!report.missionName ? 'text-red-500 italic' : ''}`}>
                {report.missionName || translations.unassigned}
              </span>
            </div>
            {report.location && (
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{report.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.startRecordTime}:</span>
              <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatTimeOnly(report.startTime)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.endTime}:</span>
              <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {getEndTimeStr(report.startTime)}
              </span>
            </div>
            
            <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <div className="text-center">
                <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.recordedDuration}:</p>
                <p className={`font-bold text-lg ${darkMode ? 'text-[#fcd500]' : 'text-[#0c274b]'}`}>{report.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-blue-50'}`}>
          <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{translations.usageLog}</p>
          <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {translations.openedBy} <span className="font-bold text-[#fcd500]">Admin</span> {translations.at} <span className="font-bold">12:10</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ReportVideoSection({ darkMode, language, translations, mainVideoImage, thumbnailImages }: ReportVideoSectionProps) {
  return (
    <div className="space-y-4">
      <div className={`rounded-2xl overflow-hidden shadow-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`px-5 py-3 border-b ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-linear-to-r from-gray-50 to-gray-100 border-gray-200'}`}>
          <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>
            <Play className="w-5 h-5 text-[#fcd500]" />
            {language === 'th' ? 'วิดีโอบันทึก' : 'Recorded Video'}
          </h3>
        </div>
        
        <div className="p-4">
          <div className={`rounded-xl overflow-hidden shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="aspect-video relative overflow-hidden group cursor-pointer bg-black flex items-center justify-center">
              <ImageWithFallback src={mainVideoImage} alt={translations.videoPlayer} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <Play className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {thumbnailImages.map((image, index) => (
              <div key={index} className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${index === 0 ? 'border-[#fcd500] shadow-lg' : darkMode ? 'border-gray-600 hover:border-[#fcd500]' : 'border-gray-300 hover:border-[#fcd500]'}`}>
                <div className="aspect-video relative overflow-hidden group bg-gray-900 flex items-center justify-center">
                  <ImageWithFallback src={image} alt={`${translations.thumbnail} ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full px-6 py-4 bg-linear-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-3 border-2 border-gray-700 hover:border-gray-600 group cursor-pointer">
        <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="text-lg">{translations.export}</span>
      </button>
    </div>
  );
}

export function ReportDetailModal({ report, darkMode, language, onClose }: ReportDetailModalProps) {
  useEffect(() => {
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
  }, []);

  const translations = reportTranslations[language];
  const { mainVideoImage, thumbnailImages } = mockReportImages;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className={`w-full max-w-7xl max-h-[95vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`}>
        
        <div className="bg-linear-to-r from-[#0c274b] via-[#0c274b] to-[#0a1f3a] px-6 py-5 flex items-center justify-between shrink-0 border-b border-[#fcd500]/20">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-[#fcd500] to-[#fed300] p-2.5 rounded-xl shadow-lg">
              <FileText className="w-7 h-7 text-[#0c274b]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{translations.modalTitle}</h2>
              {report.missionId ? (
                <p className="text-sm text-[#fcd500]/80 mt-0.5">{report.missionId}</p>
              ) : (
                <div className="flex items-center gap-1.5 mt-1">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <p className="text-xs text-red-400 font-medium">{translations.unassigned}</p>
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-all p-2.5 hover:bg-white/10 rounded-xl group cursor-pointer">
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportInfoCard report={report} darkMode={darkMode} language={language} translations={translations} />
              <ReportVideoSection darkMode={darkMode} language={language} translations={translations} mainVideoImage={mainVideoImage} thumbnailImages={thumbnailImages} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function DeleteReportModal({ show, reportId, onClose, onConfirm, language, darkMode }: DeleteReportModalProps) {
  if (!show) return null;

  const t = reportTranslations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'
      }`}>
        <div className="bg-linear-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            {t.deleteConfirmTitle}
          </h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-4">
            <div className={`rounded-lg p-4 border-l-4 ${darkMode ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-red-500'}`}>
              <p className={`text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.deleteConfirmMsg}</p>
              <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.deleteReportNo} <span className="font-bold text-red-500">{reportId || t.unassigned}</span>
              </p>
            </div>

            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>* {t.deleteWarning}</p>

            <div className="flex gap-3 justify-center pt-4">
              <button onClick={onClose} className={`px-6 py-2.5 rounded-xl transition-all font-medium flex items-center gap-2 cursor-pointer ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {t.deleteCancel}
              </button>
              <button onClick={onConfirm} className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all font-bold shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer">
                <Trash2 className="w-5 h-5" />
                {t.deleteConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}