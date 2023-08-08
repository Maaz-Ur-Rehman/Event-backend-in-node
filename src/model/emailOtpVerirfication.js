const mongoose=require('mongoose')

const Schema = mongoose.Schema
const EmailOtpVerificationSchema=new Schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date

})

const EmailOTPVerification=mongoose.model('emailOTPVerification',EmailOtpVerificationSchema)

module.exports=EmailOTPVerification