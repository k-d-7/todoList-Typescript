import { ToDo } from "@/models/todo.model";
import { ToDoParams } from "@/params/params";
import ToDoService from "@/services/todo.service";
import { NextFunction, Request, Response } from "express";

export default class ToDoController {
    public todoService = new ToDoService();

    public createToDo = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params: ToDoParams = req.body;
            const todo: ToDo = await this.todoService.createToDo(params);
            res.status(201).json({
                data: todo,
                message: "Create new ToDo successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public getToDosByName = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const todoName: string = req.params.name;
            const todos: ToDo[] =
                await this.todoService.getToDosByName(todoName);
            res.status(200).json({
                data: todos,
                message: "ToDo is retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public getToDosById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const todoId: number = parseInt(req.params.id);
            const todos: ToDo[] = await this.todoService.getToDosById(todoId);
            res.status(200).json({
                data: todos,
                message: "ToDo is retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public getAllToDos = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const todos: ToDo[] = await this.todoService.getAllToDos();
            res.status(200).json({
                data: todos,
                message: "ToDos are retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public updateToDoById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const todoId: number = parseInt(req.params.id);
            const params: ToDoParams = req.body;
            const todo: ToDo = await this.todoService.updateToDoById(
                todoId,
                params
            );
            res.status(200).json({
                data: todo,
                message: "Updated ToDo " + todoId + "Successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteToDoById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const todoId: number = parseInt(req.params.id);
            const todoName: string =
                await this.todoService.deleteToDoById(todoId);
            res.status(200).json({
                message: "Deleted Successfully Todo: " + todoName,
            });
        } catch (error) {
            next(error);
        }
    };
}
