export interface SpotCheckItem {
  id: string;
  missionId: string;   
  reportId?: string;
  missionName: string;
  status: 'waiting' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  statusText: string;
  startTime: string;    // Format: YYYY-MM-DDTHH:mm:ss
  endTime?: string;     // Format: YYYY-MM-DDTHH:mm:ss
  location: string;
  address: string;
  coordinates: string;
  officerId: string; 
  officerName: string;
  cameraId: string;
  priority: 'low' | 'medium' | 'high';
  reportType: 'daily' | 'incident' | 'inspection' | 'training';
  description?: string; 
}

export const initialSpotCheckData: SpotCheckItem[] = [
  {
    id: '1',
    missionId: 'ACT-69001',
    missionName: 'ตั้งด่านตรวจวัดแอลกอฮอล์ (ช่วงที่ 1)',
    status: 'completed',
    statusText: 'เสร็จสิ้น',
    startTime: '2026-03-25T22:00:00', 
    endTime: '2026-03-25T23:00:00',
    location: 'ถนนพระราม 9',
    address: 'เขตห้วยขวาง กรุงเทพมหานคร',
    coordinates: '13.7554° N, 100.5701° E',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    cameraId: 'CAM-D001',
    priority: 'high',
    reportType: 'daily',
    description: 'บันทึกภาพการปฏิบัติงานตั้งด่านตรวจวัดแอลกอฮอล์'
  },
  {
    id: '2',
    missionId: 'ACT-69002',
    missionName: 'ตรวจสอบเหตุร้องเรียนเสียงดัง',
    status: 'in-progress',
    statusText: 'กำลังปฏิบัติงาน',
    startTime: '2026-03-26T01:30:00',
    location: 'ซอยสุขุมวิท 71',
    address: 'เขตวัฒนา กรุงเทพมหานคร',
    coordinates: '13.7258° N, 100.5960° E',
    officerId: 'USR-003',
    officerName: 'ด.ต. วีระยุทธ มั่นคง',
    cameraId: 'CAM-D003',
    priority: 'medium',
    reportType: 'incident',
    description: 'ได้รับแจ้งเหตุวัยรุ่นรวมกลุ่มส่งเสียงดังรบกวน'
  },
  {
    id: '3',
    missionId: 'ACT-69003',
    missionName: 'ลาดตระเวนพื้นที่จุดเสี่ยงอาชญากรรม',
    status: 'waiting',
    statusText: 'รอรับงาน',
    startTime: '2026-03-26T03:00:00',
    endTime: '2026-03-26T06:00:00',
    location: 'สถานีรถไฟ',
    address: 'เขตปทุมวัน กรุงเทพมหานคร',
    coordinates: '13.7394° N, 100.5165° E',
    officerId: 'USR-002',
    officerName: 'จ.ส.ต. สมเกียรติ กล้าหาญ',
    cameraId: 'CAM-D002',
    priority: 'high',
    reportType: 'inspection',
  },
  {
    id: '4',
    missionId: 'ACT-68999',
    missionName: 'ตรวจตราความเรียบร้อยตลาดนัด',
    status: 'completed',
    statusText: 'เสร็จสิ้น',
    startTime: '2026-03-24T16:00:00',
    endTime: '2026-03-24T18:30:00',
    location: 'ตลาดนัดจตุจักร',
    address: 'เขตจตุจักร กรุงเทพมหานคร',
    coordinates: '13.7998° N, 100.5516° E',
    officerId: 'USR-001',
    officerName: 'ส.ต.อ. สมชาย รักดี',
    cameraId: 'CAM-D001',
    priority: 'medium',
    reportType: 'daily',
  },
  {
    id: '5',
    missionId: 'ACT-69004',
    missionName: 'ดูแลความปลอดภัยการชุมนุม',
    status: 'cancelled',
    statusText: 'ยกเลิก',
    startTime: '2026-03-26T09:00:00',
    endTime: '2026-03-26T12:00:00',
    location: 'อนุสาวรีย์ประชาธิปไตย',
    address: 'เขตพระนคร กรุงเทพมหานคร',
    coordinates: '13.7567° N, 100.5018° E',
    officerId: 'USR-002',
    officerName: 'จ.ส.ต. สมเกียรติ กล้าหาญ',
    cameraId: 'CAM-D002',
    priority: 'medium',
    reportType: 'inspection',
    description: 'ยกเลิกภารกิจเนื่องจากผู้ชุมนุมยุติการทำกิจกรรม'
  },
];