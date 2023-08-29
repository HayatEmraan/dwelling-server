const { usersDB } = require("../../db/mongodb");

const setUser = async (req, res) => {
  try {
    const user = await usersDB.insertOne(req.body);
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  setUser,
};
