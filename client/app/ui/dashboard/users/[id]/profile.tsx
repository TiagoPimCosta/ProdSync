import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/lib/users";
import React from "react";
import SubCard from "./subCard";

interface userResponse {
  id: number;
  name: string;
  role: string;
  username: string;
  password: string;
  createdAt: string;
}

interface ProfileProps {
  id: number;
}

const Profile = async ({ id }: ProfileProps) => {
  const user: userResponse | null = await getUserById(id);

  if (!user) return <div>User Nor Found</div>;

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="flex flex-1 gap-4">
          <CardTitle>
            {id}. {user.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-6">
        <div className="flex md:flex-row flex-col w-full">
          <div className="flex-1">Admissão: 12/07/2023</div>
          <div className="flex-1">Função: Costureira</div>
        </div>
        <div className="flex md:flex-row flex-col w-full gap-4">
          <SubCard
            title="Identificação"
            content={[
              { key: "CC", value: "123456789" },
              { key: "NIF", value: "123456789" },
            ]}
          />
          <SubCard
            title="Contactos"
            content={[
              { key: "Telemóvel", value: "123456789" },
              { key: "Email", value: "tiago@gmail.com" },
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
