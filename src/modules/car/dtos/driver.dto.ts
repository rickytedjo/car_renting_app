import { IsAlpha, IsIn, IsNotEmpty, IsOptional } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class createDriverDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    name:string;

    @ApiPropertyOptional({ enum: ['FREE', 'UNOCCUPIED'] })
    @IsOptional()
    @IsIn(["FREE","UNOCCUPIED"])
    status:string;
}
export class updateDriverDto{
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsAlpha()
    name:string;

    @ApiPropertyOptional({ enum: ['FREE', 'UNOCCUPIED'] })
    @IsOptional()
    @IsIn(["FREE","UNOCCUPIED"])
    status:string;
}