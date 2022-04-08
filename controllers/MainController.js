const todoModel = require("../models/todoModel");

async function index(req, res){
    var t = await todoModel.find({})
    console.log(t)
    return res.render("index", {"tasks": t, "name":'alok'})
}

module.exports = {
    index
}