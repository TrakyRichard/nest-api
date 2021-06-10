import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEvent } from './dto/create-events-dto';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MongoUpdateEvent, UpdateEvent } from './dto/update-event-dto';
import { FindOneParams } from 'src/shared/utils/findOneParams';
import { Request, Response } from "express";

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @ApiOkResponse({
        description: 'Retrieved all the event that are in the Database',
        type: UpdateEvent
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get("/prisma/v1")
    findAllEvent(@Req() req: Request, @Res() res: Response){
        return this.eventsService.findAllEvent(req, res);
    }

    @Get("/mongodb/v1")
    findAllEventFromMongo()
    {
      return this.eventsService.findAllEventFromMongo();
    }

    @ApiOkResponse({
        description: 'Retrieved event by ID successfully',
        type: UpdateEvent
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get('/prisma/v1/:id')
    findOneEvent(@Param() { id }: FindOneParams, @Req() req: Request, @Res() res: Response,) {
      console.log(id);
      
        return this.eventsService.findOneEvent(req, res, Number(id));
    }

    @Get('/mongodb/v1/:id')
    findOneEventFromMongobd(@Param('id') id)
    {
      return this.eventsService.findOneEventFromMongobd(id);
    }

    @ApiOkResponse({
        description: 'Event created successfully',
        type: CreateEvent
      })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Post('/prisma/v1')
    createEvent(@Req() req: Request, @Res() res: Response, @Body() eventCreated: CreateEvent) {
        return this.eventsService.createEvent(req, res, eventCreated);
    }

    @Post('/mongodb/v1')
    createEventFromMongo(@Body() eventCreated: CreateEvent) {
      return this.eventsService.createEventFromMongo(eventCreated)
    }

    @ApiOkResponse({
        description: 'Event Updated successfully',
        type: UpdateEvent
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Put('/prisma/v1/:id')
    updateEvent(@Req() req: Request, @Res() res: Response, @Body() updateEventDto: UpdateEvent, @Param() { id }: FindOneParams)
    {
        return this.eventsService.updateEvent(req, res, Number(id),updateEventDto);
    }

    @Put('mongodb/v1/:id')
    updateEventFromMongodb(@Param('id') id, @Body() updatedEvent: MongoUpdateEvent)
    {
      return this.eventsService.updateEventFromMongo(updatedEvent ,id);
    }

    @ApiOkResponse({
        description: 'Event deleted successfully',
        type: UpdateEvent
    })
        @ApiNotFoundResponse({ description: 'No Event to delete match this ID' })
        @ApiInternalServerErrorResponse({
        description: 'Internal server error please can u try again.',
    })
    @Delete("/prisma/v1/:id")
    deleteEvent(@Req() req: Request, @Res() res: Response, @Param() { id } : FindOneParams) {
        return this.eventsService.deleteEvent(req, res, Number(id));
    }

    @Delete('/mongodb/v1/:id')
    deleteEventFromMongodb(@Param('id') id)
    {
      return this.eventsService.deleteFromMongodb(id);
    }
}
