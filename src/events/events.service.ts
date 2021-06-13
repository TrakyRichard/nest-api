import { Injectable, Req, Res } from '@nestjs/common';
import { EventDTO } from './dto/Event';
import { Request, Response } from "express";
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument, EventModel } from 'src/events/schema/event.schema';
import { Model } from 'mongoose';


@Injectable()
export class EventsService {

    constructor(@InjectModel(EventModel.name) private eventModel: Model<EventDocument>) {}

    async findAllEventFromMongo(@Req() req: Request, @Res() res: Response) {
        return await this.eventModel.find().exec().then((docs) => {
            return res.status(200).json({
                requestUrl: req.url,
                EventsLenght: docs.length,
                doc: docs.map(doc => {
                    return {
                        message: "Events getted successfully",
                        doc: doc,
                        request: {
                            type: "GET/:id",
                            url: `http://localhost:5000/events/mongodb/v1/${doc._id}`
                        }
                    }
                }) 
            })
        }).catch (error => {res.status(500).json({
            message: "Something fail",
            error: error
        })});
    }

    async findOneEventFromMongobd(@Req() req: Request, @Res() res: Response, id: string) {
        return await this.eventModel.findOne({_id: id}).exec().then(event => {
            if (!event)
            throw res.status(200).json({
                message: "the event with id"+ id +" is not found"
            });
        return res.status(200).json({
        requestUrl: req.url,
        event: event
    });
    }).catch (error => {res.status(500).json({
        message: "Something fail",
        error: error
    })});;
    }

    async createEventFromMongo(@Req() req: Request, @Res() res: Response, createdEventDto: EventDTO)
    {
        const createdEvent = new this.eventModel(createdEventDto);
        return await createdEvent.save().then(result => {
            res.status(201).json({
                message: 'The event was created successfully',
                requestUrl: req.url,
                eventCreated: result,
                request: {
                    type: "GET/:id",
                    url: `http://localhost:5000/events/v1/${result.id}`
                }
            })
        }).catch (error => {res.status(500).json({
            message: "Something fail",
            error: error
        })});
    }

    async updateEventFromMongo(@Req() req: Request, @Res() res: Response,updatedEvent: EventDTO, id: string) {
        return await this.eventModel.updateOne({...updatedEvent }).exec().then((result) => {
            return res.status(201).json({
                requestUrl: req.url,
                message: "This event was updated successfully",
                eventUpdated: result
            })
        }).catch(error => {
            return res.status(500).json(
                {
                    message: "Something fail",
                    error: error.message
                }
        );
    })
    }

    async deleteFromMongodb(@Req() req: Request, @Res() res: Response, id: string) {
        return await this.eventModel.deleteOne({_id: id}).exec().then((result) => {
        
            return res.status(200).json({
                requestUrl: req.url,
                message: "This event was removed successfully",
                eventRemoved: result
            })
           })
       .catch ((error) => {
        res.status(500).json(
            {
                message: "Something fail",
                error: error
            }
        )
    })
    }
}
