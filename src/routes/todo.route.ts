import { Router } from "express";
import { Route } from "./index.routes";
import ToDoController from "./../controllers/todo.controller";

export default class ToDoRoutes implements Route {
    public router = Router();
    public ToDoController = new ToDoController();
    public path = "/todo";

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.ToDoController.createToDo);
        this.router.get(
            `${this.path}/:name`,
            this.ToDoController.getToDosByName
        );
        this.router.get(`${this.path}/:id`, this.ToDoController.getToDosById);
        this.router.get(`${this.path}/all`, this.ToDoController.getAllToDos);
        this.router.patch(
            `${this.path}/:id`,
            this.ToDoController.updateToDoById
        );
        this.router.delete(
            `${this.path}/:id`,
            this.ToDoController.deleteToDoById
        );
    }

    public getRoutes(): Route[] {
        return [
            {
                path: `${this.path}`,
                router: this.router,
            },
        ];
    }
}
