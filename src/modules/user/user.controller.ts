import { Body, Controller, Post } from '@nestjs/common';

import { Public } from 'src/common/decorators';
import { SignupDto, LoginDto } from './dto';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
