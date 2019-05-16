const Moviestars = require("./moviestarsModel.js");
const db = require("../database/dbConfig");

describe("moviestars models", () => {
  beforeEach(async () => {
    await db("moviestars").truncate();
  });
  describe("insert()", () => {
    it("should insert moviestar", async () => {
      await Moviestars.insert({ name: "Brad Pitt" });
      const moviestars = await db("moviestars");

      expect(moviestars).toHaveLength(1);
    });
    it("should provide correct moviestar", async () => {
      let moviestar = await Moviestars.insert({ name: "Will Smith" });
      expect(moviestar.name).toBe("Will Smith");
      moviestar = await Moviestars.insert({ name: "Jaden Smith" });
      expect(moviestar.name).toBe("Jaden Smith");

      const moviestars = await db("moviestars");
      expect(moviestars).toHaveLength(2);
    });
  });
  describe("remove()", () => {
    it("should remove moviestar", async () => {
      let moviestar = await Moviestars.insert({ name: "Will Smith" });
      let deleted = await Moviestars.remove(moviestar.id);

      expect(deleted).toBe(1);
    });
  });
});
