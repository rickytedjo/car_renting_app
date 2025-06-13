import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookingModule } from "./user/booking.module";
import { DriverModule } from "./car/driver.module";
import { CarModule } from "./car/car.module";

@Module({
  imports: [AuthModule, UserModule, BookingModule, CarModule, DriverModule]
})
export class ModulesModule {}