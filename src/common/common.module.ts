import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PasswordService } from "./utils";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        PasswordService
    ],
    exports: [
        PasswordService
    ]
})
export class CommonModule{}