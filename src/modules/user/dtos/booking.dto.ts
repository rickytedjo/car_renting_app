import { IsBoolean, IsDate, IsIn, IsNotEmpty, IsOptional, IsUUID } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBookingDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    start_date: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    end_date: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    admin_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    admin_approval: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    corp_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    corp_approval: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    vehicle_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    driver_id: string;
}
export class UpdateBookingDto{
    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    @Type(()=> Date)
    start_date: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    @Type(()=> Date)
    end_date: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    admin_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    admin_approval: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    corp_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    corp_approval: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    vehicle_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    driver_id: string;

    @ApiPropertyOptional({ enum: ['ONGOING', 'FINISHED', 'PENDING'] })
    @IsOptional()
    @IsIn(["ONGOING", "FINISHED", "PENDING"])
    status: string;
}