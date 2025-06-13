import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../../auth/guard";
import { UserService } from "../services";
import { CreateUserDto, UpdateUserDto } from "../dtos";

@ApiTags("User")
@UseGuards(JwtGuard)
@Controller("user")
export class UserController{
    constructor(private userService: UserService){}

    @ApiBody({type:CreateUserDto})
    @Post()
    create(@Body() dto: CreateUserDto){
        return this.userService.create(dto);
    }

    @Get()
    getMany(@Query() query: Record<string,any>) {
        if(Object.keys(query).length >0){
            return this.userService.getBy(query);
        }
            return this.userService.getAll();
    }

    @Get(':id')
    get(@Param('id') userId: string){
        return this.userService.get(userId);
    }

    @ApiBody({type:UpdateUserDto})
    @Patch(':id')
    update(
        @Param('id') userId: string,
        @Body() dto: UpdateUserDto){
        return this.userService.update(userId, dto);
    }

    @Delete(':id')
    delete(@Param('id') userId: string){
        return this.userService.delete(userId);
    }
}