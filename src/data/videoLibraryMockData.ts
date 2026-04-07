export interface VideoLibrarySqlData {
  id: string; 
  deviceId: string; 
  missionId: string | null;
  missionName: string | null;
  officerId: string; 
  officerName: string;
  startTime: string; 
  endTime: string; 
  duration: string;
  filePath: string; 
  location: string;
  isArchived: boolean;
}

// 🚀 2. อัปเดตข้อมูลให้ตรงกับไฟล์กลางและเพิ่มกรณีฉุกเฉิน
export const initialVideoData: VideoLibrarySqlData[] = [
  {
    id: 'VID-20260325-001',
    deviceId: 'CAM-D001',
    missionId: 'ACT-69001',
    missionName: 'ตั้งด่านตรวจวัดแอลกอฮอล์ (ช่วงที่ 1)',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    startTime: '2026-03-25T22:00:00',
    endTime: '2026-03-25T23:00:00',
    duration: '1 ชม. 0 นาที',
    filePath: 'https://example.com/video1.mp4',
    location: 'ถนนพระราม 9',
    isArchived: false,
  },
  // 🚀 กรณีฉุกเฉิน: เปิดกล้องบันทึกด่วน ยังไม่ได้สร้างแผนงาน
  {
    id: 'VID-20260325-003',
    deviceId: 'CAM-D002',
    missionId: null,   // 🟢 เป็น null เพื่อรอหัวหน้าชุดมากดผูกแผนงาน
    missionName: null, // 🟢 เป็น null
    officerId: 'USR-002',
    officerName: 'จ.ส.ต. สมเกียรติ กล้าหาญ',
    startTime: '2026-03-25T14:10:00',
    endTime: '2026-03-25T14:15:00',
    duration: '0 ชม. 5 นาที',
    filePath: 'https://example.com/video_emergency.mp4',
    location: 'ไม่ทราบพิกัด (GPS Offline)',
    isArchived: false,
  },
  {
    id: 'VID-20260324-001',
    deviceId: 'CAM-D003',
    missionId: 'ACT-69000',
    missionName: 'ลาดตระเวนพื้นที่เสี่ยง',
    officerId: 'USR-003',
    officerName: 'ด.ต. วีระยุทธ มั่นคง',
    startTime: '2026-03-24T09:00:00',
    endTime: '2026-03-24T12:00:00',
    duration: '3 ชม. 0 นาที',
    filePath: 'https://example.com/video3.mp4',
    location: 'ลาดพร้าว',
    isArchived: true, // ตัวอย่างไฟล์เก่าที่ถูก Archive แล้ว
  },
  {
    id: 'VID-20260324-002',
    deviceId: 'CAM-D001',
    missionId: 'ACT-68999',
    missionName: 'ตรวจตราความเรียบร้อยตลาดนัด',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    startTime: '2026-03-24T16:00:00',
    endTime: '2026-03-24T18:30:00',
    duration: '2 ชม. 30 นาที',
    filePath: 'https://example.com/video4.mp4',
    location: 'ตลาดนัดจตุจักร',
    isArchived: false,
  }
];