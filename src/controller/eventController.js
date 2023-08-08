const Event = require('../model/eventModel');

const createEvent = async (req, res) => {
    // const { name, date, time, description, location, image } = req.body;
    id = req.user._id;
    try {
        const event = await Event.create({
            //add user = id in body
            user: id,
           ...req.body,
        });
        res.status(201).json( event );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().select('-__v');
        res.status(200).json( events );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getBookieInfo = async (req, res) => {
    try {
        const events = await Event.find().select('-__v');
        res.status(200).json( events );
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getOwnerEvents = async (req, res) => {
    owner = req.params.owner;
    try{
        const events = await Event.find({ owner: owner} ).select('-__v');
        res.status(200).json( events );
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const getEventsAdmin = async (req, res) => {
    id = req.user._id;
    try {
        const events = await Event.find({ user: id }).select('-__v');
        console.log(id);
        res.status(200).json( events );
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//update any field in event using object id
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json( event );
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event){
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json( event );
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}




module.exports = { createEvent, getEvents, updateEvent, deleteEvent, getOwnerEvents, getEventsAdmin }