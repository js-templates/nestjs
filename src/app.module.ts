import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { EnvModule } from './env'
import { LoggerModule } from './logger'
import { PrismaModule } from './prisma'

@Module({
  imports: [ScheduleModule.forRoot(), EnvModule, PrismaModule, LoggerModule],
})
export class AppModule {}
