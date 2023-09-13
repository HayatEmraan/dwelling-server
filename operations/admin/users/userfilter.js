const { usersDB } = require("../../../db/mongodb");

const usersFilter = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const skip = (page - 1) * pageSize;

    const userFilter = { role: query };

    const count = await usersDB.countDocuments(userFilter);
    const totalPages = Math.ceil(count / pageSize);

    const users = await usersDB
      .find(userFilter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const startItem = skip + 1;
    const endItem = Math.min(skip + pageSize, count);

    if (!users) return res.status(401).send({ msg: "Unauthorized access" });

    return res.status(200).send({
      msg: "Success",
      data: users,
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
  usersFilter,
};
