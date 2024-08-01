import React from "react";

const EditUser = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <div>Edit User {parseInt(id)}</div>;
};

export default EditUser;
