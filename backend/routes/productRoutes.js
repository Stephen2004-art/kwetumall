import express from 'express';
import productModel from '../models/productModel.js';
import multer from 'multer'
import fs from 'fs'

const router = express.Router();

const upload = multer({dest: 'uploads/'});
const uploadProductImages = upload.fields([
    {name: 'image', maxCount: 1}
])
router.post('/create', uploadProductImages, async (req, res)=> {
    console.log(req.files.image[0]);
    let img = req.files.image[0]
    let fileType = (img.mimetype).split('/')[1]
    let newFileName = img.filename+ '.'+ fileType
    fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, ()=>{
        console.log('File renamed successfully!')
    })
    res.send('ok')
})

export default router;