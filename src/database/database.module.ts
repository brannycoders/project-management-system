/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:(ConfigService:ConfigService)=>({
                type: 'mysql',
                host: ConfigService.getOrThrow('DB_HOST'),
                port: +ConfigService.getOrThrow<number>('DB_PORT'),
                username: ConfigService.getOrThrow('DB_USER'),
                password: ConfigService.getOrThrow('DB_PASSWORD'),
                database: ConfigService.getOrThrow('DB_NAME'),
                entities: [],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ]
})
export class DatabaseModule {}
