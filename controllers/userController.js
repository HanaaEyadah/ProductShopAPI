const bcrypt = require("bcrypt");
const { User, Token } = require("../db/models");
const jwt = require("jsonwebtoken");

exports.checkUsername = async (req, res, next) => {
  try {
    let available = true;
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) available = false;

    res.json({ available });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: user.id,
      username: newUser.username,
      exp: Date.now() + 900000,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    const tokenExists = await Token.findOne({
      where: { token },
    });
    if (tokenExists) {
      res.json({ authentication: "false", message: "User already signed in" });
    } else {
      await Token.create({ token: token });
      res.json({ authentication: "true", token });
    }
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  const user = req.body;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 900000,
  };
  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  if (false) {
    res.json({ authentication: "false", message: "User already signed in" });
  } else {
    res.json({ authentication: "true", token });
  }
};

exports.signout = async (req, res) => {
  const user = req.body;
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  const tokenExists = await Token.findOne({
    where: { token },
  });
  if (tokenExists) {
    tokenExists.destroy();
    res.json({ message: "User Signed out" });
  } else {
    res.json({ message: "Already Signed out" });
  }
};
