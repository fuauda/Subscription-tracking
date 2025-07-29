const express = require("express");
const { getBlog, postBlog } = require("../controller/blog");

const router = express.Router()

router.get('/', getBlog)
router.post('/', postBlog)


module.exports = router