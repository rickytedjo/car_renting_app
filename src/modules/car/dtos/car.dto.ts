import { IsIn, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class createCarDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiPropertyOptional({ enum: ['FREE', 'UNOCCUPIED'] })
    @Transform(({ value }) => value?.toUpperCase())
    @IsOptional()
    @IsIn(["FREE","UNOCCUPIED"])
    status:string;
}
export class updateCarDto{
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiPropertyOptional({ enum: ['FREE', 'UNOCCUPIED'] })
    @Transform(({ value }) => value?.toUpperCase())
    @IsOptional()
    @IsIn(["FREE","UNOCCUPIED"])
    status:string;
}