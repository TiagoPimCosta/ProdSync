import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UserObj } from "@/src/services/users/queries";
import { CalendarIcon, MailIcon, Pencil, PhoneIcon } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import dayjs from "dayjs";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

interface UserProfileProps {
  user?: UserObj;
}

const UserProfile = ({ user }: UserProfileProps) => {
  if (!user) return <div>User Not Found</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">
              <span>{user.idNumber}.</span>
              <span>{user.name}</span>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" className="h-6 gap-1" asChild>
                <Link href={`/dashboard/users/${user?.id}/edit`}>
                  <Pencil className="w-4 h-4" /> Editar
                </Link>
              </Button>
              <Badge variant={user.status ? "success" : "destructive"}>
                {user.status ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Role:</span>
                  <span>{user.role}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">CC:</span>
                  <span>{user.cc}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">NIF:</span>
                  <span>{user.nif}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-semibold">Additional Details</h3>
                <div className="flex items-center gap-2 mt-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span>Admission Date: {dayjs(user.admission).format("MMMM D, YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default UserProfile;
