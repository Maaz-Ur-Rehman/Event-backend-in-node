// const mongoose=require('mongoose')

// const Schema = mongoose.Schema
// const NumberOTPVerificationSchema=new Schema({
//     userId:String,
//     otp:String,
//     createdAt:Date,
//     expiresAt:Date

// })

// const NumberOTPVerification=mongoose.model('otp', NumberOTPVerificationSchema)

// module.exports=NumberOTPVerification

const mongoose = require('mongoose');


const Schema = mongoose.Schema

const otpNoSchema = new Schema({
    num: String,
    code: String,
    expires: {
        type: Date,
        default: Date.now,
        index: { expires: '60s' },
    },
});


module.exports = mongoose.model('OtpNo', otpNoSchema);