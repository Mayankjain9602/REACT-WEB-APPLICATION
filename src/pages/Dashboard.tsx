import { useMemo } from 'react';
import { Users, Smartphone, TrendingUp, MapPin } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RegionChart } from '@/components/dashboard/RegionChart';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { mockEmployees, mockSIMs, calculateDashboardStats } from '@/data/mockData';

export default function Dashboard() {
  const stats = useMemo(() => calculateDashboardStats(mockEmployees, mockSIMs), []);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of SIM and employee records
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            description="Active employees"
          />
          <StatCard
            title="Total SIMs"
            value={stats.totalSIMs}
            icon={Smartphone}
            description="Allocated SIM cards"
          />
          <StatCard
            title="Regions"
            value={stats.employeesByRegion.length}
            icon={MapPin}
            description="Active regions"
          />
          <StatCard
            title="Avg per Region"
            value={Math.round(stats.totalEmployees / stats.employeesByRegion.length)}
            icon={TrendingUp}
            description="Employees per region"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionChart
            title="Employees by Region"
            data={stats.employeesByRegion}
            color="hsl(var(--chart-1))"
          />
          <RegionChart
            title="SIMs by Region"
            data={stats.simsByRegion}
            color="hsl(var(--chart-2))"
          />
        </div>

        {/* Trend Chart */}
        <TrendChart
          title="Addition Trends (Last 7 Days)"
          employeeData={stats.employeeTrend}
          simData={stats.simTrend}
        />
      </div>
    </MainLayout>
  );
}
