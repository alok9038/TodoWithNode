var mongoose = require('mongoose')

const url = "mongodb://localhost:27017/todo"

mongoose.connect(url, function(error){
    if(error){
        console.log(error)
    }else{
        console.log('connected')
    }
})

module.exports = mongoose