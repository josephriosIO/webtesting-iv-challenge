const request = require("supertest");

const server = require("./server");

describe("server.js", () => {
  it("sets the enviroment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("GET /", () => {
    it("using the squad (async/await)", async () => {
      // use the squad
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
  describe("POST ", () => {
    let data = {
      name: "dummy"
    };
    it("should return an 201 okay status", async () => {
      const response = await request(server)
        .post("/api/moviestars")
        .send(data);
      expect(response.status).toBe(201);
    });

    it("should return JSON object with new moviestar", async () => {
      const response = await request(server)
        .post("/api/moviestars")
        .send(data);
      expect(response.body).toHaveProperty("id");
    });

    it("should return application/json type", async () => {
      const response = await request(server).post("/api/moviestars");
      expect(response.type).toEqual("application/json");
    });
  });
  describe("DELETE / ", () => {
    it("should return an 200 okay status", async () => {
      const response = await request(server).delete(`/api/moviestars/:${1}`);

      expect(response.status).toBe(200);
    });

    it("should return application/json type", async () => {
      const response = await request(server).del("/api/moviestars/:id");
      expect(response.type).toEqual("application/json");
    });
  });
});
