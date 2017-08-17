const express = require('express')
const router = express.Router()

const removeTask = require('./handlers/removeTask')

router.delete('/:id', removeTask)

module.exports = router
