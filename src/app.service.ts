import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStart() {
    return { message: 'Api Started!' };
  }
}
