function addTask(db, req, res) {

	if (!req.body || !req.body.name) {
		return next(new Error('No data provided.'));
	}

	var task = {
    name: req.body.name,
    completed: false,
		createTime: new Date()
  };

	db.collection('tasks')
		.insert(task, function(err, result) {
			if (err) throw err;
			res.redirect('/tasks');
		});

}

module.exports = addTask;