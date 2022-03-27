import { UserModel } from "../../domain/models/user";

export interface CreateUserServiceDTO extends Partial<Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>> {
  userName: string;
  password: string;
}

export interface UpdateUserServiceDTO extends Partial<Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>> {
  userId: string;
}

export interface FilterDTO {
  positionId: number,
  departmentId: number
}
