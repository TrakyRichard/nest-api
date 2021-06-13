import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { EventDTO } from './dto/Event';
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

    @Get("mongodb/v1")
    findAllEventFromMongo(@Req() req: Request, @Res() res: Response)
    {
      return this.eventsService.findAllEventFromMongo(req, res);
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
    @Get('mongodb/v1/:id')
    findOneEventFromMongobd(@Req() req: Request, @Res() res: Response, @Param('id') id)
    {
      return this.eventsService.findOneEventFromMongobd(req, res, id);
    }

    @ApiCreatedResponse({ description: 'The record has been successfully created.',
        type: EventDTO
      })
      @ApiInternalServerErrorResponse({
        description: 'Internal server error',
      })
    @Post('mongodb/v1')
    createEventFromMongo(@Req() req: Request, @Res() res: Response, @Body() eventCreated: EventDTO) {
      return this.eventsService.createEventFromMongo(req, res, eventCreated)
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

    @Put('mongodb/v1/:id')
    updateEventFromMongodb(@Req() req: Request, @Res() res: Response, @Param('id') id, @Body() updatedEvent: EventDTO)
    {
      return this.eventsService.updateEventFromMongo(req, res, updatedEvent ,id);
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

    @Delete('mongodb/v1/:id')
    deleteEventFromMongodb(@Req() req: Request, @Res() res: Response, @Param('id') id)
    {
      return this.eventsService.deleteFromMongodb(req,res,id);
    }
}
