const stages = require('express').Router()
const { where } = require('sequelize')
const db = require('../models')
const { Stage, Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')

// FIND ALL STAGES
stages.get('/stages', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})


//FIND A SPECIFIC STAGE
stages.get('/stages/:name', async (req, res) => {  
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.name },
            include: [
                {
                    model: Event,
                    as: "event",
                    include: {
                        model: Event,
                        as: "event",
                        where: {name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                }
                }]
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE A STAGE
stages.post('/stages', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

// UPDATE A STAGE
stages.put('/stages/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A STAGE
stages.delete('/stages/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = stages