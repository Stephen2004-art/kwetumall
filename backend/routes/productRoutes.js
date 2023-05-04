import express from 'express';
import productModel from '../models/productModel.js';
import multer from 'multer'
import fs from 'fs'

const router = express.Router();

router.get('/get', async (req, res)=>{
    //getting all products
    try {
        const products = await productModel.find()
        res.send({
            message: 'Fetched products successfully!!',
            data: products
        })
    } catch (error) {
        console.log(error)
        res.send({
            message: 'Failed'
        })
    }
})

router.get('/:id', async (req, res)=>{
    //getting one product
    try {
        const product = await productModel.findOne({_id: req.params.id})
        res.send({
            message: 'Fetched Products Successfully!',
            data: product
        })
    } catch (error) {
        console.log(error)
        res.send({
            message: 'Failed'
        })
    }
})

router.post('/delete/:id', async (req, res)=>{
    try {
        await productModel.deleteOne({_id: req.params.id})
        res.send('Deleted Successfully')
    } catch (error) {
        console.log(error)
    }
})

//this route updates a product
router.post('/editproduct/:id', async (req, res)=>{
    console.log('editproduct')
    console.log(req.body);
    let id = req.params.id;
    const product = await productModel.findOne({_id: id});
    // product.name = req.body.name;
    product.description = req.body.description;
    // product.main_image = req.body.mainImage;
    // product.category = req.body.category;
    // product.price = req.body.price;
    const result = await product.save();
    // console.log('Product updated succesfully');
    res.send({
        message: 'Product updated succesfully',
        data : result
    })
});

const upload = multer({dest: 'uploads/'});
const uploadProductImages = upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'images', maxCount: 4}
])
router.post('/create', uploadProductImages, async (req, res)=> {
    try {
        // uploading one image
        console.log(req.files.image[0]);
        let img = req.files.image[0];
        let fileType = (img.mimetype).split('/')[1];
        console.log(fileType)
        let newFileName = img.filename+ '.'+ fileType;
        fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, ()=>{
            console.log('File renamed successfully!');
        })
        // uploading multiple images
        let multipleImages = req.files.images;
        let imagesArray = multipleImages.map((image)=>{
            let mFileType = (image.mimetype).split('/')[1];
            let mNewFileName = image.filename+ '.'+ mFileType;
            fs.rename(`./uploads/${image.filename}`, `./uploads/${mNewFileName}`, ()=>{
                console.log('File renamed successfully!');
            });
            return mNewFileName;
        })
        // saving to the db
        const newProduct = new productModel({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            mainImage: newFileName,
            images: imagesArray,
            category: req.body.category,
            discountPercentage: req.body.discountPercentage
        });
        let result = await newProduct.save();
        res.send({
            message: 'Product added successfully!',
            data: result
        });
    } catch (error) {
        console.log(error)
        res.send({
            message: 'Failed',
            error: error.message
        });
    }
});


export default router;