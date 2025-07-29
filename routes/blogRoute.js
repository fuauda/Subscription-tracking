const express = require("express");
const { getBlog } = require("../controller/blog");

const router = express.Router()

router.get('/', getBlog)


module.exports = router