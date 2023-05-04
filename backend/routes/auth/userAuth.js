import express from 'express'
import userModel from '../../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import checkAuth from './checkAuth.js'

const router = express.Router()
const saltRound = 10

router.get('/users', checkAuth, async (req, res)=> {
    console.log(req.user)
    res.send(`Hello ${req.user.firstName} ${req.user.lastName}. You are logged in!`)
})
router.post('/signin', async (req, res)=> {
    if(!req.body.email || !req.body.password){
        res.send('Must provide Email and Password')
    }
    const user = await userModel.findOne({email: req.body.email})
    bcrypt.compare(req.body.password, user.password, (err, response)=> {
        if(err){
            res.send(err)
        }else if(response === true){
            const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
            res.send({
                token: token,
                message: 'User Authenticated'
            })
        }else{
            res.send('Invalid Password or Email')
        }
    })
})

router.post('/signup', (req, res)=>{
    console.log('getting here')
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRound, async (err, hash)=> {
        if(err){
            res.send(err)
        }
        try {
            // console.log(hash)
            // res.send(hash)
            const newUser = new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash,
                gender: req.body.gender,
                country: req.body.gender
            })
            let result = await newUser.save()
            console.log(result)
            const token = jwt.sign({userId: result._id}, 'MY_SECRET_KEY')
            res.send({
                data: result,
                token: token,
                message: 'Created Account Successfully!'

            })
        } catch(error) {
            console.log(error)
        }
    })
})
export default router
