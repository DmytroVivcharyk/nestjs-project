import { registerAs } from '@nestjs/config';

export default registerAs('google-auth', () => ({
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
