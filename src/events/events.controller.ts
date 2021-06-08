import { Body, Controller, Get, Post, Req, Res, } from '@nestjs/common';
import { CreateEventDto } from './dto/create-events-dto';
import { Request, Response } from "express";

@Controller('events')
export class EventsController {
    @Get()
    findAll(@Req() req: Request, @Res() res: Response): Response {
        console.log(req.url);
        return res.status(200).json({message: "All retrived"});
    }

    @Post()
    createEvent(@Body() eventCreated: CreateEventDto): string {
        return `Event created with title:${eventCreated.title}`;
    }
}
