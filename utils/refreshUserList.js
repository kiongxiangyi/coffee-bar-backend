const User = require("../models/User"); 

const refreshUserList = async () => {
  try {
    const user = await User.findAll({
      attributes: ["ID", "Benutzer", "Email", "Pin"],
    });
  } catch (error) {
    //res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = refreshUserList;
