const express= require('express')
const db = require('./db-config')

const server = express()

server.use(express.json())

server.get('/resources',async (req,res) => {
    try{
        const resources = await db('resources').select();
        res.status(200).json(resources)
    }catch(err){
        res.status(500).json({message:'Failed to get resources'})
    }
})

server.post('/resources', async (req,res) => {
    try {
        const [id] = await db('resources').insert(req.body)
        const newResource = await db('resources').where({id}).first();
        res.status(201).json(newResource)
    }catch(err){
        res.status(500).json({message:'Failed to create resource'})
    }
})

server.delete('/resources/:id',async (req, res) => {
    try{
        const count = await db('resources').where({id: req.params.id}).del()
        if(count){
            res.status(200).json({message:'Resources deleted'})
        }else {
            res.status(404).json({message:'Resources not found'})
        }
    }catch(err){
        res.status(500).json({message: 'Failed to delete resource'})
    }
})

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`server running on port ${port} `)
})

module.exports = server