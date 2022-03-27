import { getRepository } from 'typeorm';
import { User } from '../entities/User';

class UserRepository {
  static async create(userDTO: any): Promise<User> {
    const result = await getRepository(User).save(userDTO);

    return result;
  }

  static async findAll(): Promise<User[]> {
    const repository = getRepository(User);

    const result = await repository.find();

    return result;
  }

  static async findById(userId: string): Promise<User> {
    const repository = getRepository(User);

    const result = await repository.findOne({ where: { id: userId } });

    return result;
  }

  static async findAllWithDepartmentId(departmentId: number): Promise<User[]> {
    const repository = getRepository(User);

    const result = await repository.find({ where: { departmentId } });

    return result;
  }

  static async findAllWithPositionId(positionId: number): Promise<User[]> {
    const repository = getRepository(User);

    const result = await repository.find({ where: { positionId } });

    return result;
  }

  static async updateById(userId: string, attributes: any): Promise<User> {
    const repository = getRepository(User);

    const result = await repository.update({ id: userId }, { ...attributes }).then(async () => {
      return repository.findOne({ where: { id: userId } });
    })

    return result;
  }

  static async findByUserName(userName: string): Promise<User> {
    console.log('passou aqui');
    const repository = getRepository(User);

    const result = await repository.findOne({ where: { userName } });

    return result;
  }

  static async deleteById(userId: string): Promise<void> {
    const repository = getRepository(User);

    await repository.delete({ id: userId });
  }

}

export { UserRepository };