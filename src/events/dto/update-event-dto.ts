import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEvent {
    @ApiProperty()
    id: number;
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

export class MongoUpdateEvent {
    @ApiProperty()
    id: string;
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

