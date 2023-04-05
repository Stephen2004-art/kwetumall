import express from 'express'

const router = express.Router()
router.get('/',(req,res)=>{
    const name = {
        firstName: 'Jane',
        lastName: 'Doe'
    }
    res.send(`${name.firstName} ${name.lastName}`);
});
router.post('/post', (req, res)=>{
    console.log(req.body)
    res.send('ok')
});
router.post('/post/activity', (req, res)=>{
    console.log(req.body)
    res.send(`The sum is ${req.body.X + req.body.Y}`)
});
// router.post('/post/greeting', (req, res)=>{
//     console.log(req.body)
//     res.send(`Hello ${req.body.name}`)
// });
router.post('/post/greeting', (req, res)=>{
    const person ={
        "name": req.body.name,
        "age": 2023 - req.body.yob
    }
    res.send(person)
});

export default router



