import { PositionModel } from "../../domain/models/position";

export interface CreatePositionServiceDTO extends Partial<Omit<PositionModel, 'id' | 'createdAt' | 'updatedAt'>> {
  name: string;
}

export interface UpdatePositionServiceDTO extends Partial<Omit<PositionModel, 'id' | 'createdAt' | 'updatedAt'>> {
  positionId: number;
}
