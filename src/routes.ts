import IndexRoutes, { Route } from "@routes/index.routes";
import ToDoRoutes from "./routes/todo.route";

// initialize route instance
const apiRoutes: Route[] = [new IndexRoutes(), new ToDoRoutes()];

export default apiRoutes;
