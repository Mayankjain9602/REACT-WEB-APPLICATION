import { useState } from 'react';
import { Plus, Mail, Phone } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable, Column } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { EmployeeForm } from '@/components/forms/EmployeeForm';
import { Badge } from '@/components/ui/badge';
import { mockEmployees } from '@/data/mockData';
import { Employee } from '@/types';
import { toast } from '@/hooks/use-toast';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEmployee = (data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEmployee: Employee = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEmployees([newEmployee, ...employees]);
    toast({
      title: 'Employee Added',
      description: `${data.firstName} ${data.lastName} has been added successfully.`,
    });
  };

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (item) => (
        <div className="font-medium text-foreground">
          {item.firstName} {item.lastName}
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="text-sm">{item.email}</span>
        </div>
      ),
    },
    {
      key: 'phoneNumber',
      label: 'Phone',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span className="text-sm font-mono">{item.phoneNumber}</span>
        </div>
      ),
    },
    {
      key: 'region',
      label: 'Region',
      sortable: true,
      render: (item) => (
        <Badge variant="secondary">{item.region}</Badge>
      ),
    },
    {
      key: 'address',
      label: 'Address',
      render: (item) => (
        <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
          {item.address}
        </span>
      ),
    },
    {
      key: 'emergencyContact',
      label: 'Emergency Contact',
      render: (item) => (
        <span className="text-sm font-mono text-muted-foreground">
          {item.emergencyContact}
        </span>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employee Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage employee records and their SIM associations
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          data={employees}
          columns={columns}
          pageSize={10}
          searchPlaceholder="Search by name, email, or phone..."
          searchKeys={['firstName', 'lastName', 'email', 'phoneNumber', 'region']}
        />

        {/* Form Dialog */}
        <EmployeeForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddEmployee}
        />
      </div>
    </MainLayout>
  );
}
