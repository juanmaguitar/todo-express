function getCompletedTasks (db, req, res) {
  db.collection('tasks')
    .find({ completed: true })
    .toArray(function (err, completedTasks) {
      if (err) throw err
      res.render('tasks_completed', {
        title: 'Todo List',
        currentUrl: '/tasks/completed',
        tasks: completedTasks
      })
    })
}

module.exports = getCompletedTasks
