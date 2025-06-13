import { Module } from "@nestjs/common";
import { DriverController } from "./controllers";
import { DriverService } from "./services";

@Module({
    controllers:[
        DriverController
    ],
    providers:[
        DriverService
    ]
})
export class DriverModule{}