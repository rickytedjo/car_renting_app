import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../../auth/guard";
import { CarService } from "../services";
import { createCarDto, updateCarDto } from "../dtos";

@ApiTags("Car")
@UseGuards(JwtGuard)
@Controller("car")
export class CarController{
    constructor(private carService: CarService){}

    @ApiBody({type:createCarDto})
    @Post()
    create(@Body() dto: createCarDto){
        return this.carService.create(dto);
    }

    @Get()
    getMany(@Query() query: Record<string,any>) {
        if(Object.keys(query).length >0){
            return this.carService.getBy(query);
        }
            return this.carService.getAll();
    }

    @Get(':id')
    get(@Param('id') carId: string){
        return this.carService.get(carId);
    }

    @ApiBody({type:updateCarDto})
    @Patch(':id')
    update(
        @Param('id') carId: string,
        @Body() dto: updateCarDto){
        return this.carService.update(carId, dto);
    }

    @Delete(':id')
    delete(@Param('id') carId: string){
        return this.carService.delete(carId);
    }
}