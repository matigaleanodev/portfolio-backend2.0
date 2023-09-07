/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../models/user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Observable, map } from 'rxjs';
import { UserInterface } from '../models/user.interface';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() user: LoginUserDTO): Observable<object> {
    return this.service.login(user).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 86400,
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() newUser: CreateUserDTO): Observable<UserInterface> {
    return this.service.createUser(newUser);
  }

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.service.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: UpdateUserDTO,
  ) {
    return this.service.updateUser(id, updatedUser);
  }
}
