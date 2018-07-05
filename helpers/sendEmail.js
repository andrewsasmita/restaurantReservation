const nodemailer = require('nodemailer')

module.exports = function(customer, res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'rsvp.hacktiv8@gmail.com', // generated ethereal user
            pass: 'r$vp.hacktiv8' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Restaurant RSVP" <admin@restaurantrsvp.com>', // sender address
        to: `${customer.email}`, // list of receivers
        subject: 'Reservation notification', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>You have 5 minutes left before we cancel your reservation!</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.redirect('/admin')
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
}