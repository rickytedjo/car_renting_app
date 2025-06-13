import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";


@Injectable()
export class PrismaService
extends PrismaClient
implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super({
          log:
            process.env.NODE_ENV === 'development'
              ? ['query', 'info', 'warn', 'error']
              : ['error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async transaction<T>(fn: (prisma: PrismaService) => Promise<T>): Promise<T> {
        return this.$transaction(fn);
    }
}