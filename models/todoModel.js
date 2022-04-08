const mongoose = require('mongoose')

var todoSchema = mongoose.Schema({
    task : {type:String},
    status : {type:Boolean, default:true},
    date : {type:Date},
})

var todoModel = mongoose.model('tasks',todoSchema)

module.exports = todoModel;