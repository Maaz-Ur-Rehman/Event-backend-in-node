const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        unique: false,
    },
    owner: {
        type: String,
        required: false
    },
    eventDate: {
        type: String,
        required: false,
    },
    eventEndDate: {
        type: String,
        required: false,
    },
    eventStartTime: {
        type: String,
        required: false,
    },
    eventEndTime: {
        type: String,
        required: false,
    },
    eventLocation: {
        type: String,
        required: false,
    },
    eventDescription: {
        type: String,
        required: false,
    },
    eventOrganizer: {
        type: String,
        required: false,
    },
    eventImage: {
        type: String,
        required: false,
    },
    noOfTickets: {
        type: Number,
        required: false,
    },
    attendees: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: false
        },
        attendancestatus: {
            type: Boolean,
            default: false
        },
        paymentStatus: {
            type: Boolean,
            default: false
        }
    }],
    // attendees: [{
    //     type: Schema.Types.ObjectId,
    //     required : false,
    // }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;