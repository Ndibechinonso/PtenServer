const mongoose = require('mongoose');

// const mongo_uri = 'mongodb://localhost/react-auth';

const mongo_uri = 'mongodb+srv://nonso1:pipper@cluster0.h3kxv.mongodb.net/pten?retryWrites=true&w=majority';

const dbconnection = mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    else{
        console.log(`Successfully connected to ${mongo_uri}`);
    }
})


module.exports = dbconnection;