const { roomsDB } = require("../../../db/mongodb");

const searchResult = async (req, res) => {
  try {
    const {
      region,
      country,
      area,
      start,
      end,
      adults,
      children,
      pets,
      infants,
    } = req.query;
    const today = new Date();
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);
    const formattedDate = thirtyDaysLater.toISOString().slice(0, 10);
    const formattedToday = today.toISOString().slice(0, 10);

    const defaultRegion = country || area ? region : "Asian";

    const locationQuery = {
      $or: [
        { "location.city": { $regex: "" + area + "", $options: "i" } },
        { "location.country": { $regex: "" + country + "", $options: "i" } },
        {
          "location.region": { $regex: "" + defaultRegion + "", $options: "i" },
        },
      ],
    };

    const capacityQuery = {
      $and: [
        { "capacity.adults": { $gte: parseInt(adults) || 0 } },
        { "capacity.children": { $gte: parseInt(children) || 0 } },
        { "capacity.pets": { $gte: parseInt(pets) || 0 } },
        { "capacity.infants": { $gte: parseInt(infants) || 0 } },
      ],
    };

    const dateRangeQuery = {
      "dateRange.endDate": { $gte: new Date(start || formattedToday) },
      "dateRange.startDate": { $lte: new Date(end || formattedDate) },
    };
    const query = {
      $and: [locationQuery, capacityQuery, dateRangeQuery],
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
