/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@Nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/udate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDTO) {
    const foundUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (foundUser) {
      return new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (foundUser) {
      return foundUser;
    } else {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (foundUser) {
      return this.userRepository.delete(foundUser);
    } else {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(id: number, user: UpdateUserDTO) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (foundUser) {
      return this.userRepository.update({ id }, user);
    } else {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
