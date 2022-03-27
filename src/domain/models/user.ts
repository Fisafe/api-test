export interface UserModel {
  id: string;
  userName: string;
  password: string;
  departmentId: number;
  positionId: number;
  createdAt: Date;
  updatedAt: Date;
}