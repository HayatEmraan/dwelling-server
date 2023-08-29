const usersDB = require("../../../db/mongodb");

const getUsers = async (req, res) => {
  // get email from headers
  try {
    const users = await usersDB.find({}).toArray();
    return res.status(200).send({ msg: "Success", data: users });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};



module.exports = {
  getUsers,
};
