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
    
            return await this.prisma.booking.findMany({ where:{
                ...where,
                is_deleted: false
            } });
        }
        async update( bookingId:string, dto: UpdateBookingDto){
            try{
                const oldBooking = await this.prisma.booking.findFirst({
                    where:{
                        id:bookingId,
                        is_deleted:false
                    }
                });
                if (!oldBooking) {
                    throw new Error('Booking not found');
                }

                const data : any = {
                    ...dto,
                }

                // Approval logic
                const adminApproval = dto.admin_approval ?? oldBooking.admin_approval;
                const corpApproval = dto.corp_approval ?? oldBooking.corp_approval;
                const inputStatus = dto.status ?? oldBooking.status;

                // If both approvals are 'Accepted' and status is NOT 'ONGOING', set vehicle and driver to OCCUPIED
                if (
                    adminApproval === 'Accepted' &&
                    corpApproval === 'Accepted' &&
                    inputStatus !== 'ONGOING'
                ) {
                    if (oldBooking.vehicle_id) {
                        await this.prisma.vehicle.update({
                            where: { id: oldBooking.vehicle_id },
                            data: { status: "USED" }
                        });
                    }
                    if (oldBooking.driver_id) {
                        await this.prisma.driver.update({
                            where: { id: oldBooking.driver_id },
                            data: { status: 'OCCUPIED' }
                        });
                    }
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

                if(dto.admin_approval && dto.admin_approval === 'REJECTED'){
                    data.status
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
        async delete(bookingId: string) {
            try {
                const booking = await this.prisma.booking.findFirst({
                    where: { id: bookingId, is_deleted: false }
                });
                if (!booking) {
                    throw new Error('Booking not found');
                }
                if (booking.status === 'ONGOING') {
                    if (booking.vehicle_id) {
                        await this.prisma.vehicle.update({
                            where: { id: booking.vehicle_id },
                            data: { status: 'FREE' }
                        });
                    }
                    if (booking.driver_id) {
                        await this.prisma.driver.update({
                            where: { id: booking.driver_id },
                            data: { status: 'FREE' }
                        });
                    }
                }
                await this.prisma.booking.update({
                    where: { id: bookingId },
                    data: { is_deleted: true }
                });
                return {
                    statusCode: 200,
                    message: 'Booking data deleted successfully',
                };
            } catch (error) {
                return {
                    statusCode: error.code,
                    message: error.message
                };
            }
        }

        async excelExport() {
            // const now = new Date();
            // const year = now.getFullYear();
            // const month = now.getMonth(); // 0-based
            // const startDate = new Date(year, month, 1, 0, 0, 0, 0);
            // const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // last day of month
            const bookings = await this.prisma.booking.findMany({
                where: {
                    is_deleted: false,
                    // created_at: {
                    //     gte: startDate,
                    //     lte: endDate,
                    // },
                },
                include: {
                    booked_vehicle: true,
                    booked_driver: true,
                    booking_admin: true,
                    booking_corp: true,
                }
            });

            console.log('Bookings to export:', bookings);


            if (bookings.length === 0) {
              throw {
                statusCode: 404,
                message: 'No booking data found to export',
              };
            }
            

            const bookingsMap = bookings.map(booking => ({
                id: booking.id,
                vehicle: booking.booked_vehicle?.name || 'N/A',
                driver: booking.booked_driver?.name || 'N/A',
                admin: booking.booking_admin?.username || 'N/A',
                corporate: booking.booking_corp?.username || 'N/A',
                dateStart: booking.date_start.toISOString(),
                dateEnd: booking.date_end.toISOString(),
                createdAt: booking.created_at,
            }));

            const worksheet = XLSX.utils.json_to_sheet(bookingsMap);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');

            const excelBuffer = XLSX.write(workbook, {
              bookType: 'xlsx',
              type: 'buffer',
            });
    
            return excelBuffer;
        }
}