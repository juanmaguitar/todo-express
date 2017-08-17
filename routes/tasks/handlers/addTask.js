const Task = require('../../../models/Task')

function addTask (req, res) {
  const { title } = req.body
  const task = new Task({ title })

  task.save()
    .then(() => {
      req.flash('success', 'Task added correctly!');
      res.redirect('/tasks')
    })
}

module.exports = addTask
