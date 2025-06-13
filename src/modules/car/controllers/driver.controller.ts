import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../../auth/guard";
import { DriverService } from "../services";
import { createDriverDto, updateDriverDto } from "../dtos";

@ApiTags("Driver")
@UseGuards(JwtGuard)
@Controller("driver")
export class DriverController{
    constructor(private driverService: DriverService){}

    @ApiBody({type:createDriverDto})
    @Post()
    create(@Body() dto: createDriverDto){
        return this.driverService.create(dto);
    }

    @Get()
    getMany(@Query() query: Record<string,any>) {
        if(Object.keys(query).length >0){
            return this.driverService.getBy(query);
        }
            return this.driverService.getAll();
    }

    @Get(':id')
    get(@Param('id') driverId: string){
        return this.driverService.get(driverId);
    }

    @ApiBody({type:updateDriverDto})
    @Patch(':id')
    update(
        @Param('id') driverId: string,
        @Body() dto: updateDriverDto){
        return this.driverService.update(driverId, dto);
    }

    @Delete(':id')
    delete(@Param('id') driverId: string){
        return this.driverService.delete(driverId);
    }
}