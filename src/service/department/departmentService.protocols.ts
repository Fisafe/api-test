import { DepartmentModel } from "../../domain/models/department";

export interface CreateDepartmentServiceDTO extends Partial<Omit<DepartmentModel, 'id' | 'createdAt' | 'updatedAt'>> {
  name: string;
  costCenterId: number;
}

export interface UpdateDepartmentServiceDTO extends Partial<Omit<DepartmentModel, 'id' | 'createdAt' | 'updatedAt'>> {
  departmentId: number;
}

export interface FilterDTO {
  costCenterId: number;
}
