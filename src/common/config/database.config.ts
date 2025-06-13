import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from '../types/env.type';

export default registerAs<DatabaseConfig>('database', () => ({
  url: process.env.DATABASE_URL || '', 
  host: process.env.DB_HOST || 'localhost',  
  port: parseInt(process.env.DB_PORT || '5432', 10), 
  username: process.env.DB_USERNAME || '',  
  password: process.env.DB_PASSWORD || '',  
  database: process.env.DB_NAME || '',  
  logging: process.env.DB_LOGGING === 'true',  
  pool_mode: process.env.DB_POOL_MODE || 'transaction', 
}));