import { Injectable } from '@nestjs/common';
import { Event } from './interfaces/events.interface';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class EventsService {
    private  events: Event[] = [
        {
            id: '1',
            title: "Dentiste",
            desc: "Je souffre de mal de dents",
            date: new Date("2019-01-16"),
            startTime: "10H30",
            endTime: "12H30",
            place: "Harobanda",
        },
        {
            id: '2',
            title: "Dentiste",
            desc: "Je souffre de mal de dents",
            date: new Date("2019-01-16"),
            startTime: "10H30",
            endTime: "12H30",
            place: "Harobanda",
        },
        {
            id: '3',
            title: "Dentiste",
            desc: "Je souffre de mal de dents",
            date: new Date("2019-01-16"),
            startTime: "10H30",
            endTime: "12H30",
            place: "Harobanda",
        }
    ];

    findAllEvent(): Event[] {
        return this.events;
    }

    findOneEvent(id: string): Event {
        return this.events.find(event => event.id === id)
    }

    createEvent(eventCreated: Event): Event[]
    {
        this.events.push({...eventCreated, id: uuidv4()});
        return this.events;
    }

    updateEvent(id: string, updateEvent: Event): Event[] {
        const eventToBeUpdated = this.events.find(event => event.id === id);
        const index = this.events.indexOf(eventToBeUpdated);
        console.log(this.events[index]);
        console.log(updateEvent);

        if (index !== -1)
            this.events[index] = updateEvent;
        return this.events;
    }

    deleteEvent(id: string) : Event[] {
        this.events = this.events.filter((user) => user.id === id);
        return this.events;
    }
}
