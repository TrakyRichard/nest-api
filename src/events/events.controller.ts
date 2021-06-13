import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDTO } from './dto/events-dto';
import { ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/shared/utils/findOneParams';
import { Request, Response } from "express";


@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}
    
    @ApiOkResponse({
        description: 'Retrieved all the event that are in the Database',
        type: EventDTO
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get("prisma/v1")
    findAllEvent(@Req() req: Request, @Res() res: Response){
        return this.eventsService.findAllEvent(req, res);
    }
    @ApiParam({
      name: "id",
      description: "The id is the only params to make this Get by id request"
    })
    @ApiOkResponse({
        description: 'Retrieved event by ID successfully',
        type: EventDTO
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Get('prisma/v1/:id')
    findOneEvent(@Param() { id }: FindOneParams, @Req() req: Request, @Res() res: Response,) {
      console.log(id);
      
        return this.eventsService.findOneEvent(req, res, Number(id));
    }

    @ApiCreatedResponse({ description: 'The record has been successfully created.',
        type: EventDTO
      })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Post('prisma/v1')
    createEvent(@Req() req: Request, @Res() res: Response, @Body() eventCreated: EventDTO) {
        return this.eventsService.createEvent(req, res, eventCreated);
    }

    @ApiParam({
      name: "id",
      description: "The id is the only params to make this update request"
    })
    @ApiOkResponse({
        description: 'Event Updated successfully',
        type: EventDTO
      })
      @ApiNotFoundResponse({ description: 'No Event found for ID' })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Put('prisma/v1/:id')
    updateEvent(@Req() req: Request, @Res() res: Response, @Body() updateEventDto: EventDTO, @Param() { id }: FindOneParams)
    {
        return this.eventsService.updateEvent(req, res, Number(id),updateEventDto);
    }

    @ApiParam({
      name: "id",
      description: "The id is the only params to make this Delete request"
    })
    @ApiOkResponse({
        description: 'Event deleted successfully',
        type: EventDTO
    })
        @ApiNotFoundResponse({ description: 'No Event to delete match this ID' })
        @ApiInternalServerErrorResponse({
        description: 'Internal server error please can u try again.',
    })
    @Delete("prisma/v1/:id")
    deleteEvent(@Req() req: Request, @Res() res: Response, @Param() { id } : FindOneParams) {
        return this.eventsService.deleteEvent(req, res, Number(id));
    }
}
