import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { PrismaService } from "src/core/prisma/prisma.service";
import { PasswordService } from "src/common/utils";


@Injectable()
export class UserService{
    constructor(
        private prisma: PrismaService,
        private hashService: PasswordService
    ){}
    
        async create(dto: CreateUserDto){
            try{
                const data : any = {...dto};
                data.password = await this.hashService.hashPassword(data.password);
                const user = await this.prisma.user.create({
                    data: data
                })
    
                return{
                    statusCode: 201,
                    message: 'User data created successfully',
                    data: user
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async get( userId: string){
            const data = await this.prisma.user.findFirst({
                where:{
                    id:userId,
                    is_deleted:false
                }
            });
    
            return data;
        }
        async getAll(){
            const data = await this.prisma.user.findMany(
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
    
            return await this.prisma.user.findMany({ where:{
                ...where,
                is_deleted: false
            } });
        }
        async update( userId:string, dto: UpdateUserDto){
            try{
                const data : any = {...dto}
                if(dto.password) data.password = await this.hashService.hashPassword(dto.password);
                const user = await this.prisma.user.update({
                    data:data,
                    where:{id:userId}
                })
    
                return{
                    statusCode: 200,
                    message: 'User data updated successfully',
                    data: user
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async delete(userId: string) {
            try {
                // Mark all bookings with this user as admin or corp as deleted
                await this.prisma.booking.updateMany({
                    where: {
                        OR: [
                            { admin_id: userId },
                            { corp_id: userId }
                        ]
                    },
                    data: { is_deleted: true }
                });
                await this.prisma.user.update({
                    where:{id:userId},
                    data:{
                        is_deleted:true
                    }
                });
    
                return{
                    statusCode: 200,
                    message: 'User data deleted successfully',
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