import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../../auth/guard";
import { BookingService } from "../services";
import { CreateBookingDto, UpdateBookingDto } from "../dtos";

@ApiTags("Booking")
@UseGuards(JwtGuard)
@Controller("booking")
export class BookingController{
    constructor(private bookingService: BookingService){}

    @ApiBody({type:CreateBookingDto})
    @Post()
    create(@Body() dto: CreateBookingDto){
        return this.bookingService.create(dto);
    }

    @Get()
    getMany(@Query() query: Record<string,any>) {
        if(Object.keys(query).length >0){
            return this.bookingService.getBy(query);
        }
            return this.bookingService.getAll();
    }

    @Get(':id')
    get(@Param('id') bookingId: string){
        return this.bookingService.get(bookingId);
    }

    @ApiBody({type:UpdateBookingDto})
    @Patch(':id')
    update(
        @Param('id') bookingId: string,
        @Body() dto: UpdateBookingDto){
        return this.bookingService.update(bookingId, dto);
    }

    @Delete(':id')
    delete(@Param('id') bookingId: string){
        return this.bookingService.delete(bookingId);
    }
}