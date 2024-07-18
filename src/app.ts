import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import express, { NextFunction, Request, Response } from "express";
import hpp from "hpp";
import morgan from "morgan";
import apiRoutes from "./routes";

// initialize express instance
const app = express();
const prefix = process.env.API_ROUTING_PREFIX || "/api/v1";

// middlewares
app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Internal server error");
});

// routes
apiRoutes.forEach((route) => {
    app.use(prefix, route.router);
});

export default app;
