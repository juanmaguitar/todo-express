function completeAllTasks (db, req, res) {
  db.collection('tasks')
    .update(
      { 'completed': false },
      { $set:
        {
          'completed': true,
          'completeTime': new Date()
        }
      },
      { multi: true },
      function (err, result) {
        if (err) throw err
        console.log(result)
        res.status(200).send()
      }
    )
}

module.exports = completeAllTasks
