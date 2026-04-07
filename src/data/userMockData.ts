export interface UserSqlData {
  userId: string;
  username: string;
  roleName: string; 
  securityLevel: 'high' | 'medium' | 'low'; // ระดับสิทธิ์
  status: 'active' | 'inactive';
}

export const initialUsersData: UserSqlData[] = [
  {
    userId: 'USR-002',
    username: 'admin.bwc',
    roleName: 'ผู้ดูแลระบบส่วนกลาง (Admin)', 
    securityLevel: 'high',
    status: 'active',
  },
  {
    userId: 'USR-003',
    username: 'weerayut.m',
    roleName: 'หัวหน้าชุดปฏิบัติการ (Supervisor)', 
    securityLevel: 'medium',
    status: 'active',
  },
  {
    userId: 'USR-005',
    username: 'somkiat.k',
    roleName: 'หัวหน้าชุดปฏิบัติการ (Supervisor)', 
    securityLevel: 'medium',
    status: 'active',
  },
  {
    userId: 'USR-001',
    username: 'somchai.r',
    roleName: 'เจ้าหน้าที่ปฏิบัติการ (Officer)', 
    securityLevel: 'low',
    status: 'active',
  },
  {
    userId: 'USR-004',
    username: 'malee.s',
    roleName: 'เจ้าหน้าที่ปฏิบัติการ (Officer)', 
    securityLevel: 'low',
    status: 'inactive',
  },
  {
    userId: 'USR-006',
    username: 'wichai.s',
    roleName: 'เจ้าหน้าที่ปฏิบัติการ (Officer)', 
    securityLevel: 'low',
    status: 'active',
  },
];