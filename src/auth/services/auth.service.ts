import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Observable, from } from 'rxjs';
import { UserEntity } from 'src/users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: UserEntity): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    const hashedPassword: Observable<string> = from(bcrypt.hash(password, 12));
    return hashedPassword;
  }

  comparePassword(password: string, hashedPassword: string): Observable<any> {
    return from<any>(bcrypt.compare(password, hashedPassword));
  }
}
