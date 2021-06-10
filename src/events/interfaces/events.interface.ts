import { ApiProperty } from "@nestjs/swagger";

export class Event {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    desc: string;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    startTime: string;
    @ApiProperty()
    endTime: string;
    @ApiProperty()
    place: String
}