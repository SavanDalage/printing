const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = router;
