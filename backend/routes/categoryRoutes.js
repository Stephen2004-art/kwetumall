import express from 'express';
import categoryModel from '../models/categoryModel.js';

const router = express.Router();

router.post('/create', async (req, res)=> {
    try {
        const newCategory = new categoryModel({
            name: req.body.name
        });
        const data = await newCategory.save()
        res.send(data);
    } catch (error) {
        console.log(error)
    }
        // .then((data)=> res.send(data))
})

router.get('/get', async (req, res)=>{
    try {
        const categories = await categoryModel.find()
        res.send(categories)
    } catch (error) {
        console.log(error)
    }
})
router.get('/:id', async (req, res)=>{
    try {
        console.log(req.params.id)
        const category = await categoryModel.findOne({_id: req.params.id})
        res.send(category)
    } catch (error) {
        console.log(error)
    }
})

router.post('/update/:id', async (req, res)=>{
    try {
        const category = await categoryModel.findOne({_id: req.params.id})
        category.name = req.body.name
        const result = await category.save()
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
router.post('/delete/:id', async (req, res)=>{
    try {
        await categoryModel.deleteOne({_id: req.params.id})
        res.send('Deleted Successfully')
    } catch (error) {
        console.log(error)
    }
})

export default router;