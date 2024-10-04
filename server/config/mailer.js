const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// OAuth2 configuration
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // Or your own redirect URI
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Send email function using OAuth2
async function sendEmail(to, otp) {
  try {
    // Generate an access token
    const accessToken = await oAuth2Client.getAccessToken();

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ID,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Coursell" <${process.env.EMAIL_ID}>`, // sender address
      to, // receiver
      subject: "Registration OTP",
      html: `
        <div style="font-weight:bold; padding:25px">
          <p>Hi User,</p>
          <p>Please use this OTP for registration.</p>
          <p>Your OTP is: ${otp}</p>
          <p>Your OTP will expire in 30 mins.</p>
          <p>Thanks,</p>
        </div>
      `,
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Email sending failed.");
  }
}

// Export the function
module.exports = { sendEmail };
