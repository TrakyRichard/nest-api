import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEvent {
    @ApiProperty({
        description: "this is the title of the event",
        type: String,
        default: "title"
    })
    @IsString()
    @IsNotEmpty()
    title: string;
    @ApiProperty(
        {
        description: "this is the description of the event",
        type: String,
        default: "description"
        }
    )
    @IsString()
    @IsNotEmpty()
    desc: string;
    @ApiProperty({
        description: "this is the date of creation of the event",
        type: Date,
        default: "2021-06-13T16:31:39.122Z"
    })
    @IsDate()
    @IsNotEmpty()
    createdDate: Date;
    @ApiProperty({
        description: "this is the date of start of the event",
        type: Date,
        default: "2021-06-13T16:31:39.122Z"
    })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;
    @ApiProperty({
        description: "this is the date of end of the event",
        type: Date,
        default: "2021-06-13T16:31:39.122Z"
    })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;
    @ApiProperty({
        description: "this is the date of creation of the event",
        type: String,
        default: "Niger"
    })
    @IsString()
    @IsNotEmpty()
    place: string

}