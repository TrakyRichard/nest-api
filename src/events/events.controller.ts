import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, } from '@nestjs/common';
import { CreateEventDto } from './dto/create-events-dto';
import { Request, Response } from "express";
import { EventsService } from './events.service';
import { Event } from './interfaces/events.interface';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @ApiOkResponse({
        description: 'Retrieved all the event that are in the Database',
        type: Event
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get()
    findAllEvent(): Event[] {
        return this.eventsService.findAllEvent();
    }

    @ApiOkResponse({
        description: 'Retrieved event by ID successfully',
        type: Event
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get(':eventId')
    findOneEvent(@Param('eventId') eventId): Event {
        return this.eventsService.findOneEvent(eventId);
    }

    @ApiOkResponse({
        description: 'Event created successfully',
        type: Event
      })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Post()
    createEvent(@Body() eventCreated: Event): Event[] {
        return this.eventsService.createEvent(eventCreated);
    }

    @ApiOkResponse({
        description: 'Event Updated successfully',
        type: Event
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Put(':eventId')
    updateEvent(@Body() updateEventDto: Event, @Param('eventId') eventId): Event[]
    {
        return this.eventsService.updateEvent(eventId,updateEventDto);
    }

    @ApiOkResponse({
        description: 'Event deleted successfully',
        type: Event
    })
        @ApiNotFoundResponse({ description: 'No Event to delete match this ID' })
        @ApiInternalServerErrorResponse({
        description: 'Internal server error please can u try again.',
    })
    @Delete(":eventId")
    deleteEvent(@Param('eventId') eventId) : string {
        return `event ${eventId} deleted`;
    }
}
