export interface LiveFeedSqlData {
  id: string;
  deviceId: string;   
  missionId: string | null;  
  missionName: string | null;
  officerId: string; 
  officerName: string;
  location: string;
  startTime: string;  
  deviceStatus: 'online' | 'offline' | 'maintenance';
  isLive: boolean;
}

export const initialLiveFeedData: LiveFeedSqlData[] = [
  // กรณีปกติ: มีการสร้างแผนงานและผูกกล้องเรียบร้อยแล้ว
  {
    id: '1',
    missionId: 'ACT-69001',
    missionName: 'ตั้งด่านตรวจวัดแอลกอฮอล์ (ช่วงที่ 1)',
    deviceStatus: 'online',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    deviceId: 'CAM-D001',
    location: 'ถนนพระราม 9',
    startTime: '2026-03-25T22:00:00', 
    isLive: true,
  },
  // กรณีฉุกเฉิน: กล้องเปิดสตรีมมิ่งแล้ว แต่ยังไม่ได้ผูกแผนงาน (รอส่วนกลางจับคู่ให้)
  {
    id: '2',
    missionId: null,  
    missionName: null, 
    deviceStatus: 'online',
    officerId: 'USR-002',
    officerName: 'จ.ส.ต. สมเกียรติ กล้าหาญ',
    deviceId: 'CAM-D002',
    location: 'ไม่ทราบพิกัด (GPS Offline)',
    startTime: '2026-03-25T14:10:00', 
    isLive: true,
  },
  // กรณีกล้องออฟไลน์: กล้องไม่ได้สตรีมภาพ (อาจจะปิดอยู่หรือแบตหมด)
  {
    id: '3',
    missionId: 'ACT-69000',
    missionName: 'ลาดตระเวนพื้นที่เสี่ยง',
    deviceStatus: 'offline',
    officerId: 'USR-003',
    officerName: 'ด.ต. วีระยุทธ มั่นคง',
    deviceId: 'CAM-D003',
    location: 'ลาดพร้าว',
    startTime: '2026-03-24T09:00:00', 
    isLive: false,
  }
];