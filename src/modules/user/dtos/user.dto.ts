import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail,IsNotEmpty, IsOptional, IsString  } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_admin: boolean;
}
export class UpdateUserDto{
    @ApiPropertyOptional()
    @IsOptional()
    @IsAlpha()
    username: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_admin: boolean;
}