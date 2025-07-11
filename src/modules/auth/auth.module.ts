import { Module } from "@nestjs/common";
import { AuthController } from "./controllers";
import { AuthService } from "./services";
import { JwtStrategy } from "./strategy";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
        JwtModule.register({})
    ],
    controllers:[
        AuthController
    ],
    providers:[
        AuthService,
        JwtStrategy
    ]
})
export class AuthModule{}