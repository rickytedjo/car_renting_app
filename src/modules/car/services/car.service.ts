import { Injectable } from "@nestjs/common";
import { createCarDto, updateCarDto } from "../dtos";
import { PrismaService } from "src/core/prisma/prisma.service";


@Injectable()
export class CarService{
    constructor(
        private prisma: PrismaService
    ){}
    
        async create(dto: createCarDto){
            try{
                const data : any = {...dto};
                const car = await this.prisma.vehicle.create({
                    data: data
                })
    
                return{
                    statusCode: 201,
                    message: 'Car data created successfully',
                    data: car
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async get( carId: string){
            const data = await this.prisma.vehicle.findFirst({
                where:{
                    id:carId,
                    is_deleted:false
                }
            });
    
            return data;
        }
        async getAll(){
            const data = await this.prisma.vehicle.findMany(
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
    
            return await this.prisma.vehicle.findMany({ where });
        }
        async update( carId:string, dto: updateCarDto){
            try{
                const data : any = {...dto}
                const car = await this.prisma.vehicle.update({
                    data:data,
                    where:{id:carId}
                })
    
                return{
                    statusCode: 200,
                    message: 'Car data updated successfully',
                    data: car
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async delete( carId: string){
            try{
                await this.prisma.vehicle.update({
                    where:{id:carId},
                    data:{
                        is_deleted:true
                    }
                });
    
                return{
                    statusCode: 200,
                    message: 'Car data deleted successfully',
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