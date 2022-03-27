import { CostCenterCategory } from '../types/costCenterCategory';
import { CostCenterType } from '../types/costCenterType';

export interface CostCenterModel {
  id: number;
  name: string;
  category: CostCenterCategory;
  type: CostCenterType;  
  createdAt: Date;
  updatedAt: Date;
}