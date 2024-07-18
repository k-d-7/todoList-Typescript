import { DB_HOST, DB_PORT, DB_DATABASE } from "@/config";
import { ToDo } from "@/models/todo.model";
import { DataSource } from "typeorm";

export const dbConnection = new DataSource({
    type: "sqlite",
    database: "todolist",
    entities: [ToDo],
    synchronize: true,
    logging: true,
});
