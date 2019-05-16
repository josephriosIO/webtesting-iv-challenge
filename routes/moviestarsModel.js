const db = require("../database/dbConfig.js");

module.exports = {
  insert,
  findById,
  remove
};

async function insert(stars) {
  const [id] = await db("moviestars").insert(stars);

  return findById(id);
}

function findById(id) {
  return db("moviestars")
    .where({ id })
    .first();
}

function remove(id) {
  return db("moviestars")
    .where({ id })
    .del();
}
