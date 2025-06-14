import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "src/common/config/app.config";
import authConfig from "src/common/config/auth.config";
import databaseConfig from "src/common/config/database.config";
import { PrismaModule } from "./prisma/prisma.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
      ],
      cache: true,
      expandVariables: true,
    }),
    PrismaModule,
  ],
  exports: [ConfigModule, PrismaModule],
})
export class CoreModule {}