import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EventDocument = EventModel & Document;

@Schema()
export class EventModel {
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    desc: String;

    @Prop()
    place: String;

    @Prop()
    createdDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    EndDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);