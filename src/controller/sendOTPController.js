const OTPno = require("../model/OTPno");
const crypto = require('crypto');
const client = require("twilio")("AC5d1569b3e1962fc08f89858d1669ad80", "ac5a64564f56949b73516f601f4ee7e7");

const sendOTPNo = async (req, res) => {
    try{
  const { to } = req.body; // Fixed typo here, change req.boyd to req.body
    const otpCode = '0123456789';
    let result;
    async function generateRandomString(length) {
      result = '';
      let charactersLength = otpCode.length;
      for (let i = 0; i < length; i++) {
        result += otpCode.charAt(crypto.randomBytes(1)[0] % charactersLength);
      }
    };

    await generateRandomString(4);
    let otpData = new OTPno({
        num: to,
        code: result,
      });
      let otpResponse = await otpData.save();
      await sendOTPNum(to, otpResponse.code);
      res.status(200).json({
        message: 'OTP sent successfully' 
      })
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
    
};
const verifyOTPNo = async (req, res) => {
    const {num, code} = req.body;
    try {
      let data = await OTPno.findOne({num: num, code: code});
      if (data) {
        res.status(200).json({ message: 'OTP verified successfully' });
      }
      else {
        res.status(400).json({ message: 'OTP not verified' });
      }
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const sendOTPNum =async(to,otp)=>{
    
    client.messages
      .create({
        body: `Your OTP for Event Booking is:${otp}`,
        to, // Text your number
        from: "+17752529623", // From a valid Twilio number
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));
}
module.exports = { sendOTPNo ,verifyOTPNo};
