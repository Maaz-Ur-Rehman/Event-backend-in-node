//import nodeMailer from 'nodemailer';
const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const path = require('path');
const axios = require('axios');

//create send email function
const oauth2Client = new OAuth2(
    // googleClientID,
    "992008229746-24vdksqjkf3l9vo8gtiksvru1v1dncji.apps.googleusercontent.com",
    // googleClientSecret,
    "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",
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    // refresh_token: refreshToken
    refresh_token: "1//04D_MZnXmfDq3CgYIARAAGAQSNwF-L9IrDWiWEChblrwr8TWX3luiP6y1CUjQR-Hcm3kCFfN7GH2OCpIkbcSjUHTtcrfyhRzg9ok"
});
const createTransporter = async () => {
    try {
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
              if (err) {
                reject("Failed to create access token: " + err);
              } else {
                resolve(token);
              }
            });
          });


        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "aqib.kk999@gmail.com",
                clientId:  "992008229746-24vdksqjkf3l9vo8gtiksvru1v1dncji.apps.googleusercontent.com",
                clientSecret: "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",
                refreshToken: "1//04D_MZnXmfDq3CgYIARAAGAQSNwF-L9IrDWiWEChblrwr8TWX3luiP6y1CUjQR-Hcm3kCFfN7GH2OCpIkbcSjUHTtcrfyhRzg9ok",
                accessToken: accessToken
            }
        });
        return transporter;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const sendMail = async (req, res) => {
    
  try {
    const { to, url } = req.body;
    console.log(to);
    console.log(url);
    const transporter = await createTransporter();

    // const fileName = path.basename(url);
    const fileName = path.basename(url).replace(/[^a-zA-Z0-9.]/g, "-");
    const filePath = path.join(__dirname, fileName);

    //Download Image from the URL
    const response = await axios({
        method: 'GET',
        url,
        responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    const promise = new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
    await promise;
           
    const mailOptions = {
        from: "aqib.kk999@gmail.com",
        to,
        subject: "Your Ticket is Booked",
        generateTextFromHTML: true,
        html: `<p>Dear ${to.split("@")[0]},</p>

        <p>Click on this link to view your ticket: <strong><a href="${url}">Event</a></strong></p>
        <p>Regards,</p>
        <p>Admin</p>
        <hr>`,
        attachments: [
            {
              filename: fileName,
              path: filePath,
            },
          ],
    };
    transporter.sendMail(mailOptions, (error, response) => {
        fs.unlinkSync(filePath);
        error ? res.status(500).json({ error: error.message }) : res.status(200).json({ message: 'Email sent successfully' });
        transporter.close();
    }
    );
  }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendMail };
