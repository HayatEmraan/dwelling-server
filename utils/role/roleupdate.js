const { usersDB } = require("../../db/mongodb");

const roleUpdate = async (req, res, next) => {
  try {
    const user = await usersDB.updateOne(
      { email: req.body.email },
      { $set: { role: req.body.role } }
    );
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};
