const Task = require('../../../models/Task')

function removeTask (req, res) {
  const { id } = req.params
  Task.findByIdAndRemove(id)
    .then(() => res.send(`Task w/ id ${id} was removed succesfully`))
    .catch(() => res.send(`FAIL!! Task w/ id ${id} was NOT removed`))
}

module.exports = removeTask
