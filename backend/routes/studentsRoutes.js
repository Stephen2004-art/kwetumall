import express from 'express';
import studentsModel from '../models/studentsModel.js';

const router = express.Router();

router.get('/details', async (req, res)=> {
    try {
        const newStudents = new studentsModel({
            name: req.body.name,
            yob: req.body.yob,
            grade: req.body.grade
        });
        const data = await newStudents.save()
        res.send(data);
    } catch (error) {
        console.log(error)
    }
        // .then((data)=> res.send(data))
})

router.get('/get', async (req, res)=>{
    try {
        const students = await studentsModel.find()
        res.send(students)
    } catch (error) {
        console.log(error)
    }
})
router.get('/:id', async (req, res)=>{
    try {
        console.log(req.params.id)
        const student = await studentsModel.findOne({_id: req.params.id})
        res.send(student)
    } catch (error) {
        console.log(error)
    }
})

router.post('/update/:id', async (req, res)=>{
    try {
        const student = await studentsModel.findOne({_id: req.params.id})
        student.name = req.body.name
        const result = await student.save()
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
router.post('/delete/:id', async (req, res)=>{
    try {
        await studentsModel.deleteOne({_id: req.params.id})
        res.send('Deleted Successfully')
    } catch (error) {
        console.log(error)
    }
})

export default router;