const { roomsDB } = require("../../db/mongodb");

const searchResult = async (req, res) => {
  try {
    const {
      region,
      country,
      area,
      startDate,
      endDate,
      adult,
      children,
      pets,
      infants,
    } = req.query;

    console.log(
      region,
      country,
      area,
      startDate,
      endDate,
      adult,
      children,
      pets,
      infants
    );
    const query = {
      $or: [
        { "location.city": { $regex: "" + area + "", $options: "i" } },
        { "location.country": { $regex: "" + country + "", $options: "i" } },
        { "location.region": { $regex: "" + region + "", $options: "i" } },
      ],
    };
    const details = await roomsDB.find(query).toArray();
    return res.status(200).send({ msg: "Success", data: details });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  searchResult,
};
