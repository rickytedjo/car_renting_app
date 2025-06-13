export interface AppConfig {
  name: string;
  env: 'development' | 'production' | 'test';
  port: number;
  apiPrefix: string;
  debug: boolean;
  timezone: string;
}

export interface DatabaseConfig {
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  pool_mode: string;
}

export interface AuthConfig {
  jwt: {
    accessSecret: string;
    accessExpiration: string;
  };
}

export interface SecurityConfig {
  cors: {
    origins: string[];
    methods: string[];
    allowedHeaders: string[];
  };
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  format: 'json' | 'simple';
  destination: 'console' | 'file' | 'both';
  filePath?: string;
  maxSize?: string; // '10M'
  maxFiles?: number;
}