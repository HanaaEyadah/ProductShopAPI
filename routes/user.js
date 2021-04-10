const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  signup,
  signin,
  checkUsername,
} = require("../controllers/userController");
router.post("/signup", signup);
router.post(
  "/singin",
  passport.authenticate("local", { session: false }),
  signin
);

router.post("/checkUsername", checkUsername);

router.post(
  "/signout",
  passport.authenticate("local", { session: false }),
  signout
);

module.exports = router;
