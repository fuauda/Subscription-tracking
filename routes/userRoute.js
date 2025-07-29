const express = require("express");
const router = express.Router()
const { addUser, test } = require("../controller/user")

router.get('/', test)
router.post('/', addUser)


module.exports = router