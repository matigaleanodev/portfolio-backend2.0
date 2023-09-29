import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ParseIntPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { ContactInterface } from '../models/contact.interface';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private service: ContactService) {}

  //Rest call: /api/contact
  @Post()
  create(@Body() contact: CreateContactDTO): Observable<ContactInterface> {
    return this.service.createContact(contact);
  }

  //Rest call: /api/contact
  @UseGuards(JwtAuthGuard)
  @Get()
  getContacs(): Observable<ContactInterface[]> {
    return this.service.getContacts();
  }

  //Rest call: /api/contact/{id}
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.service.deleteContact(id);
  }
}
