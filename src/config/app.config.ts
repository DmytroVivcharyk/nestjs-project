import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  mailHost: process.env.MAIL_HOST,
  mailPort: +process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
}));
