const { usersDB } = require("../../db/mongodb");

const setUser = async (req, res) => {
  try {
    const user = await usersDB.insertOne({
      ...req.body,
      role: "user",
      blocked: false,
    });
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    console.log("this is from set user");
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  setUser,
};
