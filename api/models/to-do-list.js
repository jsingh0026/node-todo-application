const mongoose = require('mongoose');

const todoSchema = {
    task: { 
        type: String, 
        required: true
    },
    status: { type: Boolean, default: false }
};

module.exports = mongoose.model('ToDo', todoSchema);