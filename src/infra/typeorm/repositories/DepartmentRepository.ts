import { getRepository } from 'typeorm';
import { Department } from '../entities/Department';

class DepartmentRepository {
  static async create(departmentDTO: any): Promise<Department> {
    const result = await getRepository(Department).save(departmentDTO);

    return result;
  }

  static async findAll(): Promise<Department[]> {
    const repository = getRepository(Department);

    const result = await repository.find();

    return result;
  }

  static async findById(departmentId: number): Promise<Department> {
    const repository = getRepository(Department);

    const result = await repository.findOne({ where: { id: departmentId } });

    return result;
  }  
  
  static async findAllWithCostCenterId(costCenterId: number): Promise<Department[]> {
    const repository = getRepository(Department);

    const result = await repository.find({ where: { costCenterId } });

    return result;
  }

  static async updateById(departmentId: number, attributes: any): Promise<Department> {
    const repository = getRepository(Department);

    const result = await repository.update({ id: departmentId }, { ...attributes }).then(async () => {
      return repository.findOne({ where: { id: departmentId } });
    })

    return result;
  }

  static async deleteById(departmentId: number): Promise<void> {
    const repository = getRepository(Department);

    await repository.delete({ id: departmentId });
  }

}

export { DepartmentRepository };