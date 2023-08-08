const { all } = require('axios');
const BookEvents = require('../model/bookevent');
const Event = require('../model/eventModel');
const bookEvent = async (req, res) => {
    try {
        const { bookings } = req.body;
        const eventIds = bookings.map(booking => booking.eventId); // extract all event IDs
        const nicNumbers = bookings.map(booking => booking.nicNumber); // extract all NIC numbers

        // Find a booking that matches any eventId and contains any NIC number that was sent
        const existingBooking = await BookEvents.findOne({
            "bookings.eventId": { $in: eventIds },
            "bookings.nicNumber": { $in: nicNumbers }
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked for this event' });
        }

        for (let booking of bookings) {
            const event = await Event.findOne({ _id: booking.eventId });
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            if (event.noOfTickets < 1) {
                return res.status(400).json({ error: 'Not enough tickets available for event' });
            }
            // console.log(booking._id);

            event.noOfTickets--;
            await event.save();
        }

        const bookEvent = await BookEvents.create({
            ...req.body,
        });

        for (let booking of bookEvent.bookings) {
            const event = await Event.findOne({ _id: booking.eventId });
            // console.log("Booking ID:", booking._id);
            event.attendees.push(booking._id);
            await event.save();
        }


        res.status(201).json(bookEvent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
const attendEvent = async (req, res) => {
    try {
        const attendeeId = req.body._id;  // ID of the attendee to update
        const eventId = req.body.eventId;  // ID of the event    
        // Find the event
        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        // Check if attendee is already marked as attended
        const attendee = event.attendees.find(a => a._id.toString() === attendeeId);
        if (attendee && attendee.attendancestatus === true) {
            return res.status(400).json({ error: 'Your attendance has already been counted.' });
        }
        if (!attendee) {
            return res.status(400).json({ error: 'Your are not allowed to attend.' });
        }
        // Update the status of the attendee
        await Event.updateOne(
            { _id: eventId, "attendees._id": attendeeId },
            { $set: { "attendees.$.attendancestatus": true } }
        );

        return res.status(200).json({ message: 'Attendance updated successfully.' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating attendance.' });
    }

};

const getBookieInfo = async (req, res) => {
    try {
        const attendeeId = req.body._id;  // ID of the attendee to update
        const eventId = req.body.eventId;  // ID of the event    

        // Find the booking detail for the attendee
        const bookingDetail = await BookEvents.findOne({
            "bookings": {
                $elemMatch: {
                    "_id": attendeeId,
                    "eventId": eventId
                }
            }
        });

        if (!bookingDetail) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const attendeeBooking = bookingDetail.bookings.find(booking => booking._id.toString() === attendeeId);

        const attendeeStatus  = await Event.findOne({ _id: eventId, "attendees._id": attendeeId });
        let attendancestatus, paymentStatus;

        if (attendeeStatus) {
            const attendeeEvent = attendeeStatus.attendees.find(attendee => attendee._id.toString() === attendeeId);
            if (attendeeEvent) {
                attendancestatus = attendeeEvent.attendancestatus;
                paymentStatus = attendeeEvent.paymentStatus;
            }
        }
        return res.status(200).json({
            eventId: eventId,
            eventName: attendeeBooking.eventName,
            name: attendeeBooking.name,
            email: attendeeBooking.email,
            mobNumber: attendeeBooking.mobNumber,
            nicNumber: attendeeBooking.nicNumber,
            attendancestatus: attendancestatus,
            paymentStatus: paymentStatus
        });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating attendance.' });
    }
};

const paymentInfo = async (req, res) => {
    try {
        const attendeeId = req.body._id;
        const eventId = req.body.eventId;

        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ error: 'Event Not found' });
        }
        const attendee = event.attendees.find(a => a._id.toString() === attendeeId);
        if (attendee && attendee.paymentStatus == true) {
            return res.status(404).json({ error: "your Payment has already been made" });
        }

        await Event.updateOne(
            { _id: eventId, "attendees._id": attendeeId },
            { $set: { "attendees.$.paymentStatus": true } }
        );

        return res.status(200).json({ message: 'Payment updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'An error occured while updating payment' })
    }
}

    const getAllBookEvents=async (req,res)=>{
        try {
            const { id } = req.params;
            const existBookEvents = await BookEvents.find({ 'bookings.eventId': id });
            
          

            const allbookingEvents = existBookEvents.map((e) => {
              const bookings = e.bookings.find((booking) => booking.eventId.toString() === id);
              const { name, email, mobNumber, nicNumber, _id } = bookings;
              const { createdAt } = e;
              return { name, email, mobNumber, nicNumber, _id, createdAt };
            });


            res.status(200).json({
              data: allbookingEvents,
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
          }
          

    }

module.exports = { bookEvent, attendEvent, paymentInfo, getBookieInfo,getAllBookEvents };

