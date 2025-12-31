import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SIMRecord, Employee } from '@/types';

const formSchema = z.object({
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
  dataAllowance: z.coerce.number().min(1, 'Data allowance must be at least 1 GB'),
  smsAllowance: z.coerce.number().min(1, 'SMS allowance must be at least 1'),
  voiceMinutes: z.coerce.number().min(1, 'Voice minutes must be at least 1'),
  dataUsed: z.coerce.number().min(0, 'Data used cannot be negative'),
  smsUsed: z.coerce.number().min(0, 'SMS used cannot be negative'),
  voiceUsed: z.coerce.number().min(0, 'Voice used cannot be negative'),
  ownerId: z.string().min(1, 'Please select an owner'),
});

type FormValues = z.infer<typeof formSchema>;

interface SIMFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SIMRecord, 'id' | 'createdAt' | 'updatedAt' | 'ownerName' | 'region'>) => void;
  initialData?: SIMRecord;
  employees: Employee[];
}

export function SIMForm({ open, onClose, onSubmit, initialData, employees }: SIMFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: initialData?.mobileNumber || '',
      dataAllowance: initialData?.dataAllowance || 10,
      smsAllowance: initialData?.smsAllowance || 100,
      voiceMinutes: initialData?.voiceMinutes || 100,
      dataUsed: initialData?.dataUsed || 0,
      smsUsed: initialData?.smsUsed || 0,
      voiceUsed: initialData?.voiceUsed || 0,
      ownerId: initialData?.ownerId || '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      mobileNumber: values.mobileNumber,
      dataAllowance: values.dataAllowance,
      smsAllowance: values.smsAllowance,
      voiceMinutes: values.voiceMinutes,
      dataUsed: values.dataUsed,
      smsUsed: values.smsUsed,
      voiceUsed: values.voiceUsed,
      ownerId: values.ownerId,
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit SIM Record' : 'Add New SIM'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Employee</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.firstName} {employee.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">Plan Allowances</h4>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dataAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data (GB)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="smsAllowance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMS</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voiceMinutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice (mins)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">Actual Usage</h4>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dataUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Used (GB)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="smsUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMS Used</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voiceUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice Used (mins)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? 'Update' : 'Add'} SIM
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
