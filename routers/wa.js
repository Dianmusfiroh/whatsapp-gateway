const express = require("express");
const api = require("../controllers/waController");
const router = express.Router();


router.get ("/api", api);

// ini fungsingnya untuk export router wa.js agar bisa dipakai di file lain
module.exports = router;