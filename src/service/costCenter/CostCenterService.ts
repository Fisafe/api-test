import { CreateCostCenterServiceDTO, UpdateCostCenterServiceDTO } from './costCenterService.protocols';
import { CostCenterModel } from '../../domain/models/costCenter';
import { CostCenterRepository } from '../../infra/typeorm/repositories/CostCenterRepository';

class CostCenterService {
  static async create(createCostCenterDTO: CreateCostCenterServiceDTO): Promise<CostCenterModel> {
    const costCenterCreated = await CostCenterRepository.create({...createCostCenterDTO}).catch(() => {
      throw new Error('Não foi possivel criar centro de custo');
    });
    
    return costCenterCreated;
  }

  static async findAll(): Promise<CostCenterModel[]> {
    const costCenters = await CostCenterRepository.findAll().catch(() => {
      throw new Error('Não foi possivel encontrar centros de custo');
    })

    return costCenters;
  }

  static async findById(costCenterId: number): Promise<CostCenterModel> {
    const costCenter = await CostCenterRepository.findById(costCenterId).catch(() => {
      throw new Error('Não foi possivel encontrar centro de custo');
    })

    if(!costCenter) throw new Error('Centro de custo não encontrado');

    return costCenter;
  }

  static async updateById(updateCostCenterServiceDTO: UpdateCostCenterServiceDTO): Promise<CostCenterModel> {
    const { costCenterId } = updateCostCenterServiceDTO;
    delete updateCostCenterServiceDTO.costCenterId;

    await this.findById(costCenterId);

    const costCenterUpdated = await CostCenterRepository.updateById(
      costCenterId, 
      {...updateCostCenterServiceDTO}
    ).catch(() => {
      throw new Error('Não foi possivel atualizar centro de custo');
    });
    
    return costCenterUpdated;
  }

  static async deleteById(costCenterId: number): Promise<void> {
    await this.findById(costCenterId);
    await CostCenterRepository.deleteById(costCenterId).catch(() => {
      throw new Error('Não foi possivel deletar centro de custo');
    })
  }
}

export { CostCenterService };
