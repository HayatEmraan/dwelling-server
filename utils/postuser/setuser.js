const { usersDB } = require("../../db/mongodb");

const setUser = async (req, res) => {
  try {
    const formattedDate = formatDate(new Date());
    const user = await usersDB.insertOne({
      ...req.body,
      role: "user",
      blocked: false,
      createdAt: formattedDate,
    });
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    console.log("this is from set user");
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${hours}:${minutes}`;
}

module.exports = {
  setUser,
};
