import { Employee, SIMRecord } from '@/types';

const regions = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohan', 'Neha', 'Arjun', 'Kavita'];
const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Verma', 'Reddy', 'Joshi', 'Nair', 'Iyer'];

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
}

function generatePhoneNumber(): string {
  return `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
}

// Generate mock employees
export const generateMockEmployees = (count: number): Employee[] => {
  const employees: Employee[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const region = getRandomElement(regions);
    const createdAt = getRandomDate(90);
    
    employees.push({
      id: generateId(),
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
      phoneNumber: generatePhoneNumber(),
      address: `${Math.floor(Math.random() * 999 + 1)}, Street ${Math.floor(Math.random() * 50 + 1)}, ${region}`,
      emergencyContact: generatePhoneNumber(),
      region,
      createdAt,
      updatedAt: createdAt,
    });
  }
  
  return employees;
};

// Generate mock SIM records
export const generateMockSIMs = (employees: Employee[]): SIMRecord[] => {
  return employees.map(employee => {
    const dataAllowance = [5, 10, 15, 20, 30][Math.floor(Math.random() * 5)];
    const smsAllowance = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
    const voiceMinutes = [100, 200, 500, 1000, 2000][Math.floor(Math.random() * 5)];
    
    return {
      id: generateId(),
      mobileNumber: employee.phoneNumber,
      dataAllowance,
      smsAllowance,
      voiceMinutes,
      dataUsed: Math.round(Math.random() * dataAllowance * 10) / 10,
      smsUsed: Math.floor(Math.random() * smsAllowance),
      voiceUsed: Math.floor(Math.random() * voiceMinutes),
      ownerId: employee.id,
      ownerName: `${employee.firstName} ${employee.lastName}`,
      region: employee.region,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  });
};

// Initialize mock data
export const mockEmployees = generateMockEmployees(100);
export const mockSIMs = generateMockSIMs(mockEmployees);

// Calculate dashboard stats
export const calculateDashboardStats = (employees: Employee[], sims: SIMRecord[]) => {
  const employeesByRegion = regions.map(region => ({
    region,
    count: employees.filter(e => e.region === region).length,
  })).filter(r => r.count > 0);

  const simsByRegion = regions.map(region => ({
    region,
    count: sims.filter(s => s.region === region).length,
  })).filter(r => r.count > 0);

  // Generate trend data for last 7 days
  const employeeTrend: { date: string; count: number }[] = [];
  const simTrend: { date: string; count: number }[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    employeeTrend.push({
      date: dateStr,
      count: employees.filter(e => {
        const empDate = new Date(e.createdAt);
        return empDate.toDateString() === date.toDateString();
      }).length + Math.floor(Math.random() * 5),
    });
    
    simTrend.push({
      date: dateStr,
      count: sims.filter(s => {
        const simDate = new Date(s.createdAt);
        return simDate.toDateString() === date.toDateString();
      }).length + Math.floor(Math.random() * 5),
    });
  }

  return {
    totalEmployees: employees.length,
    totalSIMs: sims.length,
    employeesByRegion,
    simsByRegion,
    employeeTrend,
    simTrend,
  };
};
