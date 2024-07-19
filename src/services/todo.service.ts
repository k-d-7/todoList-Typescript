import { dbConnection } from "@/database";
import { IToDo } from "@/interfaces/todo.interface";
import { ToDo } from "@/models/todo.model";
import { ToDoParams } from "@/params/params";
import { isEmpty, isFormatDate } from "@/utils/validate";
import { notEqual } from "assert";

class ToDoService {
    private todoRepository = dbConnection.getRepository(ToDo);
    public async createToDo(params: ToDoParams): Promise<ToDo> {
        if (isEmpty(params)) {
            throw new Error("Invalid ToDo parameters");
        }

        if (params.endDate != null && params.endDate != "") {
            if (!isFormatDate(params.endDate)) {
                throw new Error("Invalid endDate format");
            }

            if (params.startDate == null || params.startDate == "") {
                throw new Error("Missing startDate");
            } else {
                if (!isFormatDate(params.startDate)) {
                    throw new Error("Invalid startDate format");
                }

                const startDate = new Date(params.startDate);
                const endDate = new Date(params.endDate);
                if (startDate > endDate) {
                    throw new Error("startDate is greater than endDate");
                }
            }
        }

        if (
            params.startDate != null &&
            params.startDate != "" &&
            !isFormatDate(params.startDate)
        ) {
            throw new Error("Invalid startDate format");
        }

        const todo = new ToDo();
        todo.name = params.name;
        todo.startDate = params.startDate || undefined;
        todo.endDate = params.endDate || undefined;

        const newToDo = await this.todoRepository.save(todo);
        if (!newToDo) {
            throw new Error("Error creating ToDo");
        }

        return newToDo;
    }

    public async getToDosByName(todoName: string): Promise<ToDo[]> {
        const todos = await this.todoRepository.findBy({
            name: todoName,
        });
        if (!todos) {
            throw new Error("Cannot find ToDo by name " + todoName);
        }

        return todos;
    }

    public async getToDosById(todoId: number): Promise<ToDo> {
        const todos = await this.todoRepository.findOneBy({
            id: todoId,
        });
        if (!todos) {
            throw new Error("Cannot find ToDo by id " + todoId);
        }

        return todos;
    }

    public async getAllToDos(): Promise<ToDo[]> {
        const todos = await this.todoRepository.find();
        if (!todos) {
            throw new Error("Cannot find any ToDo");
        }

        console.log("Todos: ", todos);
        // console.log("All ToDo : " + todos);
        // const result: IToDo[] = JSON.parse(JSON.stringify(todos));
        // console.log("All todo: " + result);

        return todos;
    }

    public async updateToDoById(
        todoId: number,
        params: ToDoParams
    ): Promise<ToDo> {
        if (isEmpty(params)) {
            throw new Error("Invalid ToDo parameters");
        }

        if (params.endDate != null && params.endDate != "") {
            if (!isFormatDate(params.endDate)) {
                throw new Error("Invalid endDate format");
            }

            if (params.startDate == null || params.startDate == "") {
                throw new Error("Missing startDate");
            } else {
                if (!isFormatDate(params.startDate)) {
                    throw new Error("Invalid startDate format");
                }

                const startDate = new Date(params.startDate);
                const endDate = new Date(params.endDate);
                if (startDate > endDate) {
                    throw new Error("startDate is greater than endDate");
                }
            }
        }

        if (
            params.startDate != null &&
            params.startDate != "" &&
            !isFormatDate(params.startDate)
        ) {
            throw new Error("Invalid startDate format");
        }

        const todo = await this.todoRepository.findOneBy({
            id: todoId,
        });
        if (!todo) {
            throw new Error("Cannot find ToDo by id " + todoId);
        }

        todo.name = params.name;
        todo.startDate = params.startDate || undefined;
        todo.endDate = params.endDate || undefined;
        const updatedToDo = await this.todoRepository.save(todo);
        if (!updatedToDo) {
            throw new Error("Error updating ToDo by id " + todoId);
        }

        return updatedToDo;
    }

    public async deleteToDoById(todoId: number): Promise<string> {
        const todo = await this.todoRepository.findOneBy({
            id: todoId,
        });
        if (!todo) {
            throw new Error("Cannot find ToDo by id " + todoId);
        }

        await this.todoRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: todoId })
            .execute();
        return todo.name;
    }
}

export default ToDoService;
