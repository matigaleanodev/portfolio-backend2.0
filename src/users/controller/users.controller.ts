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
import {
  ApiExcludeEndpoint,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Login')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login', description: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
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

  //Rest call: /api/users/register
  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiExcludeEndpoint()
  createUser(@Body() newUser: CreateUserDTO): Observable<UserInterface> {
    return this.service.createUser(newUser);
  }

  //Rest call: /api/users
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  getUsers(): Observable<UserEntity[]> {
    return this.service.getUsers();
  }

  //Rest call: /api/users/{id}
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUser(id);
  }

  //Rest call: /api/users/{id}
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteUser(id);
  }

  //Rest call: /api/users/{id}
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: UpdateUserDTO,
  ) {
    return this.service.updateUser(id, updatedUser);
  }
}
