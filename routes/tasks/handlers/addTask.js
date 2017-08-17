const Task = require('../../../models/Task')

function addTask (req, res) {
  const { title } = req.body
  const task = new Task({ title })

  task.save()
    .then(() => {
      req.flash('success', `Task "${title}" added correctly!`)
      req.flash('success', 'Todo bien!')
      req.flash('danger', 'Todo mal!')
      res.redirect('/tasks')
    })
}

module.exports = addTask
