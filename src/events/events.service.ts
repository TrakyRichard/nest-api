import { Injectable, Req, Res } from '@nestjs/common';
import { CreateEvent } from './dto/create-events-dto';
import { UpdateEvent } from './dto/update-event-dto';
import {v4 as uuidv4} from 'uuid';
import { PrismaService } from 'prisma/prisma.service';
import { EventNotFoundException } from 'src/shared/exceptions/eventNotFoundException';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'prisma/prismaError';
import { Request, Response } from "express";


@Injectable()
export class EventsService {

    constructor(private readonly prismaService: PrismaService) {}

    async findAllEvent(@Req() req: Request, @Res() res: Response) {
        await this.prismaService.event.findMany().then((docs) => {
            return res.status(200).json({
                requestUrl: req.url,
                EventsLenght: docs.length,
                doc: docs.map(doc => {
                    return {
                        message: "Events getted successfully",
                        doc: doc,
                        request: {
                            type: "GET/:id",
                            url: `http://localhost:5000/events/prisma/v1/${doc.id}`
                        }
                    }
                }) 
            })
        }).catch (error => {res.status(500).json({
            message: "Something fail",
            error: error
        })})
    }

    async findOneEvent(@Req() req: Request, @Res() res: Response, id: number) {
        await this.prismaService.event.findUnique({
            where: {
                id,
            },
        }).then (event => {
                if (!event)
                throw new EventNotFoundException(id, "Event");
            return res.status(200).json({
            requestUrl: req.url,
            event: event
        });
        }).catch (error => {res.status(500).json({
            message: "Something fail",
            error: error
        })});
        
    }

    async createEvent(@Req() req: Request, @Res() res: Response, eventCreated: CreateEvent)
    {
        return this.prismaService.event.create({
            data: eventCreated,
        }).then(result => {
            res.status(201).json({
                message: 'The event was created successfully',
                requestUrl: req.url,
                eventCreated: result,
                request: {
                    type: "GET/:id",
                    url: `http://localhost:5000/events/prisma/v1/${result.id}`
                }
            })
        }).catch (error => {res.status(500).json({
            message: "Something fail",
            error: error
        })})
    }

    async updateEvent(@Req() req: Request, @Res() res: Response, id: number, updateEvent: UpdateEvent) {
        try {
            await this.prismaService.event.update({
                data: {
                    ...updateEvent,
                    id: updateEvent.id,
                },
                where: {
                    id,
                },
            }).then((result) => {
                return res.status(201).json({
                    requestUrl: req.url,
                    message: "This event was updated successfully",
                    eventUpdated: result
                })
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === PrismaError.RecordDoesNotExist)
            {
                throw new EventNotFoundException(id, "Event");
            }
            res.status(500).json(
                {
                    message: "Something fail",
                    error: error
                }
            )
        }
    }

    async deleteEvent(@Req() req: Request, @Res() res: Response, id: number) {
       try {
        await this.prismaService.event.findUnique({
            where: {
                id,
            },
        }).then(result => {
            if (!result)
            return res.status(500).json(
            {
                message: 'The event doest not exist'
            });
            this.prismaService.event.delete({
               where: {
                   id,
               },
           }).then((_) => {
        
            return res.status(200).json({
                requestUrl: req.url,
                message: "This event was removed successfully",
            })
           })})
       } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === PrismaError.RecordDoesNotExist)
        {
            throw new EventNotFoundException(id, "Event");
        }
        res.status(500).json(
            {
                message: "Something fail",
                error: error
            }
        )
    }
    }
}
