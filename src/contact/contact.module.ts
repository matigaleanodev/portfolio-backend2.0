import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';
import { ContactEntity } from './models/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmailService } from './service/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), AuthModule],
  controllers: [ContactController],
  providers: [ContactService, EmailService],
})
export class ContactModule {}
