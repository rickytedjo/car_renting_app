import { Injectable } from "@nestjs/common";
import { CreateBookingDto, UpdateBookingDto } from "../dtos";
import { PrismaService } from "src/core/prisma/prisma.service";
import * as XLSX from 'xlsx';

@Injectable()
export class BookingService{
    constructor(
        private prisma: PrismaService
    ){}
    
        async create(dto: CreateBookingDto){
            try{
                const data : any = {
                    ...dto,
                    admin_approval: dto.admin_approval ?? false,
                    corp_approval: dto.corp_approval  ?? false,
                };

                const driver = await this.prisma.driver.findFirst({
                  where: {
                    id: dto.driver_id,
                    is_deleted: false,
                    status: "FREE",
                  },
                });

                if (!driver) {
                  throw new Error("Driver not found or not available");
                }

                const vehicle = await this.prisma.vehicle.findFirst({
                  where: {
                    id: dto.vehicle_id,
                    is_deleted: false,
                    status: "FREE",
                  },
                });

                if (!vehicle) {
                  throw new Error("Vehicle not found or not available");
                }


                if(dto.admin_approval && dto.corp_approval){
                    data.status = 'ONGOING';
                }

                const booking = await this.prisma.booking.create({
                    data: data
                })
    
                return{
                    statusCode: 201,
                    message: 'Booking data created successfully',
                    data: booking
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async get( bookingId: string){
            const data = await this.prisma.booking.findFirst({
                where:{
                    id:bookingId,
                    is_deleted:false
                }
            });
    
            return data;
        }
        async getAll(){
            const data = await this.prisma.booking.findMany(
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
    
            return await this.prisma.booking.findMany({ where });
        }
        async update( bookingId:string, dto: UpdateBookingDto){
            try{
                const oldBooking = await this.prisma.booking.findFirst({
                    where:{
                        id:bookingId,
                        is_deleted:false
                    }
                });

                const data : any = {
                    ...dto,
                    admin_approval: dto.admin_approval ?? false,
                    corp_approval: dto.corp_approval  ?? false,
                }

                if(dto.driver_id){const driver = await this.prisma.driver.findFirst({
                      where: {
                        id: dto.driver_id,
                        is_deleted: false,
                        status: "FREE",
                      },
                    });

                    if (!driver) {
                        throw new Error("Driver not found or not available");
                    }

                    await this.prisma.driver.update({
                            where: { id: data.driver_id },
                            data: { status: "OCCUPIED"}
                        });
                }

                if(dto.vehicle_id){const vehicle = await this.prisma.vehicle.findFirst({
                      where: {
                        id: dto.vehicle_id,
                        is_deleted: false,
                        status: "FREE",
                      },
                    });

                    if (!vehicle) {
                      throw new Error("Vehicle not found or not available");
                    }
                    await this.prisma.vehicle.update({
                            where: { id: data.vehicle_id },
                            data: { status: "USED"}
                        });
                    
                }

                if(oldBooking?.status === 'PENDING' && (dto.admin_approval || dto.corp_approval)){
                    if((oldBooking.admin_approval || dto.admin_approval) && (oldBooking.corp_approval || dto.corp_approval)){
                        data.status = 'ONGOING';
                    }
                }

                if(dto.status && dto.status === 'FINISHED'){
                    if(oldBooking?.status === 'ONGOING'){
                        data.status = 'FINISHED';
                    }
                }

                const booking = await this.prisma.booking.update({
                    data:data,
                    where:{id:bookingId}
                })
    
                return{
                    statusCode: 200,
                    message: 'Booking data updated successfully',
                    data: booking
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }
        async delete( bookingId: string){
            try{
                await this.prisma.booking.update({
                    where:{id:bookingId},
                    data:{
                        is_deleted:true
                    }
                });
    
                return{
                    statusCode: 200,
                    message: 'Booking data deleted successfully',
                }
            }
            catch(error){
                return {
                    statusCode: error.code,
                    message: error.message
                }
            }
        }

        async excelExport() {
            const now = new Date();
            const year = now.getFullYear();
            let startDate: Date, endDate: Date;
            if (now.getMonth() < 6) {
                startDate = new Date(year, 0, 1, 0, 0, 0, 0);
                endDate = new Date(year, 5, 30, 23, 59, 59, 999);
            } else {
                startDate = new Date(year, 6, 1, 0, 0, 0, 0);
                endDate = new Date(year, 11, 31, 23, 59, 59, 999);
            }
            const bookings = await this.prisma.booking.findMany({
                where: {
                    is_deleted: false,
                    created_at: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                include: {
                    booked_vehicle: true,
                    booked_driver: true,
                }
            });


            if (bookings.length === 0) {
              return {
                statusCode: 404,
                message: 'No booking data found to export',
              };
            }

            const worksheet = XLSX.utils.json_to_sheet(bookings);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');

            const excelBuffer = XLSX.write(workbook, {
              bookType: 'xlsx',
              type: 'buffer',
            });
    
            return excelBuffer;
        }
}