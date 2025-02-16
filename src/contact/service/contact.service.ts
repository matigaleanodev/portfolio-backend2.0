import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../models/contact.entity';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { from } from 'rxjs';
import { ContactInterface } from '../models/contact.interface';
import { EmailService } from './email.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    private readonly emailService: EmailService,
  ) {}

  async createContact(contact: CreateContactDTO): Promise<ContactInterface> {
    const contactEntity = this.contactRepository.create(contact);
    const createContact = this.contactRepository.save(contactEntity);

    await this.emailService.sendContactEmail(contact);

    return createContact;
  }

  getContacts() {
    return from(this.contactRepository.find());
  }

  async deleteContact(id: number) {
    const contact = await this.contactRepository.findOne({
      where: { id },
    });
    if (contact) {
      return this.contactRepository.delete({ id });
    } else {
      return new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
  }
}
