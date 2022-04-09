const mongoose = require('mongoose')

var todoSchema = mongoose.Schema({
    task : {type:String},
    status : {type:Boolean, default:false},
    date : {type:String},
})

var todoModel = mongoose.model('todos',todoSchema)

module.exports = todoModel;