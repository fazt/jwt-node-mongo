const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello! Welcome to the Api");
});

module.exports = router;
