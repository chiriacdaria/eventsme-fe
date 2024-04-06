export type UserType = {
  id: number;
  email: string;
  fullName: string;
  password?: string;
  repeatPassword?: string;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: string;
};