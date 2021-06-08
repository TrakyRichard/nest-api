import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, } from '@nestjs/common';
import { CreateEventDto } from './dto/create-events-dto';
import { Request, Response } from "express";

@Controller('events')
export class EventsController {
    @Get()
    findAll(@Req() req: Request, @Res() res: Response): Response {
        console.log(req.url);
        return res.status(200).json({message: "All retrived"});
    }

    @Get('/:eventId')
    findEvent(@Param('eventId') eventId): String {
        return `eventId ${eventId}`;
    }

    @Post()
    createEvent(@Body() eventCreated: CreateEventDto): string {
        return `Event created with title:${eventCreated.title}`;
    }

    @Put('/:eventId')
    putEvent(@Body() updateEventDto: CreateEventDto, @Param('eventId') eventId): string
    {
        return `Event ${eventId} updated with title ${updateEventDto.title}`;
    }

    @Delete("/:eventId")
    deleteEvent(@Param('eventId') eventId) : string {
        return `event ${eventId} deleted`;
    }
}
