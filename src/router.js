const { Router } = require("express");
const router = Router();

router.get("/health", function(req, res) {
  res.send("Up and running");
  // QUESTION: why this endpoint blocks the app?
});

module.exports = router;
