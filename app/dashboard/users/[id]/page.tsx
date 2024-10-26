import Profile from "@/ui/dashboard/users/[id]/profile";
import React from "react";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return <Profile id={parseInt(id)} />;
};

export default UserProfile;
