import supertest from "supertest";
import app from "../app";

describe("API endpoint /todo", () => {
    //POST add new todo
    it("add successfully new todo to todo list", async () => {
        const res = await supertest(app).post("/todo").send({
            name: "new todo",
            startDate: "2021-01-01",
            endDate: "2021-01-02",
        });
        expect(res.status).toBe(201);
    });

    it("add new todo to todo list with missing both startDate and endDate", async () => {
        const res = await supertest(app).post("/todo").send({
            name: "new todo",
            startDate: "",
            endDate: "",
        });
        expect(res.status).toBe(200);
    });

    it("add new todo to todo list with missing startDate", async () => {
        const res = await supertest(app).post("/todo").send({
            name: "new todo",
            startDate: "",
            endDate: "2021-01-02",
        });
        expect(res.status).toBe(500);
    });

    it("add new todo to todo list with missing endDate", async () => {
        const res = await supertest(app).post("/todo").send({
            name: "new todo",
            startDate: "2021-01-01",
            endDate: "",
        });
        expect(res.status).toBe(200);
    });

    it("get todo by its id", async () => {
        const res = await supertest(app).get("/todo/1").send({
            name: "new todo",
            startDate: "2021-01-01",
            endDate: "2021-01-02",
        });
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual({
            id: 1,
            name: "Todo 4",
            startDate: "2024-07-01",
            endDate: "",
        });
    });

    it("delete todo", async () => {
        const res = await supertest(app).delete("/todo/1");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Deleted Successfully Todo: Todo 4");
    });
});
