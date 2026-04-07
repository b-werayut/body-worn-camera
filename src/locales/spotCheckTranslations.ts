export type SpotCheckLanguage = 'th' | 'en';

export interface SpotCheckTranslationData {
  [key: string]: string;
  title: string;
  listTitle: string;
  filterDate: string;
  filterOfficer: string;
  filterStatus: string;
  filterReportType: string;
  searchPlaceholder: string;
  search: string;
  reset: string;
  tableNo: string;
  tableCode: string;
  tableTitle: string;
  tableStatus: string;
  tableDetails: string;
  tableOfficer: string;
  tableDateTime: string;
  tableActions: string;
  statusWaiting: string;
  statusAccepted: string;
  statusInProgress: string;
  statusCompleted: string;
  statusCancelled: string;
  allOfficers: string;
  allStatus: string;
  allReportTypes: string;
  reportTypeDaily: string;
  reportTypeIncident: string;
  reportTypeInspection: string;
  reportTypeTraining: string;
  date: string;
  time: string;
  location: string;
  responsible: string;
  camera: string;
  priority: string;
  duration: string;
  view: string;
  edit: string;
  delete: string;
  noData: string;
  viewDetails: string;
  editRecord: string;
  deleteConfirm: string;
  deleteMessage: string;
  cancel: string;
  confirm: string;
  save: string;
  close: string;
  acceptJob: string;
  startJob: string;
  completeJob: string;
  rejectJob: string;
  backToMain: string;
  acceptJobConfirm: string;
  startJobConfirm: string;
  completeJobConfirm: string;
  rejectJobConfirm: string;
  acceptJobMessage: string;
  startJobMessage: string;
  completeJobMessage: string;
  rejectJobMessage: string;
  showingAll: string;
  itemsTotal: string;
  addSpotCheck: string;
  startDate: string;
  endDate: string;
  addNewSpotCheck: string;
  editSpotCheck: string;
  fillRequiredInfo: string;
  editRequiredInfo: string;
  taskCode: string;
  taskPriority: string;
  taskTitleDesc: string;
  enterTaskDesc: string;
  locationName: string;
  fullAddress: string;
  gpsCoordinates: string;
  selectOfficer: string;
  durationHours: string;
  additionalNotes: string;
  enterAdditionalNotes: string;
  copyCoordinates: string;
  copied: string;
  recordLabel: string;
  inspectionLabel: string;
}

export const spotCheckTranslations: Record<SpotCheckLanguage, SpotCheckTranslationData> = {
  th: { 
    title: 'ขออกปฏิบัติงาน (Spot Check)', 
    listTitle: 'รายการออกปฏิบัติงาน', 
    filterDate: 'วันที่', 
    filterOfficer: 'เจ้าหน้าที่', 
    filterStatus: 'สถานะ', 
    filterReportType: 'ประเภทรายงาน', 
    searchPlaceholder: 'ค้นหา รหัส, สถานที่, เจ้าหน้าที่...', 
    search: 'ค้นหา', 
    reset: 'รีเซ็ต', 
    tableNo: 'ลำดับ', 
    tableCode: 'รหัส', 
    tableTitle: 'หัวข้อ', 
    tableStatus: 'สถานะ', 
    tableDetails: 'รายละเอียด', 
    tableOfficer: 'เจ้าหน้าที่', 
    tableDateTime: 'วันที่-เวลา', 
    tableActions: 'เครื่องมือ', 
    statusWaiting: 'รอรับงาน', 
    statusAccepted: 'รับงานแล้ว', 
    statusInProgress: 'กำลังปฏิบัติงาน', 
    statusCompleted: 'เสร็จสิ้น', 
    statusCancelled: 'ยกเลิก', 
    allOfficers: 'ทั้งหมด', 
    allStatus: 'ทั้งหมด', 
    allReportTypes: 'ทั้งหมด', 
    reportTypeDaily: 'รายงานประจำวัน', 
    reportTypeIncident: 'รายงานเหตุการณ์พิเศษ', 
    reportTypeInspection: 'รายงานการตรวจสอบ', 
    reportTypeTraining: 'รายงานการฝึกอบรม', 
    date: 'วันที่', 
    time: 'เวลา', 
    location: 'สถานที่', 
    responsible: 'ผู้รับผิดชอบ', 
    camera: 'กล้อง', 
    priority: 'ลำดับความสำคัญ', 
    duration: 'ระยะเวลา', 
    view: 'ดู', 
    edit: 'แก้ไข', 
    delete: 'ลบ', 
    noData: 'ไม่พบข้อมูล', 
    viewDetails: 'รายละเอียด', 
    editRecord: 'แก้ไขรายการ', 
    deleteConfirm: 'ยืนยันการลบ', 
    deleteMessage: 'คุณแน่ใจหรือไม่ที่จะลบรายการนี้?', 
    cancel: 'ยกเลิก', 
    confirm: 'ยืนยัน', 
    save: 'บันทึก', 
    close: 'ปิด', 
    acceptJob: 'รับงาน', 
    startJob: 'เริ่มปฏิบัติงาน', 
    completeJob: 'สิ้นสุดปฏิบัติงาน', 
    rejectJob: 'ปฏิเสธ', 
    backToMain: 'กลับหน้าหลัก', 
    acceptJobConfirm: 'ยืนยันการรับงาน', 
    startJobConfirm: 'ยืนยันการเริ่มปฏิบัติงาน', 
    completeJobConfirm: 'ยืนยันการสิ้นสุดปฏิบัติงาน', 
    rejectJobConfirm: 'ยืนยันการปฏิเสธงาน', 
    acceptJobMessage: 'คุณต้องการรับงานนี้หรือไม่?', 
    startJobMessage: 'คุณต้องการเริ่มปฏิบัติงานนี้หรือไม่?', 
    completeJobMessage: 'คุณต้องการยืนยันว่างานนี้เสร็จสิ้นแล้วหรือไม่?', 
    rejectJobMessage: 'คุณต้องการปฏิเสธงานนี้หรือไม่?',
    showingAll: 'แสดงข้อมูลทั้งหมด',
    itemsTotal: 'รายการ',
    addSpotCheck: 'เพิ่มรายการออกปฏิบัติงาน',
    startDate: 'วันที่เริ่มต้น',
    endDate: 'วันที่สิ้นสุด',
    addNewSpotCheck: 'เพิ่มรายการออกปฏิบัติงานใหม่',
    editSpotCheck: 'แก้ไขรายการ:',
    fillRequiredInfo: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    editRequiredInfo: 'กรุณาแก้ไขข้อมูลที่ต้องการ',
    taskCode: 'รหัสงาน',
    taskPriority: 'ลำดับความสำคัญ',
    taskTitleDesc: 'หัวข้อ/รายละเอียดงาน',
    enterTaskDesc: 'ระบุรายละเอียดงาน...',
    locationName: 'ชื่อสถานที่...',
    fullAddress: 'ที่อยู่เต็ม...',
    gpsCoordinates: 'พิกัด GPS (Latitude, Longitude)',
    selectOfficer: 'เลือกเจ้าหน้าที่',
    durationHours: 'ระยะเวลา (ชั่วโมง)',
    additionalNotes: 'หมายเหตุเพิ่มเติม',
    enterAdditionalNotes: 'ระบุรายละเอียดเพิ่มเติม (ถ้ามี)',
    copyCoordinates: 'คัดลอกพิกัด',
    copied: 'คัดลอกแล้ว!',
    recordLabel: 'รายการ:',
    inspectionLabel: 'ตรวจสอบ:',
  },
  en: { 
    title: 'Spot Check Request', 
    listTitle: 'Spot Check List', 
    filterDate: 'Date', 
    filterOfficer: 'Officer', 
    filterStatus: 'Status', 
    filterReportType: 'Report Type', 
    searchPlaceholder: 'Search code, location, officer...', 
    search: 'Search', 
    reset: 'Reset', 
    tableNo: 'No.', 
    tableCode: 'Code', 
    tableTitle: 'Title', 
    tableStatus: 'Status', 
    tableDetails: 'Details', 
    tableOfficer: 'Officer', 
    tableDateTime: 'Date-Time', 
    tableActions: 'Actions', 
    statusWaiting: 'Waiting', 
    statusAccepted: 'Accepted', 
    statusInProgress: 'In Progress', 
    statusCompleted: 'Completed', 
    statusCancelled: 'Cancelled', 
    allOfficers: 'All', 
    allStatus: 'All', 
    allReportTypes: 'All', 
    reportTypeDaily: 'Daily Report', 
    reportTypeIncident: 'Incident Report', 
    reportTypeInspection: 'Inspection Report', 
    reportTypeTraining: 'Training Report', 
    date: 'Date', 
    time: 'Time', 
    location: 'Location', 
    responsible: 'Responsible', 
    camera: 'Camera', 
    priority: 'Priority', 
    duration: 'Duration', 
    view: 'View', 
    edit: 'Edit', 
    delete: 'Delete', 
    noData: 'No data found', 
    viewDetails: 'View Details', 
    editRecord: 'Edit Record', 
    deleteConfirm: 'Confirm Delete', 
    deleteMessage: 'Are you sure you want to delete this record?', 
    cancel: 'Cancel', 
    confirm: 'Confirm', 
    save: 'Save', 
    close: 'Close', 
    acceptJob: 'Accept Job', 
    startJob: 'Start Job', 
    completeJob: 'Complete Job', 
    rejectJob: 'Reject', 
    backToMain: 'Back to Main', 
    acceptJobConfirm: 'Confirm Accept Job', 
    startJobConfirm: 'Confirm Start Job', 
    completeJobConfirm: 'Confirm Complete Job', 
    rejectJobConfirm: 'Confirm Reject Job', 
    acceptJobMessage: 'Do you want to accept this job?', 
    startJobMessage: 'Do you want to start this job?', 
    completeJobMessage: 'Do you want to confirm that this job is completed?', 
    rejectJobMessage: 'Do you want to reject this job?',
    showingAll: 'Showing',
    itemsTotal: 'items',
    addSpotCheck: 'Add Spot Check',
    startDate: 'Start Date',
    endDate: 'End Date',
    addNewSpotCheck: 'Add New Spot Check',
    editSpotCheck: 'Edit Record:',
    fillRequiredInfo: 'Please fill in all required information',
    editRequiredInfo: 'Please edit the information as needed',
    taskCode: 'Code',
    taskPriority: 'Priority',
    taskTitleDesc: 'Title/Description',
    enterTaskDesc: 'Enter task description...',
    locationName: 'Location name...',
    fullAddress: 'Full address...',
    gpsCoordinates: 'GPS Coordinates',
    selectOfficer: 'Select officer',
    durationHours: 'Duration (hours)',
    additionalNotes: 'Additional Notes',
    enterAdditionalNotes: 'Enter additional details (optional)',
    copyCoordinates: 'Copy coordinates',
    copied: 'Copied!',
    recordLabel: 'Record:',
    inspectionLabel: 'Inspection:',
  }
};