import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sitemap.xml')
  async generateSitemap(@Res() res: Response) {
    const xmlContent = this.appService.generateSitemapXML();

    res.header('Content-Type', 'application/xml');
    res.send(xmlContent);
  }
}
