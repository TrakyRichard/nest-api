import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEvent } from './dto/create-events-dto';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MongoUpdateEvent, UpdateEvent } from './dto/update-event-dto';
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

    @Get("mongodb/v1")
    findAllEventFromMongo(@Req() req: Request, @Res() res: Response)
    {
      return this.eventsService.findAllEventFromMongo(req, res);
    }

    @ApiOkResponse({
        description: 'Retrieved event by ID successfully',
        type: UpdateEvent
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get('mongodb/v1/:id')
    findOneEventFromMongobd(@Req() req: Request, @Res() res: Response, @Param('id') id)
    {
      return this.eventsService.findOneEventFromMongobd(req, res, id);
    }

    @ApiOkResponse({
        description: 'Event created successfully',
        type: CreateEvent
      })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })

    @Post('mongodb/v1')
    createEventFromMongo(@Req() req: Request, @Res() res: Response, @Body() eventCreated: CreateEvent) {
      return this.eventsService.createEventFromMongo(req, res, eventCreated)
    }

    @ApiOkResponse({
        description: 'Event Updated successfully',
        type: UpdateEvent
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })

    @Put('mongodb/v1/:id')
    updateEventFromMongodb(@Req() req: Request, @Res() res: Response, @Param('id') id, @Body() updatedEvent: MongoUpdateEvent)
    {
      return this.eventsService.updateEventFromMongo(req, res, updatedEvent ,id);
    }

    @ApiOkResponse({
        description: 'Event deleted successfully',
        type: UpdateEvent
    })
        @ApiNotFoundResponse({ description: 'No Event to delete match this ID' })
        @ApiInternalServerErrorResponse({
        description: 'Internal server error please can u try again.',
    })

    @Delete('mongodb/v1/:id')
    deleteEventFromMongodb(@Req() req: Request, @Res() res: Response, @Param('id') id)
    {
      return this.eventsService.deleteFromMongodb(req,res,id);
    }
}
