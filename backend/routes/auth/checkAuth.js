import jwt from 'jsonwebtoken'
import userModel from '../../models/userModel.js'
import adminModel from '../../models/adminModel.js';

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization){
        res.send('You must be logged in!')
    }
    
    const token = authorization.replace('Bearer ', '')
    console.log(token)
    jwt.verify(token, 'MY_SECRET_KEY', async (err, data)=>{
        if(err){
            res.send('you must be logged in')
        }
        const user = await userModel.findOne({_id: data.userId})
        req.user = user
        next()
    })
}

export default checkAuth 