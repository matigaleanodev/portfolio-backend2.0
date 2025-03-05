import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Resend } from 'resend';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const RESEND_API_KEY = this.configService.get<string>('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      this.logger.error(
        '❌ RESEND_API_KEY no está definido en las variables de entorno.',
      );
      throw new Error('Falta la clave de API de Resend (RESEND_API_KEY).');
    }

    this.resend = new Resend(RESEND_API_KEY);
  }

  /**
   * Envía un email con los datos del contacto.
   * @param contact Datos del contacto.
   * @returns Promesa con la respuesta del servicio de correo.
   */
  async sendContactEmail(
    contact: CreateContactDTO,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const EMAIL = this.configService.get<string>('EMAIL');

    if (!EMAIL) {
      this.logger.error(
        '❌ No se puede enviar el correo porque EMAIL no está configurado.',
      );
      return {
        success: false,
        error: 'EMAIL no está configurado en las variables de entorno.',
      };
    }

    try {
      this.logger.log(
        `📤 Enviando email a ${EMAIL} desde contacto@matiasgaleano.com.ar`,
      );

      const response = await this.resend.emails.send({
        from: 'Contacto Portfolio <contacto@matiasgaleano.com.ar>',
        to: [EMAIL],
        subject: `Nuevo mensaje de ${contact.name}`,
        text: `Email: ${contact.email}\nMensaje: ${contact.message}`,
      });

      if (response.error) {
        this.logger.error(
          `⚠️ Error al enviar email: ${response.error.message}`,
          response.error,
        );
        return { success: false, error: response.error.message };
      }

      this.logger.log('✅ Email enviado con éxito', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      this.logger.error('🔥 Error inesperado enviando email', error);

      if (error.response?.statusCode === 403) {
        this.logger.error(
          '🚨 Verifica que el dominio esté validado en Resend.',
        );
      }

      throw new InternalServerErrorException(
        'No se pudo enviar el email. Inténtalo más tarde.',
      );
    }
  }
}
