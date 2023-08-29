const verifyAdmin = (req, res, next) => {
  try {
    const id = req.uid;
    const user = usersDB.findOne({ _id: id, role: "admin" });
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  verifyAdmin
}