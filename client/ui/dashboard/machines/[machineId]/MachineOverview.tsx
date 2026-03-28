import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { Pencil, User, UserCog } from 'lucide-react';
import { Badge } from '@/src/components/ui/badge';
import { MachineObj } from '@/src/services/machines/queries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/Select/select';
import { useState } from 'react';
import { useGetUsersOptions } from '@/src/services/options/queries';
import { useUpdateMachineUser } from '@/src/services/machines/mutations';

interface MachineOverviewProps {
  machine?: MachineObj;
}

const MachineOverview = ({ machine }: MachineOverviewProps) => {
  const [selectedOperator, setSelectedOperator] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: usersOptions } = useGetUsersOptions();
  const { mutate: updateMachineUser, isPending } = useUpdateMachineUser(machine?.id ?? 0);

  if (!machine) return <div>line Not Found</div>;

  const handleChangeOperator = () => {
    updateMachineUser(selectedOperator, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setSelectedOperator('');
      },
    });
  };

  const opertator = machine.user?.name || 'Not assigned';

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">
              <span>{machine.name}</span>
            </CardTitle>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Operator
                  </p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{opertator}</span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <UserCog className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Operator</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-2">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Current:{' '}
                              <span className="font-medium text-foreground">
                                {opertator}
                              </span>
                            </p>
                          </div>
                          <Select
                            value={selectedOperator}
                            onValueChange={setSelectedOperator}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select new operator" />
                            </SelectTrigger>
                            <SelectContent>
                              {usersOptions
                                ?.filter((op) => op.label !== opertator)
                                .map((op) => (
                                  <SelectItem key={op.value} value={op.value}>
                                    {op.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={handleChangeOperator}
                            disabled={!selectedOperator || isPending}
                            className="w-full"
                          >
                            Assign Operator
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="h-6 gap-1" asChild>
                  <Link href={`/dashboard/machines/${machine?.id}/edit`}>
                    <Pencil className="w-4 h-4" /> Editar
                  </Link>
                </Button>
                <Badge variant={machine.status ? 'success' : 'destructive'}>
                  {machine.status ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
export default MachineOverview;
