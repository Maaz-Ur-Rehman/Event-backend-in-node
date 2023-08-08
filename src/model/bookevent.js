const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookEventSchema = new Schema({
    noOfTickets: {
        type: Number,
        required: false,
    },
    bookings: [{
       eventId: {
           type: Schema.Types.ObjectId,
           ref: 'Event'
       },
       eventName: {
           type: String,
           required: false,
       },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    mobNumber: {
        type: String,
        required: false,
    },
    nicNumber: {
        type: String,
        required: false,
    }
    
   }]
}, { timestamps: true });

const BookEvent = mongoose.model('BookEvent', bookEventSchema);

module.exports = BookEvent;