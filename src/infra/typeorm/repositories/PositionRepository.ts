import { getRepository } from 'typeorm';
import { Position } from '../entities/Position';

class PositionRepository {
  static async create(positionDTO: any): Promise<Position> {
    const result = await getRepository(Position).save(positionDTO);

    return result;
  }

  static async findAll(): Promise<Position[]> {
    const repository = getRepository(Position);

    const result = await repository.find();

    return result;
  }

  static async findById(positionId: number): Promise<Position> {
    const repository = getRepository(Position);

    const result = await repository.findOne({ where: { id: positionId } });

    return result;
  }

  static async updateById(positionId: number, attributes: any): Promise<Position> {
    const repository = getRepository(Position);

    const result = await repository.update({ id: positionId }, { ...attributes }).then(async () => {
      return repository.findOne({ where: { id: positionId } });
    })

    return result;
  }

  static async deleteById(positionId: number): Promise<void> {
    const repository = getRepository(Position);

    await repository.delete({ id: positionId });
  }

}

export { PositionRepository };