import express from 'express';
import pickupPointModel from '../models/pickupPointModel.js';

const router = express.Router();

    //creating a pickup point
router.post('/create', async (req, res)=> {
    try {
        const newPickupPoint = new pickupPointModel({
            location: req.body.location,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        const data = await newPickupPoint.save();
        res.send({
            message: 'Pickup Point Added Successfully!',
            data: data
        })
    } catch (error) {
        console.log(error)
        res.send({
            message: error.message
        })
    }
})

    //getting all pickup  points
router.get('/', async (req, res)=> {
    try {
        const pickupPoints = await pickupPointModel.find()
        res.send({
            message: 'Pick up points fetched successfully!',
            data: pickupPoints
        })
    } catch (error) {
        console.log(error)
        res.send({
            message: error.message
        })
    }
})

//getting one pickupPoint
router.get('/:id', async (req, res)=>{
    try {
        const pickupPoint = await pickupPointModel.findOne({_id: req.params.id})
        res.send({
            message: 'Fetched Pickup Point Successfully!',
            data: pickupPoint
        })
    } catch (error) {
        console.log(error)
        res.send({
            message: error.message
        })
    }
})

    //deleting one pickupPoint
router.post('/delete/:id', async (req, res)=>{
    try {
        await pickupPointModel.deleteOne({_id: req.params.id})
        res.send('Deleted Successfully')
    } catch (error) {
        console.log(error)
    }
})

// updating a pickup point
router.post('/editpickuppoint/:id', async (req, res)=>{
    console.log('editpickuppoint')
    console.log(req.body);
    let id = req.params.id;
    const pickupPoint = await pickupPointModel.findOne({_id: id});
    // pickupPoint.location = req.body.location;
    // pickupPoint.name = req.body.name;
    // pickupPOint.latitude = req.body.latitude;
    // pickupPoint.longitude = req.body.longitude;
    const result = await pickupPoint.save();
    console.log('Pickup Point updated succesfully');
    res.send({
        message: 'Pickup Point updated succesfully',
        data : result
    })
});

//getting one pickup point
//updating a pickup point
//deleting a pickup point


export default router;