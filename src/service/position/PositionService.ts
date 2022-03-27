import { CreatePositionServiceDTO, UpdatePositionServiceDTO } from './positionService.protocols';
import { PositionModel } from '../../domain/models/position';
import { PositionRepository } from '../../infra/typeorm/repositories/PositionRepository';

class PositionService {
  static async create(createPositionDTO: CreatePositionServiceDTO): Promise<PositionModel> {
    const positionCreated = await PositionRepository.create({...createPositionDTO}).catch(() => {
      throw new Error('Não foi possivel criar cargo');
    });
    
    return positionCreated;
  }

  static async findAll(): Promise<PositionModel[]> {
    const positions = await PositionRepository.findAll().catch(() => {
      throw new Error('Não foi possivel encontrar cargos');
    })

    return positions;
  }

  static async findById(positionId: number): Promise<PositionModel> {
    const position = await PositionRepository.findById(positionId).catch(() => {
      throw new Error('Não foi possivel encontrar cargo');
    })

    if(!position) throw new Error('Cargo não encontrado');

    return position;
  }

  static async updateById(updatePositionServiceDTO: UpdatePositionServiceDTO): Promise<PositionModel> {
    const { positionId } = updatePositionServiceDTO;
    delete updatePositionServiceDTO.positionId;

    await this.findById(positionId);

    const positionUpdated = await PositionRepository.updateById(
      positionId, 
      {...updatePositionServiceDTO}
    ).catch(() => {
      throw new Error('Não foi possivel atualizar cargo');
    });
    
    return positionUpdated;
  }

  static async deleteById(positionId: number): Promise<void> {
    await this.findById(positionId);
    await PositionRepository.deleteById(positionId).catch(() => {
      throw new Error('Não foi possivel deletar cargo');
    })
  }
}

export { PositionService };
