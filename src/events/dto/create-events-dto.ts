import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateEvent {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    desc: string;
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    createdDate: Date;
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    startDate: Date;
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    endDate: Date;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    place: string
}