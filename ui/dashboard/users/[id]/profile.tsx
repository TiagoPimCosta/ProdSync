import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getUserById } from "@/src/lib/users";
import React from "react";
import SubCard from "./subCard";

interface userResponse {
  id: number;
  idNumber: number;
  name: string;
  role: string;
  username: string;
  password: string;
  createdAt: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  isActive: boolean;
  admission: Date;
}

interface ProfileProps {
  id: number;
}

const Profile = async ({ id }: ProfileProps) => {
  const user: userResponse | null = await getUserById(id);

  if (!user) return <div>User Not Found</div>;

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="flex flex-1 gap-4">
          <CardTitle>
            {user.idNumber}. {user.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-6">
        <div className="flex md:flex-row flex-col w-full">
          <div className="flex-1">Admissão: {new Date(user.admission).toLocaleDateString()}</div>
          <div className="flex-1">Estado: {user.isActive ? "Activo" : "Inativo"}</div>
        </div>
        <div className="flex md:flex-row flex-col w-full gap-4">
          <SubCard
            title="Identificação"
            content={[
              { key: "CC", value: user.cc },
              { key: "NIF", value: user.nif },
            ]}
          />
          <SubCard
            title="Contactos"
            content={[
              { key: "Telemóvel", value: user.phone },
              { key: "Email", value: user.email },
            ]}
          />
          <SubCard
            title="Credenciais"
            content={[
              { key: "Username", value: user.username },
              { key: "Password", value: user.password },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default Profile;
