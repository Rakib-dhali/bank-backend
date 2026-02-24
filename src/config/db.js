const mongoose = require("mongoose")



function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("server connected to db");
    })
    .catch(err =>{
        console.log("error conneting db: ",err.message)
        process.exit(1)
    })
}

module.exports = connectToDB