import { CreateDepartmentServiceDTO, UpdateDepartmentServiceDTO, FilterDTO } from './departmentService.protocols';
import { DepartmentModel } from '../../domain/models/department';
import { DepartmentRepository } from '../../infra/typeorm/repositories/DepartmentRepository';
import { CostCenterService } from '../costCenter/CostCenterService';

class DepartmentService {
  static async create(createDepartmentDTO: CreateDepartmentServiceDTO): Promise<DepartmentModel> {
    const { costCenterId } = createDepartmentDTO;

    await CostCenterService.findById(costCenterId);

    const departmentCreated = await DepartmentRepository.create({...createDepartmentDTO}).catch(() => {
      throw new Error('Não foi possivel criar departamento');
    });
    
    return departmentCreated;
  }

  static async findAll(): Promise<DepartmentModel[]> {
    const departments = await DepartmentRepository.findAll().catch(() => {
      throw new Error('Não foi possivel encontrar departamentos');
    })

    return departments;
  }

  static async findAllWithFilter(filterDTO: FilterDTO): Promise<DepartmentModel[]> {
    const { costCenterId } = filterDTO;

    let departmentsFound;

    if(costCenterId) {
      departmentsFound = await DepartmentRepository.findAllWithCostCenterId(costCenterId).catch(() => {
        throw new Error('Não foi possivel encontrar departamentos por centro de custo');
      })
    }

    return departmentsFound;
  }

  static async findById(departmentId: number): Promise<DepartmentModel> {
    const department = await DepartmentRepository.findById(departmentId).catch(() => {
      throw new Error('Não foi possivel encontrar departamento');
    })

    if(!department) throw new Error('Departamento não encontrado');

    return department;
  }

  static async updateById(updateDepartmentServiceDTO: UpdateDepartmentServiceDTO): Promise<DepartmentModel> {
    const { departmentId, costCenterId } = updateDepartmentServiceDTO;
    delete updateDepartmentServiceDTO.departmentId;

    await this.findById(departmentId);
    if (costCenterId) await CostCenterService.findById(costCenterId);

    const departmentUpdated = await DepartmentRepository.updateById(
      departmentId, 
      {...updateDepartmentServiceDTO}
    ).catch(() => {
      throw new Error('Não foi possivel atualizar departamento');
    });
    
    return departmentUpdated;
  }

  static async deleteById(departmentId: number): Promise<void> {
    await this.findById(departmentId);
    await DepartmentRepository.deleteById(departmentId).catch(() => {
      throw new Error('Não foi possivel deletar departamento');
    })
  }
}

export { DepartmentService };
