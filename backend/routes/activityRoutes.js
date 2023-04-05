import express from 'express'

const router = express.Router()
router.post('/post/student', (req, res)=>{
    let marks= ((req.body.math + req.body.eng + req.body.swa + req.body.phy + req.body.geo)/5) + '%'
    res.send(marks)
});
export default router

// averagePercentage :
    // "average percentage": {total percentage} / 5
    // let marks = 