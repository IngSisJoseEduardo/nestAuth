import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

import { LocalAuthGuard } from './auth/local-auth.guard';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Public() // el decorador public permite exponer el endpoint, sin necesidad de proporcionarle un JWT
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard) // LocalAuthGuard es una clase que extiende de AuthGuard
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Public()
  @Get('mensaje')
  getMsg() {
    return { msg: 'Hola mundo' };
  }
}
