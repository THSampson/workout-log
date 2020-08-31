const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log')
let validateSession = require('../middleware/validateSession');

router.post('/', validateSession, (req, res) => {
const logFromRequest = {
    description: req.body.user.describe,
    definition: req.body.user.define,
    result: req.body.user.result,
    owner_id: req.body.user.owner

}
Log.create(logFromRequest)
.then(log => res.status(200).json(log))
.catch(err => res.status(500).json({error: err}))
})

router.get('/', (req, res) => {
    Log.findAll()
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/:id', (req, res) => {
    Log.findAll({where: {id: req.params.id}})
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/:id', validateSession, (req, res) => {
    Log.update(req.body, {where: {id: req.params.id}})
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))  
})

router.delete('/:id', validateSession, (req, res) => {
    Log.destroy({
        where: {id: req.params.id}
    })
    .then(log => res.status(200).json({message: "Log Has Been Deleted."}))
    .catch(err => res.status(500).json({error: err}))
});
module.exports = router;