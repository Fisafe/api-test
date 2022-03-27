import { CreateUserServiceDTO, UpdateUserServiceDTO, FilterDTO } from './userService.protocols';
import { UserModel } from '../../domain/models/user';
import { UserRepository } from '../../infra/typeorm/repositories/UserRepository';
import { hashSync } from 'bcryptjs';
import { PositionService } from '../position/PositionService';
import { DepartmentService } from '../department/DepartmentService';

class UserService {
  static async create(createUserDTO: CreateUserServiceDTO): Promise<UserModel> {
    const { userName, password, positionId, departmentId } = createUserDTO;
    const hashPassword = this.makeHashPassword(password);
    
    createUserDTO.password = hashPassword;

    const userExists = await this.findByUserName(userName);
    if (userExists) throw new Error('Usuário com este username já existe');
    if (positionId) await PositionService.findById(positionId);
    if (departmentId) await DepartmentService.findById(departmentId);

    const userCreated = await UserRepository.create({...createUserDTO}).catch(() => {
      throw new Error('Não foi possivel criar usuário');
    });
    
    return userCreated;
  }

  static async findAll(): Promise<UserModel[]> {
    const users = await UserRepository.findAll().catch(() => {
      throw new Error('Não foi possivel encontrar usuários');
    });

    return users;
  }

  static async findAllWithFilter(filterDTO: FilterDTO): Promise<UserModel[]> {
    const { departmentId, positionId } = filterDTO;

    let usersFound;

    if(departmentId) {
      usersFound = await UserRepository.findAllWithDepartmentId(departmentId).catch(() => {
        throw new Error('Não foi possivel encontrar usuários por departamento');
      })
    }

    if(positionId) {
      usersFound = await UserRepository.findAllWithPositionId(positionId).catch(() => {
        throw new Error('Não foi possivel encontrar usuários por cargo');
      })
    }

    return usersFound;
  }

  static async findById(userId: string): Promise<UserModel> {
    const user = await UserRepository.findById(userId).catch(() => {
      throw new Error('Não foi possivel encontrar usuário');
    });

    if(!user) throw new Error('Usuário não encontrado');

    return user;
  }

  static async findByUserName(userName: string): Promise<UserModel> {
    const user = await UserRepository.findByUserName(userName).catch(() => {
      throw new Error('Não foi possivel encontrar usuário');
    });

    return user;
  }

  static async updateById(updateUserServiceDTO: UpdateUserServiceDTO): Promise<UserModel> {
    const { userId, positionId, departmentId } = updateUserServiceDTO;
    delete updateUserServiceDTO.password;
    delete updateUserServiceDTO.userId;
    delete updateUserServiceDTO.userName;

    await this.findById(userId);

    if (positionId) await PositionService.findById(positionId);
    if (departmentId) await DepartmentService.findById(departmentId);

    const userUpdated = await UserRepository.updateById(userId, {...updateUserServiceDTO}).catch(() => {
      throw new Error('Não foi possivel atualizar usuário');
    });
    
    return userUpdated;
  }

  static async deleteById(userId: string): Promise<void> {
    await this.findById(userId);
    await UserRepository.deleteById(userId).catch(() => {
      throw new Error('Não foi possivel deletar usuário');
    });
  }

  private static makeHashPassword(password: string): string {
    return hashSync(password, 8);
  }
}

export { UserService };
