import { Module } from "@nestjs/common";
import { CarController } from "./controllers";
import { CarService } from "./services";

@Module({
    controllers:[
        CarController
    ],
    providers:[
        CarService
    ]
})
export class CarModule{}