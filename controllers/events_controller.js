const events = require('express').Router()
const { where } = require('sequelize')
const db = require('../models')
const { Event, Band, MeetGreet, Stage, SetTime } = db
const { Op } = require('sequelize')

// FIND ALL EVENTS
events.get('/events', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

//FIND A SPECIFIC EVENT
events.get('/events/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.name },
            include: [
                {
                    model: MeetGreet,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: "event",
                        where: {name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                }
                },
                {
                    model: SetTime,
                    as: "set_times",
                    include: {
                        model: Event,
                        as: "event",
                        where: {name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                    }
                },
                {
                    model: Stage,
                    as: "Stage",
                    include: {
                        model: Event,
                        as: "event",
                        where: {name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                    }
                }
            ]
            }
        )
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE AN EVENT
events.post('/events', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

// UPDATE AN EVENT
events.put('/events/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE AN EVENT
events.delete('/events/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = events