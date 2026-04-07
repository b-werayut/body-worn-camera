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
  location: string;
}

export const initialReportData: ReportSqlData[] = [
  {
    id: 'REP-20260325-001',
    missionId: 'ACT-69001',
    missionName: 'ตั้งด่านตรวจวัดแอลกอฮอล์ (ช่วงที่ 1)',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    startTime: '2026-03-25T22:00:00',
    endTime: '2026-03-25T23:00:00',
    duration: '1 ชม. 0 นาที',
    location: 'ถนนพระราม 9',
    videoUrl: 'https://example.com/video1.mp4',
  },
  {
    id: 'REP-20260325-002',
    missionId: 'ACT-69001',
    missionName: 'ตั้งด่านตรวจวัดแอลกอฮอล์ (ช่วงที่ 2)',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    startTime: '2026-03-25T23:00:00',
    endTime: '2026-03-26T00:00:00',
    duration: '1 ชม. 0 นาที',
    location: 'ถนนพระราม 9',
    videoUrl: 'https://example.com/video2.mp4',
  },
  // กรณีฉุกเฉิน: บันทึกวิดีโอเสร็จแล้ว แต่ยังไม่มีการผูกเข้ากับแผนงาน
  {
    id: 'REP-20260325-003',
    missionId: null,   
    missionName: null,
    officerId: 'USR-002',
    officerName: 'จ.ส.ต. สมเกียรติ กล้าหาญ',
    startTime: '2026-03-25T14:10:00',
    endTime: '2026-03-25T14:15:00',
    duration: '0 ชม. 5 นาที',
    location: 'ไม่ทราบพิกัด (GPS Offline)',
    videoUrl: 'https://example.com/video3.mp4',
  },
  {
    id: 'REP-20260324-001',
    missionId: 'ACT-69000',
    missionName: 'ลาดตระเวนพื้นที่เสี่ยง',
    officerId: 'USR-003',
    officerName: 'ด.ต. วีระยุทธ มั่นคง',
    startTime: '2026-03-24T09:00:00',
    endTime: '2026-03-24T12:00:00',
    duration: '3 ชม. 0 นาที',
    location: 'ลาดพร้าว',
    videoUrl: 'https://example.com/video4.mp4',
  },
  {
    id: 'REP-20260324-002',
    missionId: 'ACT-68999',
    missionName: 'ตรวจตราความเรียบร้อยตลาดนัด',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    startTime: '2026-03-24T16:00:00',
    endTime: '2026-03-24T18:30:00',
    duration: '2 ชม. 30 นาที',
    location: 'ตลาดนัดจตุจักร',
    videoUrl: 'https://example.com/video5.mp4',
  },
];

// รูปภาพประกอบสำหรับหน้ารายละเอียด (Modal)
export const mockReportImages = {
  mainVideoImage: 'https://images.unsplash.com/photo-1599350686877-382a54114d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGZvb3RhZ2UlMjBtb25pdG9yfGVufDF8fHx8MTc3MjE5MTUwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  thumbnailImages: [
    'https://images.unsplash.com/photo-1678137613402-02f744ef4bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBib2R5JTIwY2FtZXJhJTIwZm9vdGFnZSUyMHNjcmVlbnxlbnwxfHx8fDE3NzIxODc4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1665848383782-1ea74efde68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMG1vbml0b3IlMjBzdXJ2ZWlsbGFuY2V8ZW58MXx8fHwxNzcyMTg3ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1628582235908-b73cd85ceecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHN1cnZlaWxsYW5jZSUyMHNjcmVlbiUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NzIxODc4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ]
};