const { ObjectId } = require("mongodb");
const { usersDB, hostDB } = require("../../../db/mongodb");

const hostUpdate = async (req, res) => {
  try {
    const { uid } = req.uid;
    const checkuser = await usersDB.findOne({ _id: new ObjectId(uid) });
    const { name } = checkuser;
    const { id, decision, role } = req.query;

    const hostUpdate = await hostDB.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { status: decision, checkedBy: name },
      }
    );

    const user = await usersDB.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { role: role },
      }
    );
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  hostUpdate,
};
