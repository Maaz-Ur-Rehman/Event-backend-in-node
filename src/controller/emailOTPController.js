// const bcrypt = require('bcryptjs');
// const EmailOTPVerification = require('../model/emailOtpVerirfication');
// const nodeMailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// // OAuth2 configuration
// const oauth2Client = new OAuth2(
//   "992008229746-24vdksqjkf3l9vo8gtiksvru1v1dncji.apps.googleusercontent.com",
//   "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",
//   "https://developers.google.com/oauthplayground"
// );

// oauth2Client.setCredentials({
//   refresh_token: "1//04D_MZnXmfDq3CgYIARAAGAQSNwF-L9IrDWiWEChblrwr8TWX3luiP6y1CUjQR-Hcm3kCFfN7GH2OCpIkbcSjUHTtcrfyhRzg9ok"
// });

// // Create a function to get the transporter object
// const createTransporter = async () => {
//   try {
//     const accessToken = await new Promise((resolve, reject) => {
//       oauth2Client.getAccessToken((err, token) => {
//         if (err) {
//           reject("Failed to create access token: " + err);
//         } else {
//           resolve(token);
//         }
//       });
//     });

//     const transporter = nodeMailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "aqib.kk999@gmail.com",
//         clientId: "992008229746-24vdksqjkf3l9vo8gtiksvru1v1dncji.apps.googleusercontent.com",
//         clientSecret: "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",
//         refreshToken: "1//04D_MZnXmfDq3CgYIARAAGAQSNwF-L9IrDWiWEChblrwr8TWX3luiP6y1CUjQR-Hcm3kCFfN7GH2OCpIkbcSjUHTtcrfyhRzg9ok",
//         accessToken: accessToken
//       }
//     });

//     return transporter;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// const GetOTPVerificationEmail = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

//     const transporter = await createTransporter(); // Call the function to get the transporter

//     const mailOptions = {
//       from: "arsal.ik2008@gmail.com",
//       to: email,
//       subject: "Verify Your Email",
//       html: `<p>Enter <b>${otp}</b> in the app to verify your email</p>` // Corrected the closing backtick here
//     };

//     const saltRounds = 10;
//     const hashedOTP = await bcrypt.hash(otp, saltRounds);
//     const newOTPVerification = await new EmailOTPVerification({
//       otp: hashedOTP,

//       // createdAt:Date.now(),
//     });

//     await newOTPVerification.save();

//     // Send the email
//     transporter.sendMail(mailOptions, (error, response) => {
//       if (error) {
//         res.json({ msg: error.message });
//       } else {
//         res.json({ msg: "Email sent successfully!" });
//       }
//     });
//   } catch (err) {
//     res.json({
//       msg: err.message
//     });
//   }
// }

// const SendOTPVerificationEmail=async(req,res)=>{
//     try{
//         const {otp}=req.body

//         const checkOTP=await EmailOTPVerification.findOne({otp:otp})
//         if(checkOTP)

//     }
//     catch(err){

//     }
// }

// SendOTP
// module.exports = {GetOTPVerificationEmail,SendOTPVerificationEmail};

