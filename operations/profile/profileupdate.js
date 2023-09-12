const { ObjectId } = require("mongodb");
const { usersDB } = require("../../db/mongodb");

const profileUpdate = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      name,
      address,
      city,
      phone,
      country,
      dob,
      postcode,
      organization,
      dialingCode,
    } = req?.body;
    const user = await usersDB.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          address,
          city,
          phone,
          country,
          dob,
          postcode,
          organization,
          dialingCode,
        },
      }
    );
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  profileUpdate,
};
