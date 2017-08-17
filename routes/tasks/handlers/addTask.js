const Task = require('../../../models/Task')

function addTask (req, res) {
  const { title } = req.body
  const task = new Task({ title })

  task.save()
    .then(() => {
      const { maxTasks } = req.app.locals
      req.flash('success', `Task "${title}" added correctly!`)
      req.flash('info', 'Remember that the maximum of tasks is ' + maxTasks)
      res.redirect('/tasks')
    })
}

module.exports = addTask
