/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { Observable, from, map, switchMap } from 'rxjs';
import { LoginUserDTO } from '../dto/login-user.dto';
import { UserInterface } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  createUser(user: CreateUserDTO): Observable<UserInterface> {
    const userEntity = this.userRepository.create(user);

    return this.mailExists(userEntity.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(userEntity.password).pipe(
            switchMap((passwordHash: string) => {
              userEntity.password = passwordHash;

              return from(this.userRepository.save(userEntity)).pipe(
                map((savedUser: UserInterface) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  login(loginUserDto: LoginUserDTO): Observable<string> {
    return this.findUserByEmail(loginUserDto.email.toLowerCase()).pipe(
      switchMap((user: UserEntity) => {
        if (user) {
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.getUser(user.id).pipe(
                  switchMap((user: UserEntity) =>
                    this.authService.generateJwt(user),
                  ),
                );
              } else {
                throw new HttpException(
                  'Invalid Credentials',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  getUsers(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  getUser(id: number): Observable<UserEntity | null> {
    return from(
      this.userRepository.findOne({
        where: {
          id,
        },
      }),
    );
  }

  async deleteUser(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (foundUser) {
      return this.userRepository.delete({ id });
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

  private findUserByEmail(email: string): Observable<UserEntity | null> {
    return from(
      this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'name', 'password'],
      }),
    );
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.authService.comparePassword(password, storedPasswordHash);
  }

  private mailExists(email: string): Observable<boolean> {
    email = email.toLowerCase();
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      map((user: UserEntity) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
}
