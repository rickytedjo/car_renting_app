import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { BookingModule } from './modules/user/booking.module';
import { DriverModule } from './modules/car/driver.module';
import { CarModule } from './modules/car/car.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { ModulesModule } from './modules/modules.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    CommonModule,
    CoreModule,
    ModulesModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
