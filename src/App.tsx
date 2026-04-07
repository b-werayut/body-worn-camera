import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import type { Language } from './locales/translations';

// นำเข้า Components หลัก
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// นำเข้าหน้าต่างๆ (Pages)
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SpotCheck } from './pages/SpotCheck';
import { Reports } from './pages/Reports';
import { LiveFeed } from './pages/LiveFeed';
import { VideoLibrary } from './pages/VideoLibrary';
import { UserManagement } from './pages/UserManagement';
// import { MapTracking } from './pages/MapTracking'; 
// import { DeviceManagement } from './pages/DeviceManagement'; 
// import { AuditLogs } from './pages/AuditLogs'; 

interface UnderConstructionProps {
  language: Language;
  darkMode: boolean;
}

const UnderConstruction = ({ language, darkMode }: UnderConstructionProps) => (
  <div className="flex items-center justify-center min-h-[60vh] animate-fadeIn">
    <div className={`text-center p-12 max-w-lg mx-auto rounded-3xl shadow-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-[#0c274b] to-[#1a3a5c] shadow-lg mb-8 border-4 border-[#fcd500]/20 relative">
         <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#fcd500]">
           <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
         </svg>
      </div>

      <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0c274b]'}`}>
        {language === 'th' ? 'ไม่พบหน้าเว็บ หรือ ระบบกำลังพัฒนา' : 'Page Not Found / Under Construction'}
      </h2>
      
      <p className={`text-lg mb-8 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {language === 'th' 
          ? <>ขออภัย หน้าเว็บที่คุณต้องการเข้าถึงไม่มีอยู่ หรือกำลังอยู่ในระหว่างการจัดทำ จะเปิดให้ใช้งานเร็วๆ นี้</>
          : <>Sorry, the page you are looking for does not exist or is currently under development.</>
        }
      </p>

      <Link 
        to="/dashboard"
        className="inline-block px-8 py-3.5 bg-linear-to-r from-[#fcd500] to-[#fed300] hover:from-[#fed300] hover:to-[#fcd500] text-[#0c274b] font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      >
        {language === 'th' ? 'กลับสู่หน้าหลัก (Dashboard)' : 'Back to Dashboard'}
      </Link>
    </div>
  </div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('auth_token') !== null;
  });
  const [language, setLanguage] = useState<Language>('th');
  const [darkMode, setDarkMode] = useState(false);

  // ฟังก์ชันสำหรับ Logout (ใช้ร่วมกันทั้งตอนกดปุ่ม และตอนหมดเวลา)
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('login_timestamp');
    setIsLoggedIn(false);
  };

  // ------------------ ระบบจับเวลา Session Timeout ------------------
  useEffect(() => {
    // ถ้าไม่ได้ล็อกอินอยู่ ไม่ต้องจับเวลา
    if (!isLoggedIn) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    
    // ตั้งเวลา Timeout (เช่น 30 นาที = 30 * 60 * 1000 มิลลิวินาที)
    // *ช่วงทดสอบ แนะนำให้เปลี่ยนเป็น 10000 (10 วินาที) จะได้เห็นผลทันทีครับ
    const SESSION_TIMEOUT_MS = 30 * 60 * 1000; 

    // ฟังก์ชันรีเซ็ตเวลาใหม่ ทุกครั้งที่มีการขยับเมาส์หรือพิมพ์
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // เมื่อหมดเวลา: แจ้งเตือน -> เคลียร์ Token -> เตะกลับหน้า Login
        alert(language === 'th' ? 'หมดเวลาการเชื่อมต่อ กรุณาเข้าสู่ระบบใหม่' : 'Session expired. Please login again.');
        handleLogout();
      }, SESSION_TIMEOUT_MS);
    };

    // รายการ Event ที่ถือว่าผู้ใช้ยัง "Active" อยู่
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    // ติดตั้ง Event Listener ทั่วทั้งหน้าเว็บ
    events.forEach(event => document.addEventListener(event, resetTimer));

    // เริ่มจับเวลาครั้งแรก
    resetTimer();

    // คืนค่า (Cleanup) เมื่อ Component ถูกถอด หรือผู้ใช้ Logout
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [isLoggedIn, language]);

  // ถ้ายังไม่ได้ล็อกอิน -> โชว์หน้า Login
  if (!isLoggedIn) {
    return (
      <Login 
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLoginSuccess={() => setIsLoggedIn(true)} 
      />
    );
  }

  // ถ้าล็อกอินแล้ว -> โชว์ Layout หลักครอบ <Routes>
  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        
        {/* ส่วนหัวของเว็บไซต์ */}
        <Header 
          language={language}
          setLanguage={setLanguage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 max-w-1600px w-full mx-auto relative">
          {/* สลับหน้าจอตาม URL จริง */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={<Dashboard language={language} darkMode={darkMode} />} />
            <Route path="/activities" element={<SpotCheck language={language} darkMode={darkMode} />} />
            <Route path="/reports" element={<Reports language={language} darkMode={darkMode} />} />
            <Route path="/live" element={<LiveFeed language={language} darkMode={darkMode} />} />
            <Route path="/videos" element={<VideoLibrary language={language} darkMode={darkMode} />} />
            <Route path="/users" element={<UserManagement language={language} darkMode={darkMode} />} />
            {/* <Route path="/map" element={<MapTracking language={language} darkMode={darkMode} />} />
            <Route path="/devices" element={<DeviceManagement language={language} darkMode={darkMode} />} />
            <Route path="/auditlogs" element={<AuditLogs language={language} darkMode={darkMode} />} /> */}

            <Route path="*" element={<UnderConstruction language={language} darkMode={darkMode} />} />
          </Routes>
        </main>

        <Footer language={language} darkMode={darkMode} />

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}</style>
      </div> 
    </BrowserRouter>
  );
}