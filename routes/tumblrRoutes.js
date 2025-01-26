const express = require("express");
const { scrapePosts } = require("../controllers/tumblrController");
const router = express.Router();

router.post("/search", scrapePosts);

router.get("/", (req, res) => {
    res.send("Hola Mundo");
});
  

module.exports = router;
