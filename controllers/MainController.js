const todoModel = require("../models/todoModel");
// var dateTime = require('node-datetime');
const dateTime = require('date-and-time');
const now = new Date();
var time = dateTime.format(now, 'DD MMM hh:mm A');   // => '07:14 AM GMT+0000'


async function HomePage(req, res){
    let todo = await todoModel.find({}).sort({'status':1})
    let taskCount = await todoModel.find({"status":0}).countDocuments()

    var newDate = dateTime.format(now, 'ddd, DD MMM YYYY');       // => 'Fri, Jan 02 2015'

    console.log(time)

    return res.render('index', {"todo":todo, "date":newDate, "taskCount":taskCount});
}

async function insert(req, res){
    let check = await todoModel.findOne({'task':req.body.task})

    if(check != null){
        await todoModel.findByIdAndUpdate(check._id,{'status':0, 'date':time})
    }
    else{
        var todo = new todoModel()
        todo.task = req.body.task
        todo.date = time
        todo.save()

    }

    res.redirect('/')
}

function closeTask(req, res){
    let id = req.params.id
    // console.log(id)
    todoModel.findByIdAndUpdate({_id:id},{status:1}, function(error, response){
        if(error) return error
        
        return res.redirect('/')
    })
}

function removeTask(req, res){
    let id = req.params.id
    // console.log(id)
    todoModel.findByIdAndRemove({_id:id}, function(error, response){
        if(error) return error
        
        return res.redirect('/')
    })
}

function updateTask(req, res){
    let id = req.params.id
    todoModel.findByIdAndUpdate({_id:id},{task:req.body.task}, function(error, response){
        if(error) return error
        
        return res.redirect('/')
    })
}

module.exports = {
    HomePage, insert, closeTask, updateTask, removeTask
}