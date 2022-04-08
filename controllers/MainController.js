const todoModel = require("../models/todoModel");


async function HomePage(req, res){
    let todo = await todoModel.find({}).sort({'status':1})
    let taskCount = await todoModel.countDocuments()

    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = (monthNames[date_ob.getMonth()])
    var dayName = days[date_ob.getDay()];

    var newDate = (dayName + "," + date + " " + month);

    console.log(taskCount)
    return res.render('index', {"todo":todo, "date":newDate, "taskCount":taskCount});
}

async function insert(req, res){
    let check = await todoModel.findOne({'task':req.body.task})

    if(check != null){
        await todoModel.findByIdAndUpdate(check._id,{'status':0})
    }
    else{
        var todo = new todoModel()
        todo.task = req.body.task
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

async function updateTask(req, res){
    let id = req.params.id
    let update = await todoModel.findByIdAndUpdate({_id:id},{task:req.body.task}, function(error, response){
        if(error) return error
        
        return res.redirect('/')
    })
}

module.exports = {
    HomePage, insert, closeTask, updateTask, removeTask
}