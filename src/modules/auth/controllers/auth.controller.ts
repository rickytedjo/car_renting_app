import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services";
import { AuthDto } from "../dtos";
import { Response } from 'express';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('signin')
    async signin(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response,
    ){
        const token = await this.authService.signIn(dto);

        if (token['token'] != null) {
          res.cookie('jwt', token['token'], {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.COOKIE_DOMAIN || 'localhost',
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });

          return {
            statusCode: 200,
            message: 'Login successful',
          };
        } else {
          throw {
            statusCode: token['statusCode'],
            message: token['message'],
          };
        }
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return {
      statusCode: 204,
      message: 'Logged Out',
    };
  }
}