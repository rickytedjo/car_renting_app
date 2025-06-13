import { Injectable } from "@nestjs/common";
import { createDriverDto, updateDriverDto } from "../dtos";
import { PrismaService } from "src/core/prisma/prisma.service";


@Injectable()
export class DriverService{
    constructor(
        private prisma: PrismaService
    ){}
    
        async create(dto: createDriverDto){
            try{
                const data : any = {...dto};
                const driver = await this.prisma.driver.create({
                    data: data
                })
    
                return{
                    statusCode: 201,
                    message: 'Driver data created successfully',
                    data: driver
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async get( driverId: string){
            const data = await this.prisma.driver.findFirst({
                where:{
                    id:driverId,
                    is_deleted:false
                }
            });
    
            return data;
        }
        async getAll(){
            const data = await this.prisma.driver.findMany(
                {
                    where:{
                        is_deleted:false
                    }
                }
            );
            
            return data;
        }
        async getBy(filters: Record<string,any>){
            const where: Record<string, any> = {}
    
            for (const [key, value] of Object.entries(filters)) {
              where[key] = { equals: value };
            }
    
            return await this.prisma.driver.findMany({ where });
        }
        async update( driverId:string, dto: updateDriverDto){
            try{
                const data : any = {...dto}
                const driver = await this.prisma.driver.update({
                    data:data,
                    where:{id:driverId}
                })
    
                return{
                    statusCode: 200,
                    message: 'Driver data updated successfully',
                    data: driver
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async delete( driverId: string){
            try{
                await this.prisma.driver.update({
                    where:{id:driverId},
                    data:{
                        is_deleted:true
                    }
                });
    
                return{
                    statusCode: 200,
                    message: 'Driver data deleted successfully',
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
}