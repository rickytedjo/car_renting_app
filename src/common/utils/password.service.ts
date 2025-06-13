import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hash, verify } from "argon2";

@Injectable()
export class PasswordService{
    constructor(private readonly configService: ConfigService){}

    /**
     * Hashes a password using argon2
     * @param password 
     * @returns hashed password
     */

    async hashPassword(password:string){
        try {
            return await hash(password,{hashLength: 64});
        }
        catch(error){
            throw new InternalServerErrorException(
                'Failed to hash password.',
                error.message,
            );
        }
    }

    /**
     * compares an unhashed password with a hashed one
     * @param password 
     * @param hashed password
     * @returns boolean of match
     */

    async comparePassword(password: string, hashed: string){
        try{
            return await verify(hashed, password);
        }   
        catch(error){
            throw new InternalServerErrorException(
              'Failed to compare passwords.',
              error.message,
            );
        }
    }
}