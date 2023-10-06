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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Contact Messages')
@Controller('contact')
export class ContactController {
  constructor(private service: ContactService) {}

  //Rest call: /api/contact
  @Post()
  @ApiOperation({
    summary: 'Contact Message',
    description: 'Create a contact message',
  })
  @ApiResponse({ status: 201, description: 'Message send' })
  create(@Body() contact: CreateContactDTO): Observable<ContactInterface> {
    return this.service.createContact(contact);
  }

  //Rest call: /api/contact
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all messages',
    description: 'Get all messages',
  })
  @ApiResponse({ status: 200, description: 'Messages found' })
  @ApiResponse({ status: 404, description: 'Messages not found' })
  @Get()
  getContacs(): Observable<ContactInterface[]> {
    return this.service.getContacts();
  }

  //Rest call: /api/contact/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a message',
    description: 'Delete a message',
  })
  @ApiResponse({ status: 200, description: 'Message deleted' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.service.deleteContact(id);
  }
}
