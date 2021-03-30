const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  
  try {
    const saltRounds = 10;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // res.json("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload ={
      id : newUser.id,
      username: newUser.username,
      exp: Date.now() + 900000,
    };
    const token = jwt.sign(JSON.stringify(payload),"asupersecretkey");
    res.json({token : token} );
  }catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  // console.log(`Attempting login for ${req.user.username}`);
  const {user}= req;
  const payload ={
    id: user.id,
    username: user.username,
    exp: Date.now() + 900000,
  };
  const token = jwt.sign(JSON.stringify(payload),"asupersecretkey");
  res.json({token:token});
} ;

  
