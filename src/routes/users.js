const { Router } = require("express");
const router = Router();

const User = require("../models/user");
const requireAuth = require("../middleware/auth");
const config = require("../config");

const initAdminUser = async () => {
  const { adminEmail, adminPassword } = config;

  const user = await User.findOne({email: adminEmail})
  if (!user) {
    const adminUser = await User.create({
      email: adminEmail,
      password: adminPassword,
      admin: true,
    });

    await adminUser.save();
    console.log('admin user created');
  }
};

router.get("/users", requireAuth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

initAdminUser();

module.exports = router;
