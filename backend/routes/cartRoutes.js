import express from 'express'
import userModel from '../models/userModel.js'
import checkAuth from './auth/checkAuth.js'
import productModel from '../models/productModel.js'

const router = express.Router()

router.post('/addtocart/:id', checkAuth, async (req, res)=>{
    let productId = req.params.id
    console.log(req.user.id)
    const user = await userModel.findOne({_id: req.user.id})
    let inCart = false
    user.cart.forEach((product)=>{
        if(product._id === productId){
            inCart = true
        }
    })

    if(inCart === true){
        res.send({message: 'Product already in cart'})
    }else{
        user.cart = [...user.cart, {_id: productId, quantity: req.body.quantity}];
        const result = await user.save()
        res.send({
            data:result,
            message: 'Added to cart successfully'
        })
    }
})

router.get('/getitems', checkAuth, async (req, res)=> {
    let cartItems = req.user.cart;
    let products = [];

    for (let i = 0; i<cartItems.length;i++){
        let product = await productModel.findOne({_id: cartItems[i]._id});
        products = [...products, {product:product, cartQuantity: cartItems[i].quantity}]
    }
    res.send({
        message: 'Fetched  cart successfully!',
        data: products
    })
})

router.post('/remove/:id', checkAuth, async (req, res)=> {
    let productId = req.params.id
    const user = await userModel.findOne({_id: req.user._id})
    const cart = user.cart

    let newCart = []
    for(let i = 0; i< cart.length; i++){
        if(cart[i]._id !== productId){
            newCart = [...newCart, cart[i]]
        }
    }
    user.cart = newCart
    const result = await user.save()
    res.send({
        message: 'Removed from Cart Successfully!',
        data: result
    })
})

router.post ('/checkout', checkAuth, async(req, res)=> {
try {
    //reduce quantity from stock for each product
    //remove everything from user's cart
    let cart = req.user.cart
    for (let i = 0; i< cart.length; i++){
        let product = await productModel.findOne({_id: cart[i]._id})
        product.quantity = product.quantity - cart[i].quantity
        let result = await product.save()
        console.log(result)
    }
    const user = await userModel.findOne({_id: req.user. _id})
    user.cart = []
    const userResult = await user.save()
    res.send({
        message: 'checked out successfully!',
        data: userResult
    }) 
    } catch (error) {
        console.log(error)
        res.send({
            message: 'could not check out',
            data: error.message
        })
    }
})


export default router