import { AuthenticateDTO } from './authService.protocols';
import { UserService } from '../user/UserService';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class AuthService {
  static async authenticate(authenticateDTO: AuthenticateDTO): Promise<any> {
    const { userName, password } = authenticateDTO;

    const user = await UserService.findByUserName(userName);
    if (!user) throw new Error('Usuário ou senha inválido');

    const isValidPassword = await this.validadePassword(password, user.password);
    if (!isValidPassword) throw new Error('Usuário ou senha inválido');

    const token = sign({ id: user.id }, 'secret', { expiresIn: '60m' })

    delete user.password;

    return {
      user,
      token
    };
  }

  private static async validadePassword(reqPassword: string, userPassword: string): Promise<boolean> {
    return compare(reqPassword, userPassword);
  }
}

export { AuthService };
