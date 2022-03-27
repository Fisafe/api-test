import { getRepository } from 'typeorm';
import { CostCenter } from '../entities/CostCenter';

class CostCenterRepository {
  static async create(costCenterDTO: any): Promise<CostCenter> {
    const result = await getRepository(CostCenter).save(costCenterDTO);

    return result;
  }

  static async findAll(): Promise<CostCenter[]> {
    const repository = getRepository(CostCenter);

    const result = await repository.find();

    return result;
  }

  static async findById(costCenterId: number): Promise<CostCenter> {
    const repository = getRepository(CostCenter);

    const result = await repository.findOne({ where: { id: costCenterId } });

    return result;
  }

  static async updateById(costCenterId: number, attributes: any): Promise<CostCenter> {
    const repository = getRepository(CostCenter);

    const result = await repository.update({ id: costCenterId }, { ...attributes }).then(async () => {
      return repository.findOne({ where: { id: costCenterId } });
    })

    return result;
  }

  static async deleteById(costCenterId: number): Promise<void> {
    const repository = getRepository(CostCenter);

    await repository.delete({ id: costCenterId });
  }

}

export { CostCenterRepository };