const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//x-www-form-urlencoded
router.post("/auth", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.json({
        success: true,
        message: "authentication failed. User not found",
      });
    } else {
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: "authentication failed. Wrong password",
        });
      } else {
        const token = jwt.sign({ user }, req.app.get("superSecret"));

        res.json({
          success: true,
          message: "Enjoy your token",
          token: token,
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
