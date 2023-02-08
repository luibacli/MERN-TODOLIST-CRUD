const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);
const connectDB = require("./mongodb");
connectDB();

describe("Todo Routes", () => {
    let todoId;

    it("GET /api/todos returns a JSON", (done) => {
        request
            .get("/api/todos")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toBeInstanceOf(Object);
                done();
            });
    });

    it("POST /api/todo/new creates a new todo", (done) => {
        request
            .post("/api/todo/new")
            .send({ title: "Test Todo" })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                console.log(res.body);
                expect(res.body.title).toBe("Test Todo");
                todoId = res.body._id;
                done();
            });
    });

    it("GET /api/todo/toggleStatus/:id toggles the status of a todo", (done) => {
        request
            .get(`/api/todo/toggleStatus/${todoId}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                console.log(res.body);
                expect(res.body.complete).toBe(true);
                done();
            });
    });

    it("DELETE /api/todo/delete/:id deletes a todo", (done) => {
        request
            .delete(`/api/todo/delete/${todoId}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                console.log(res.body);
                expect(res.body._id).toBe(todoId);
                done();
            });
    });
});
