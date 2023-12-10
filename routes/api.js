const express = require("express");

const router = express.Router();

router.get('/hello', async (_req, res) => {
  res.status(200).json({ count: 11 });
});

module.exports = router;