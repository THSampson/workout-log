let router = require('express').Router();
let User = require('../db').import('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
User.create({
    userName: req.body.user,
    passWordHash: bcrypt.hashSync(req.body.passWordHash, 10)
})
.then(
    createSuccess = (user) => {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({
            user: user,
            message: 'User Created',
            sessionToken: token
        })
    },
    createError = err => res.status(500).json(err)
)
})

router.post('/login', (req, res) =>{
    User.findOne({where: {userName: req.body.user}})
    .then(
        user => {
            if(user){
                bcrypt.compare(req.body.passWordHash, user.passWordHash, (err, matches) => {
                    if(matches) {  
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});     
                        res.json({
                            user: user,
                            message: 'User Logged In',
                            sessionToken: token
                    })
                } else {
                    res.status(502).send({error: "Bad Gateway"})
                
            }})
        } else {
            res.status(501).send({error: "Failed to Process"})

            }
        }
    )
})

module.exports = router;