import { NotFoundException } from "@nestjs/common";

export class EventNotFoundException extends NotFoundException {
    constructor(eventId: number, eventName: String) {
        super(`${eventName} with id ${eventId} not found`)
    }
}