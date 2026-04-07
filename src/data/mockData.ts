export interface NavItem {
  id: string;
  labelKey: string;
  iconName: string;
}

export interface CameraData {
  id: number;
  name: string;
  status: 'online' | 'offline';
  serialNo?: string;
  battery?: number;
  signal?: 'Strong' | 'Weak';
}

export interface GpsDeviceData {
  id: number;
  name: string;
  serialNo?: string;
  latitude?: number | string;
  longitude?: number | string;
}

export interface AlertData {
  id: number;
  typeKey: 'sos_panic' | 'connection_lost' | 'battery_low' | 'storage_full'; // อัปเดตประเภทแจ้งเตือนระบบ
  officer: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
  details: string;     
  category?: 'event' | 'report';
  date?: string;
  datetime?: string;
  title?: string;
  officerName?: string;
}

export const navItems: NavItem[] = [
  { id: 'dashboard', labelKey: 'dashboard', iconName: 'LayoutDashboard' },
  { id: 'activities', labelKey: 'activities', iconName: 'Activity' },
  { id: 'reports', labelKey: 'reports', iconName: 'FileText' },
  { id: 'live', labelKey: 'live', iconName: 'Video' },
  { id: 'videos', labelKey: 'videos', iconName: 'FileVideo' },
  { id: 'users', labelKey: 'users', iconName: 'Users' },
];

export const cameras: CameraData[] = [
  { id: 1, name: 'ว.ต.อ.สมชาย', status: 'online', serialNo: 'CAM-001', battery: 85, signal: 'Strong' },
  { id: 2, name: 'ส.ต.ท.วิชัย', status: 'online', serialNo: 'CAM-002', battery: 15, signal: 'Weak' },
  { id: 3, name: 'จ.ส.ต.สมศรี', status: 'offline', serialNo: 'CAM-003', battery: 0, signal: 'Weak' },
];

export const gpsDevices: GpsDeviceData[] = [
  { id: 1, name: 'ว.ต.อ.สมชาย (กำลังบันทึก)', serialNo: 'GPS-001', latitude: 13.7563, longitude: 100.5018 },
  { id: 2, name: 'ส.ต.ท.วิชัย', serialNo: 'GPS-002', latitude: 13.7663, longitude: 100.5118 },
];

export const allAlerts: AlertData[] = [
  {
    id: 1,
    typeKey: 'sos_panic', // เจ้าหน้าที่กดปุ่มฉุกเฉินที่ตัวกล้อง
    officer: 'ส.ต.อ. สมชาย รักดี (SC-001)',
    time: '14:30',
    severity: 'high',
    location: 'จุดตรวจพระราม 9',
    details: 'เจ้าหน้าที่กดปุ่มฉุกเฉิน (SOS) ขอความช่วยเหลือ'
  },
  {
    id: 2,
    typeKey: 'connection_lost', // สัญญาณเน็ตหลุด
    officer: 'จ.ส.ต. สมเกียรติ กล้าหาญ (SC-002)',
    time: '14:15',
    severity: 'high',
    location: 'ลาดตระเวน ซอยลาดพร้าว 112',
    details: 'กล้องขาดการเชื่อมต่ออินเทอร์เน็ตเกิน 5 นาที'
  },
  {
    id: 3,
    typeKey: 'battery_low', // แบตเตอรี่ต่ำกว่า 15%
    officer: 'ด.ต. วีระยุทธ มั่นคง (SC-003)',
    time: '13:45',
    severity: 'medium',
    location: 'จุดตรวจสุขุมวิท 71',
    details: 'แบตเตอรี่กล้องเหลือ 10% กรุณาเตรียมเปลี่ยนกล้อง'
  },
  {
    id: 4,
    typeKey: 'storage_full', // พื้นที่จัดเก็บในกล้องใกล้เต็ม
    officer: 'ส.ต.ท. หญิง มาลี สวยสด (SC-004)',
    time: '11:20',
    severity: 'medium',
    location: 'ตลาดสดเทศบาล',
    details: 'หน่วยความจำกล้องเหลือพื้นที่น้อยกว่า 5GB'
  }
];