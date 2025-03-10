import { Module, Global } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import appConfig from 'src/config/app.config';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('appConfig.mailHost'),
            port: configService.get<number>('appConfig.mailPort'),
            secure: false,
            auth: {
              user: configService.get('appConfig.mailUser'),
              pass: configService.get('appConfig.mailPassword'),
            },
          },
          defaults: {
            from: `"No Reply" <${configService.get('appConfig.mailUser')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'), // Adjusting path
            adapter: new EjsAdapter(),
            options: { strict: false },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
