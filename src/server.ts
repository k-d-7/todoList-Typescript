import app from "./app";
import * as http from "http";
import { SERVER_HOST, SERVER_PORT, NODE_ENV } from "@/config";

const server = http.createServer(app);

const gratefulShutdown = () => {
    console.log("Shutting down gracefully");

    // close server
    server.close(() => {
        console.log("Closed out server connections");
        process.exit(0);
    });
    // if after 10 seconds, it's still not closed, then forcefully shut down
    setTimeout(() => {
        console.error(
            "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
    }, 1000);
};

process.on("SIGTERM", gratefulShutdown);
process.on("SIGINT", gratefulShutdown);
process.on("uncaughtException", (error) => {
    console.error("Uncaught exception", error);
    gratefulShutdown();
});

try {
    server.listen(SERVER_PORT, () => {
        console.log(
            `Server running in ${NODE_ENV} mode on http://${SERVER_HOST}/${SERVER_PORT}`
        );
    });
} catch (error) {
    console.log("Error starting server");
    console.log(error);
}
