export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  emergencyContact: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SIMRecord {
  id: string;
  mobileNumber: string;
  dataAllowance: number; // GB
  smsAllowance: number;
  voiceMinutes: number;
  dataUsed: number; // GB
  smsUsed: number;
  voiceUsed: number;
  ownerId: string;
  ownerName: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalEmployees: number;
  totalSIMs: number;
  employeesByRegion: { region: string; count: number }[];
  simsByRegion: { region: string; count: number }[];
  employeeTrend: { date: string; count: number }[];
  simTrend: { date: string; count: number }[];
}
