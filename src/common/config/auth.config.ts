import { registerAs } from '@nestjs/config';
import { AuthConfig } from '../types/env.type';

export default registerAs<AuthConfig>('auth', () => ({
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || '',  
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
  },
}));