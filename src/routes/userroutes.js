const express = require('express');
const {protect} = require('../middleware/requireAuth')
const router = express.Router();
const { loginUser, signupUser, getAllUsers } = require('../controller/userController');
const { createEvent, getEvents, getEventsAdmin, getOwnerEvents, updateEvent, deleteEvent } = require('../controller/eventController');
const {bookEvent, getBookieInfo, attendEvent, paymentInfo, getAllBookEvents} = require('../controller/bookEventController');
const {sendMail} = require('../controller/emailController');
const GetOTPVerificationEmail = require('../controller/emailOTPController');
const { sendOTP, sendOTPNo, verifyOTPNo } = require('../controller/sendOTPController');
//===user API================
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/getAllUsers', getAllUsers);  
//===event API================ 
router.post('/createEvent', protect, createEvent);
router.get('/getEventsAdmin', protect, getEventsAdmin);
router.get('/getEvents', getEvents);
router.patch('/updateEvent/:id', updateEvent);
router.delete('/deleteEvent/:id', deleteEvent);
router.get('/getOwnerEvents/:owner', getOwnerEvents);
//======book event API================
router.post('/bookEvent',  bookEvent);
router.post('/attendEvent', attendEvent);
router.post('/paymentInfo', paymentInfo)
router.post('/getBookieInfo', getBookieInfo);
router.post('/sendMail', sendMail);
router.get('/getallbookevents/:id',getAllBookEvents)

// ==========OTP==================
// router.post('/getOTP',GetOTPVerificationEmail)
// router.post('/sendOTP',SendOTPVerificationEmail)
router.post('/sendOTPno', sendOTPNo);
router.post('/verifyOTPno',verifyOTPNo)
module.exports = router;