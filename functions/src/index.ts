import * as functions from 'firebase-functions';
// const admin = require('firebase-admin');
var nodemailer = require('nodemailer');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.confirmBooking = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snapshot, contect) => {
    console.log('Document data');
    console.log(snapshot.data());

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'gmail',
      auth: {
        user: 'nodejs21@gmail.com', // generated ethereal user
        pass: '12sjedon' // generated ethereal password
      }
    });
    // Only needed if you don't have a real mail account for testing

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'nodejs21@gmail.com', // sender address
      to: 'nodejs21@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // main().catch(console.error);
  });
