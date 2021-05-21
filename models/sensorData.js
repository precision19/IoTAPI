const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
        name:{
            type: String,
            require: true,
            
        },
        value:{
            type: Number,
            require: true
        }
    },
    {
        timestamps: true
    }
    ,{
        collection: 'sensorData'
    }
)
const sensorDataModel = mongoose.model('sensorData', sensorDataSchema);
module.exports = sensorDataModel;
