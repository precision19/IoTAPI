const express = require('express');
const router = express.Router();
const sensorData = require('../models/sensorData')

router.post('/', async(req, res) =>{
    var newSensorData = new sensorData({
        name: req.body.name,
        value: req.body.value
    })
    await newSensorData
        .save()
        .then(() => {
            res.status(201).json(newSensorData).end();
        })
        .catch(err => {
            res.status(401).send({Error: $(err)});
        })
})

router.get('/', async(req, res) => {
    const sensors = await sensorData.find({});
    try{
        res.status(200).json(sensors)
    }
    catch(err){
        res.status(505).send({'Error': err})
    }
})

router.get('/:sensorID', async(req, res) => {
    var sid = req.params.sensorID;
    // console.log(sid);
    sensorData.findOne({_id: sid})
        .then(data => {
            if(!data){
                res.status(505).json({err: 'ID not found'}).end();
            }
            else{
                res.status(200).json(data).end();
            }
        })
        .catch(err => {
            res.status(505).send({Error: err});
        })
})

router.put('/:sensorID', async(req, res) => {
    var sid = req.params.sensorID;
    // console.log(sid);
    sensorData.findByIdAndUpdate({_id: sid},req.body).then(function(){
        sensorData.findOne({_id: sid}).then(function(sensor){
            res.status(204).end()
        })
    })
    .catch(err => {
        res.status(505).send({Error: err});
    })
})

router.delete('/:sensorID', async(req, res) => {
    var sid = req.params.sensorID;
    sensorData.findByIdAndRemove({_id: sid}).then(function(sensor){
        res.status(200).json(sensor).end();
    })
    .catch(err => {
        res.status(505).send({Error: err});
    })
})


module.exports = router;