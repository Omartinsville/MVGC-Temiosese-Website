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
    const booking = snap.data();

    const mailOptions = {
      from: 'temiosesemvgc@gmail.com',
      to: booking.email,
      subject: 'Booking Confirmation',
      html: `<p>Hi ${booking.name},</p>
             <p>Your booking for a live chat on <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been confirmed.</p>
             <p>Thank you!</p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent to', booking.email);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
