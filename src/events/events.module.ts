import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel, EventSchema } from 'src/events/schema/event.schema';
import { PrismaModule } from 'prisma/prisma.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [PrismaModule, MongooseModule.forFeature([{name: EventModel.name, schema: EventSchema }])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
