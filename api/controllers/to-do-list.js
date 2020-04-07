const Tasks = require('../models/to-do-list');
const customResponse = require('../middlewares/customResponse');

exports.getTasks = (req, res, next) => {
    Tasks.find()
    .exec()
    .then( tasks => {
        res.send(customResponse('Get Tasks', true, tasks));
    })
    .catch( error => {
            res.send("Get method failed", false, error);
    })
};

exports.addTask = (req, res, next) => {
    const task = new Tasks(req.body)
    task.
    save()
    .then( task => {
        res.send(customResponse("Task added", true, task))
    })
    .catch( error => {
        res.send("Task not added", false, error)
    })
};

exports.updateTask = (req, res, next) => {
    const id = req.params.taskID ;
    Tasks.findByIdAndUpdate({ _id: id }, req.body)
    .exec()
    .then(
        Tasks.findOne({ _id: id })
        .exec()
        .then( result => {
            res.send(customResponse('updated', true, result))
        })
    )
    .catch(error => {
        res.send(customResponse('not updated', false, error))
    })
};

exports.deleteTask = (req, res, next) => {
    const id = req.params.taskID;
    Tasks.deleteOne({ _id: id})
    .exec()
    .then( result => {
        res.send(customResponse('deleted', true, result));
    })
    .catch(error => {
        res.send('not deleted', false, error);
    })
};