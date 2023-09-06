const { propertyDB } = require("../../../db/mongodb");

const searchProperty = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const skip = (page - 1) * pageSize;

    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    };
    const count = await propertyDB.countDocuments({});
    const totalPages = Math.ceil(count / pageSize);

    const properties = await propertyDB
      .find(searchFilter)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const startItem = skip + 1;
    const endItem = Math.min(skip + pageSize, count);

    return res.status(200).send({
      msg: "Success",
      data: properties,
      currentPage: page,
      totalPages: totalPages,
      startView: `${startItem} - ${endItem}`,
      totalView: count,
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  searchProperty,
};
