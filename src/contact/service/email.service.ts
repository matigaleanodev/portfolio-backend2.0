import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const RESEND_API_KEY = configService.get('RESEND_API_KEY');
    this.resend = new Resend(RESEND_API_KEY);
  }

  /**
   * Envía un email con los datos del contacto.
   * @param contact Datos del contacto.
   * @returns Promesa con la respuesta del servicio de correo.
   */
  async sendContactEmail(contact: CreateContactDTO) {
    try {
      const EMAIL = this.configService.get('EMAIL');
      const response = await this.resend.emails.send({
        from: 'contacto@matiasgaleano.com',
        to: EMAIL,
        subject: `Nuevo mensaje de ${contact.name}`,
        text: `Email: ${contact.email}\nMensaje: ${contact.message}`,
      });

      return response;
    } catch (error) {
      console.error('Error enviando email:', error);
      throw error;
    }
  }
}
