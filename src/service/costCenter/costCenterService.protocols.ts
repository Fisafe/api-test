import { CostCenterModel } from "../../domain/models/costCenter";
import { CostCenterCategory } from "../../domain/types/costCenterCategory";
import { CostCenterType } from "../../domain/types/costCenterType";

export interface CreateCostCenterServiceDTO extends Partial<Omit<CostCenterModel, 'id' | 'createdAt' | 'updatedAt'>> {
  category: CostCenterCategory;
  type: CostCenterType;
}

export interface UpdateCostCenterServiceDTO extends Partial<Omit<CostCenterModel, 'id' | 'createdAt' | 'updatedAt'>> {
  costCenterId: number;
}
