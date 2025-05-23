const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

// Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'temiosesemvgc@gmail.com',
    pass: 'vollkeplqwyujnmj' // NOT your Gmail password — generate from https://myaccount.google.com/apppasswords
  }
});

exports.sendBookingEmail = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const email = data.email;
    const name = data.name;
    const bookingId = context.params.bookingId;
    const meetingURL = `https://meet.jit.si/MOVGC_${bookingId}`;

    const mailOptions = {
      from: 'temiosesemvgc@gmail.com',
      to: booking.email,
      subject: 'Booking Confirmation',
      html: `  
      <p>Dear ${name},</p>
        <p>Thank you for booking a session. Your meeting is scheduled as follows:</p>
        <ul>
          <li><strong>Date:</strong> ${data.date}</li>
          <li><strong>Time:</strong> ${data.time}</li>
          <li><strong>Officer:</strong> ${data.officer}</li>
        </ul>
        <p><a href="${meetingURL}">Click here to join your meeting</a></p>
        <p>God bless you!</p>
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent to', booking.email);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
