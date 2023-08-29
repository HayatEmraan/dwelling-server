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
    console.log(formattedDate, formattedDate);

    const locationQuery = {
      $or: [
        { "location.city": { $regex: "" + area + "", $options: "i" } },
        { "location.country": { $regex: "" + country + "", $options: "i" } },
        { "location.region": { $regex: "" + region + "", $options: "i" } },
      ],
    };

    const capacityQuery = {
      $or: [
        { "capacity.adults": { $gte: parseInt(adult) } },
        { "capacity.children": { $gte: parseInt(children) } },
        { "capacity.pets": { $gte: parseInt(pets) } },
        { "capacity.infants": { $gte: parseInt(infants) } },
      ],
    };

    // const dateRangeQuery = {
    //   $and: [
    //     {
    //       "dateRange.startDate": { $lte: endDate },
    //       "dateRange.endDate": { $gte: startDate },
    //     },
    //   ],
    // };
    // const query = {
    //   $and: [{ $or: [locationQuery, capacityQuery] }],
    // };
    const details = await roomsDB.find(capacityQuery).toArray();
    return res.status(200).send({ msg: "Success", data: details });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  searchResult,
};
