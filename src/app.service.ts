import { Injectable } from '@nestjs/common';
import * as xmlbuilder from 'xmlbuilder';

@Injectable()
export class AppService {
  generateSitemapXML() {
    const root = xmlbuilder
      .create('urlset', { version: '1.0', encoding: 'UTF-8' })
      .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    // URL principal
    root
      .ele('url')
      .ele('loc', 'https://www.matiasgaleano.com.ar/')
      .up()
      .ele('lastmod', '2023-10-23')
      .up()
      .ele('changefreq', 'daily')
      .up()
      .ele('priority', '1.0')
      .up();

    // Rutas adicionales
    const additionalRoutes = [
      {
        url: 'https://www.matiasgaleano.com.ar/about-me',
        lastmod: '2023-10-23',
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        url: 'https://www.matiasgaleano.com.ar/projects',
        lastmod: '2023-10-23',
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        url: 'https://www.matiasgaleano.com.ar/contact',
        lastmod: '2023-10-23',
        changefreq: 'monthly',
        priority: '0.8',
      },
    ];

    additionalRoutes.forEach((route) => {
      root
        .ele('url')
        .ele('loc', route.url)
        .up()
        .ele('lastmod', route.lastmod)
        .up()
        .ele('changefreq', route.changefreq)
        .up()
        .ele('priority', route.priority)
        .up();
    });

    return root.end({ pretty: true });
  }
}
