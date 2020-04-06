const Tasks = require('../models/to-do-list');

exports.getTasks = (req, res, next) => {
    Tasks.find()
    .exec()
    .then( tasks => {
        res.status(200).send({
            message: "Get Method: Get all tasks",
            success: true,
            data: tasks.map( task =>{
                return{
                    id: task._id,
                    task: task.task,
                    status: task.status
                }
            })
        });
    })
    .catch( error => {
            res.send({
            message: "Get Method failed",
            success: false,
            error: error
        })
    })
};

exports.addTask = (req, res, next) => {
    const task = new Tasks(req.body)
    task.
    save()
    .then( task => {
        res.send({
            message: "Post Method: Add item",
            success: true,
            data: {
                id: task._id,
                task: task.task,
                status: task.status
            }
        })
    })
    .catch( error => {
        res.send({
            message: "Post Method failed",
            success: false,
            error: error
        })
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
            res.send({
                message: "Updated Successfully",
                success: true,
                data: result
            })
        })
    )
    .catch(error => {
        res.send({
            message: "Updated Unsuccessfully",
            success: false,
            error: error
        })
    })
};

exports.deleteTask = (req, res, next) => {
    const id = req.params.taskID;
    Tasks.deleteOne({ _id: id})
    .exec()
    .then( result => {
        res.send({
            message: "Deleted Successfully",
            success: true,
            data: result
        });
    })
    .catch(error => {
        res.send({
            message: "Deleted unsuccessfully",
            success: false,
            error: error
        });
    })
};