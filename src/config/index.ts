import { config } from "dotenv";

config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export const CREDENTIALS = process.env.CREDENTIALS === "true";

export const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } =
    process.env;

export const { SERVER_PORT, SERVER_HOST, NODE_ENV, API_ROUTING_PREFIX } =
    process.env;

export const { SECRET_KEY } = process.env;
