import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../models/contact.entity';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { Observable, from } from 'rxjs';
import { ContactInterface } from '../models/contact.interface';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  createContact(contact: CreateContactDTO): Observable<ContactInterface> {
    const contactEntity = this.contactRepository.create(contact);
    return from(this.contactRepository.save(contactEntity));
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
