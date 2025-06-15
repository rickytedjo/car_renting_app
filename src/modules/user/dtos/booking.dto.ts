import { IsBoolean, IsDate, IsIn, IsNotEmpty, IsOptional, IsUUID } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBookingDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    date_start: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    date_end: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    admin_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsIn(["PENDING", "APPROVED", "REJECTED"])
    admin_approval: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    corp_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsIn(["ONGOING", "FINISHED", "PENDING"])
    corp_approval: string;

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
    date_start: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    @Type(()=> Date)
    date_end: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    admin_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsIn(["PENDING", "APPROVED", "REJECTED"])
    admin_approval: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    corp_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsIn(["PENDING", "APPROVED", "REJECTED"])
    corp_approval: string;

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