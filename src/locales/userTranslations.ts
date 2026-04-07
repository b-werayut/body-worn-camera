export type UserLanguage = 'th' | 'en';

export interface UserTranslationData {
  [key: string]: string;
  title: string;
  subtitle: string;
  listTitle: string;
  addUser: string;
  search: string;
  filterByRole: string;
  filterByStatus: string;
  reset: string;
  tableNo: string;
  tableUsername: string;
  tableName: string;
  tableRole: string;
  tableStatus: string;
  tableActions: string;
  edit: string;
  active: string;
  inactive: string;
  allRoles: string;
  allStatuses: string;
  roleHigh: string;
  roleMedium: string;
  roleLow: string;
  searchPlaceholder: string;
  showingItems: string;
  items: string;
  itemsPerPage: string;
  previous: string;
  next: string;
  noData: string;
  showing: string;
  to: string;
  of: string;
  editUser: string;
  username: string;
  fullName: string;
  password: string;
  role: string;
  roleUser: string;
  roleAdmin: string;
  roleOfficer: string;
  roleSupervisor: string;
  department: string;
  security: string;
  securityHigh: string;
  securityMedium: string;
  securityNormal: string;
  securityLow: string;
  permissions: string;
  permDashboard: string;
  permActivities: string;
  permLive: string;
  permVideo: string;
  permReports: string;
  permUsers: string;
  save: string;
  cancel: string;
  backToMain: string;
  delete: string;
  deleteConfirmTitle: string;
  deleteConfirmMessage: string;
  confirmDelete: string;
}

export const userTranslations: Record<UserLanguage, UserTranslationData> = {
  th: { 
    title: 'ผู้ใช้งาน', 
    subtitle: 'จัดการผู้ใช้งาน (User Management)', 
    listTitle: 'รายการผู้ใช้งาน', 
    addUser: 'เพิ่มผู้ใช้งาน', 
    search: 'ค้นหา', 
    filterByRole: 'ระดับสิทธิ์',
    filterByStatus: 'สถานะ', 
    reset: 'รีเซ็ต', 
    tableNo: 'No.', 
    tableUsername: 'ชื่อผู้ใช้', 
    tableName: 'ชื่อ-สกุล', 
    tableRole: 'ระดับสิทธิ์ (Role)', 
    tableStatus: 'สถานะ', 
    tableActions: 'เครื่องมือ', 
    edit: 'แก้ไข', 
    active: 'ใช้งาน', 
    inactive: 'ระงับการใช้งาน',
    allRoles: 'ทั้งหมด', 
    allStatuses: 'ทั้งหมด', 
    roleHigh: 'สูงสุด', 
    roleMedium: 'สูง', 
    roleLow: 'ปกติ', 
    searchPlaceholder: 'ค้นหาชื่อผู้ใช้หรือนามสกุล...', 
    showingItems: 'แสดงข้อมูลทั้งหมด', 
    items: 'รายการ', 
    itemsPerPage: 'แสดงต่อหน้า', 
    previous: 'ก่อนหน้า', 
    next: 'ถัดไป',
    noData: 'ไม่พบข้อมูลผู้ใช้งาน',
    showing: 'แสดง',
    to: 'ถึง',
    of: 'จาก',
    editUser: 'แก้ไขผู้ใช้งาน',
    username: 'ชื่อผู้ใช้ (Username)', 
    fullName: 'ชื่อ-นามสกุล',
    password: 'รหัสผ่าน Password',
    role: 'บทบาท (Role)',
    roleUser: 'ผู้ใช้งาน',
    roleAdmin: 'ผู้ดูแลระบบ',
    roleOfficer: 'เจ้าหน้าที่',
    roleSupervisor: 'หัวหน้าชุด',
    department: 'หน่วยงาน / สังกัด',
    security: 'ระดับความลับ',
    securityHigh: 'สูง',
    securityMedium: 'ปานกลาง',
    securityNormal: 'ปกติ',
    securityLow: 'ต่ำ',
    permissions: 'สิทธิ์การเข้าถึงระบบ',
    permDashboard: 'Dashboard',
    permActivities: 'จัดการภารกิจ',
    permLive: 'Live',
    permVideo: 'คลังวีดีโอ',
    permReports: 'รายงาน',
    permUsers: 'ผู้ใช้งาน',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    backToMain: 'กลับหน้าหลัก', 
    delete: 'ลบผู้ใช้งาน',
    deleteConfirmTitle: 'ยืนยันการลบผู้ใช้งาน',
    deleteConfirmMessage: 'คุณแน่ใจหรือไม่ที่จะลบผู้ใช้งานนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้',
    confirmDelete: 'ยืนยันการลบ',
  },
  en: { 
    title: 'Users', 
    subtitle: 'User Management', 
    listTitle: 'User List', 
    addUser: 'Add User', 
    search: 'Search', 
    filterByRole: 'Role', 
    filterByStatus: 'Status', 
    reset: 'Reset', 
    tableNo: 'No.', 
    tableUsername: 'Username', 
    tableName: 'Full Name', 
    tableRole: 'Role', 
    tableStatus: 'Status', 
    tableActions: 'Actions', 
    edit: 'Edit', 
    active: 'Active', 
    inactive: 'Inactive', 
    allRoles: 'All', 
    allStatuses: 'All', 
    roleHigh: 'High', 
    roleMedium: 'Medium', 
    roleLow: 'Low', 
    searchPlaceholder: 'Search username or name...', 
    showingItems: 'Showing', 
    items: 'items', 
    itemsPerPage: 'Items per page', 
    previous: 'Previous', 
    next: 'Next',
    noData: 'No users found',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    editUser: 'Edit User',
    username: 'Username',
    fullName: 'Full Name',
    password: 'Password',
    role: 'Role',
    roleUser: 'User',
    roleAdmin: 'Admin',
    roleOfficer: 'Officer',
    roleSupervisor: 'Supervisor',
    department: 'Department',
    security: 'Security Level',
    securityHigh: 'High',
    securityMedium: 'Medium',
    securityNormal: 'Normal',
    securityLow: 'Low',
    permissions: 'System Access Permissions',
    permDashboard: 'Dashboard',
    permActivities: 'Activities',
    permLive: 'Live',
    permVideo: 'Video Library',
    permReports: 'Reports',
    permUsers: 'Users',
    save: 'Save',
    cancel: 'Cancel',
    backToMain: 'Back to Main',
    delete: 'Delete User',
    deleteConfirmTitle: 'Confirm Delete',
    deleteConfirmMessage: 'Are you sure you want to delete this user? This action cannot be undone.',
    confirmDelete: 'Confirm Delete',
  },
};