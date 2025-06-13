import { registerAs } from '@nestjs/config';
import { SecurityConfig } from '../types/env.type';

export default registerAs<SecurityConfig>('security', () => ({
  cors: {
    origins: (process.env.SECURITY_CORS_ORIGINS || '').split(','),  
    methods: (process.env.SECURITY_CORS_METHODS || 'GET,POST').split(','),  
    allowedHeaders: (process.env.SECURITY_CORS_ALLOWED_HEADERS || 'Content-Type,Authorization').split(','),  
  },
}));