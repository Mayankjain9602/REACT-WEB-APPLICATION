import { useState } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable, Column } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { SIMForm } from '@/components/forms/SIMForm';
import { Progress } from '@/components/ui/progress';
import { mockSIMs, mockEmployees } from '@/data/mockData';
import { SIMRecord } from '@/types';
import { toast } from '@/hooks/use-toast';

export default function SIMManagement() {
  const [sims, setSims] = useState(mockSIMs);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSIM = (data: Omit<SIMRecord, 'id' | 'createdAt' | 'updatedAt' | 'ownerName' | 'region'>) => {
    const employee = mockEmployees.find(e => e.id === data.ownerId);
    const newSIM: SIMRecord = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      ownerName: employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown',
      region: employee?.region || 'Unknown',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSims([newSIM, ...sims]);
    toast({
      title: 'SIM Added',
      description: `SIM ${data.mobileNumber} has been added successfully.`,
    });
  };

  const columns: Column<SIMRecord>[] = [
    { key: 'mobileNumber', label: 'Mobile Number', sortable: true },
    { key: 'ownerName', label: 'Owner', sortable: true },
    {
      key: 'dataUsage',
      label: 'Data Usage',
      render: (item) => (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{item.dataUsed} GB</span>
            <span className="text-muted-foreground">/ {item.dataAllowance} GB</span>
          </div>
          <Progress 
            value={(item.dataUsed / item.dataAllowance) * 100} 
            className="h-2"
          />
        </div>
      ),
    },
    {
      key: 'smsUsage',
      label: 'SMS Usage',
      render: (item) => (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{item.smsUsed}</span>
            <span className="text-muted-foreground">/ {item.smsAllowance}</span>
          </div>
          <Progress 
            value={(item.smsUsed / item.smsAllowance) * 100} 
            className="h-2"
          />
        </div>
      ),
    },
    {
      key: 'voiceUsage',
      label: 'Voice Usage',
      render: (item) => (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{item.voiceUsed} min</span>
            <span className="text-muted-foreground">/ {item.voiceMinutes} min</span>
          </div>
          <Progress 
            value={(item.voiceUsed / item.voiceMinutes) * 100} 
            className="h-2"
          />
        </div>
      ),
    },
    { key: 'region', label: 'Region', sortable: true },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SIM Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage organizational SIM cards and their usage
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add SIM
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          data={sims}
          columns={columns}
          pageSize={10}
          searchPlaceholder="Search by mobile number or owner..."
          searchKeys={['mobileNumber', 'ownerName', 'region']}
        />

        {/* Form Dialog */}
        <SIMForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddSIM}
          employees={mockEmployees}
        />
      </div>
    </MainLayout>
  );
}
