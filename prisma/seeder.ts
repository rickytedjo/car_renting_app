import { hash } from "argon2";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();  

async function main() {
    await prisma.user.createMany({
        data:[
            {
                username: "Car Admin",
                email: "admin@gmail.com",
                password: await hash("admin123", { hashLength: 64 }),
                last_viewed: new Date(),
                is_admin: true,
            },
            {
                username: "Corp 1",
                email: "corp1@gmail.com",
                password: await hash("admin123", { hashLength: 64 }),
                last_viewed: new Date(),
                is_admin: false,
            },
            {
                username: "Corp 2",
                email: "corp2@gmail.com",
                password: await hash("admin123", { hashLength: 64 }),
                last_viewed: new Date(),
                is_admin: false,
            },
        ]
    });

    await prisma.driver.createMany({
        data: [
            {
                name: "Driver 1",
                status: "FREE"
            },
            {
                name: "Driver 2",
                status: "FREE"
            }
        ]
    });

    await prisma.vehicle.createMany({
        data : [
            {
                name: "Car 1",
                status: "FREE"
            },
            {
                name: "Car 2",
                status: "FREE"
            }
        ]
    })
}
main()