import { Op } from 'sequelize';
import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SignupDto, LoginDto } from './dto';
import { User } from 'src/common/types';
import { ERRORS, PROVIDERS } from 'src/common/constants';
import { generateToken, hashPassword, comparePassword } from 'src/common/utils';

import { Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USERS_PROVIDER)
    private readonly usersRepository: typeof Users,
  ) {}

  async checkIfUserExist(userInfo: any, message: string): Promise<Users> {
    const { username, email } = userInfo;
    console.log(this.usersRepository);
    const user = await this.usersRepository.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message,
        },
        HttpStatus.CONFLICT,
      );
    }
    return user;
  }
  async checkIfUser(userInfo: LoginDto): Promise<Users> {
    const { username } = userInfo;
    const where: any = {};
    if (username.includes('@')) {
      where.email = username;
    } else {
      where.userName = username;
    }
    const user = await this.usersRepository.findOne({
      where: {
        ...where,
      },
    });
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ERRORS.INCORRECT_DATA,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async signup(signupDto: SignupDto): Promise<User> {
    await this.checkIfUserExist(signupDto, ERRORS.USER_ALREADY_EXISTS);
    signupDto.password = await hashPassword(signupDto.password);
    const newUser = await this.usersRepository.create({
      ...signupDto,
    });
    console.log('newUser');
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        userName: newUser.username,
      },
      token: generateToken(newUser.username),
    };
  }
  async login(loginInfo: LoginDto): Promise<User> {
    try {
      const user = await this.checkIfUser(loginInfo);
      const isPasswordCorrect = await comparePassword(
        loginInfo.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ERRORS.INCORRECT_DATA,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        user: {
          id: user.id,
          email: user.email,
          userName: user.username,
        },
        token: generateToken(user.username),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
