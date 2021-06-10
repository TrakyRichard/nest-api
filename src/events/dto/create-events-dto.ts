export class CreateEventDto {
    readonly id?: string;
    readonly title: string;
    readonly desc?: string;
    readonly date: Date;
    readonly startTime: string;
    readonly endTime: string;
    readonly place: String
}