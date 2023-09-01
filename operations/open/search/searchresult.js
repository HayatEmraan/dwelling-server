const { roomsDB } = require("../../../db/mongodb");

const searchResult = async (req, res) => {
  try {
    const {
      region,
      country,
      area,
      start,
      end,
      adult,
      children,
      pets,
      infants,
    } = req.query;

    console.log(
      region,
      country,
      area,
      start,
      end,
      adult,
      children,
      pets,
      infants
    );

    const today = new Date();
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);
    const formattedDate = thirtyDaysLater.toISOString().slice(0, 10);

    const formattedToday = today.toISOString().slice(0, 10);
    console.log(formattedToday, formattedDate);

    const locationQuery = {
      $or: [
        { "location.city": { $regex: "" + area + "", $options: "i" } },
        { "location.country": { $regex: "" + country + "", $options: "i" } },
        { "location.region": { $regex: "" + region + "", $options: "i" } },
      ],
    };

    const capacityQuery = {
      $and: [
        { "capacity.adults": { $gte: parseInt(adult == 5) || 0 } },
        { "capacity.children": { $gte: parseInt(children) || 0 } },
        { "capacity.pets": { $gte: parseInt(pets) || 0 } },
        { "capacity.infants": { $gte: parseInt(infants) || 0 } },
      ],
    };
    const dateRangeQuery = {
      $and: [
        { "dateRange.endDate": { $gte: new Date(start) } },
        // 31 : 02
        { "dateRange.startDate": { $lte: new Date(end) } },
        // 01 : 10
      ],
    };
    const query = {
      $and: [{ $or: [locationQuery, capacityQuery] }],
    };

    const details = await roomsDB.find(capacityQuery).toArray();
    return res.status(200).send({ msg: "Success", data: details });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  searchResult,
};
