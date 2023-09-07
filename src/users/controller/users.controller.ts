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
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../models/user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Observable, map } from 'rxjs';
import { UserInterface } from '../models/user.interface';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDTO): Observable<UserInterface> {
    return this.service.createUser(newUser);
  }

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

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: UpdateUserDTO,
  ) {
    return this.service.updateUser(id, updatedUser);
  }
}
