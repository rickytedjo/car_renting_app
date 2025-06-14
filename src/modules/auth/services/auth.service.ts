import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { AuthDto } from "../dtos";
import { PrismaService } from 'src/core/prisma/prisma.service';
import { PasswordService } from 'src/common/utils';

@Injectable()
export class AuthService{
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private config: ConfigService,
        private readonly passwordService: PasswordService
    ){}

    async signToken(userId: string,is_admin: boolean){
        const payload = {
        sub: userId,
        is_admin
    };

    const secret = this.config.get<string>('auth.jwt.accessSecret');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10080m',
      secret: secret,
    });

    return token;
  }

    async signIn(dto:AuthDto) {
        try{
            const data = await this.prisma.user.findFirst({where:
                {
                    email:dto.email,
                    is_deleted:false
                }
            })

            if(data && await this.passwordService.comparePassword(dto.password, data.password)){
                const token = await this.signToken(data.id, data.is_admin);


                await this.prisma.user.update({
                    where:{id:data.id},
                    data:{
                        last_viewed: new Date()
                    }
                })
                return {
                    statusCode: 201,
                    message: "Credentials Confirmed",
                    token: token
                };
            }
            else{
                return{
                    statusCode: 401,
                    message: 'Credentials Incorrect',
                }
            }
        }
        catch(error){
            return {
                statusCode: error.code,
                message: error.message
            }
        }
    }
    
}