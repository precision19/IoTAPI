const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./helpers/config').CONNECTION_STRING;

app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9999;

mongoose
    .connect(db, { useFindAndModify: false })
    .then(() =>{
        console.log("Database is connect");
    })
    .catch(err =>{
        console.log('Error: ', err.message);
    });

var router = require('./controllers/route')
app.use('/api/SensorDatas', router);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})