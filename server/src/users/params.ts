export type CreateUserParams = {
  idNumber: number;
  name: string;
  role: string;
  username: string;
  password: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  isActive: boolean;
  admission: Date;
};

export type UpdateUserParams = {
  idNumber: number;
  name: string;
  role: string;
  username: string;
  password: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  isActive: boolean;
  admission: Date;
};
