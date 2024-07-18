import { MaxLength, IsString } from "class-validator";

export class ToDoParams {
    @IsString()
    @MaxLength(80)
    public name!: string;

    public startDate?: string | null;

    public endDate?: string | null;
}
