const { paymentDB } = require("../../../db/mongodb");

const searchinvoices = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    const skip = (page - 1) * pageSize;
    const count = await paymentDB.countDocuments({
      "paymentInfo.txid": { $regex: query, $options: "i" },
    });
    const totalPages = Math.ceil(count / pageSize);
    const invoices = await paymentDB
      .find({ "paymentInfo.txid": { $regex: query, $options: "i" } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();
    const startItem = skip + 1;
    const endItem = Math.min(skip + pageSize, count);
    return res.status(200).send({
      msg: "Success",
      data: invoices,
      currentPage: page,
      totalPages: totalPages,
      startView: `${startItem} - ${endItem}`,
      totalView: count,
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = searchinvoices;
