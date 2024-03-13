const mongoose = require('mongoose')

const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(
    (res) =>{
        console.log("Shopping Cart Server Connected with Mongo DB Atlas");
    }
).catch((err) =>{
    console.log(err);
})