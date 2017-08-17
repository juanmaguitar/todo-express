const express = require('express')
const router = express.Router()

const addTask = require('./handlers/addTask')
const getTasks = require('./handlers/getTasks')

router.post('/', addTask)
router.get('/', getTasks)

module.exports = router