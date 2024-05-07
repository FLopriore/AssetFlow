const verifyToken = require('../middleware/verifyToken.js');

const verify = async (req,res) => {res.status(200).json({message: "User Logged"});};

module.exports = verify;