
const database  = require("../Database/MongoDB");
const token = require("../token/jwt");

module.exports.users = async (req, res) => {
  const userToken = req.headers.authorization?.split(" ")[1];
  if (!userToken) {
    return res.status(401).send("Access token required");
  }
  try {
    await token.verifyToken(userToken);

    await database.client.connect();
    const data = await database.usersCollection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
