const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'CourseIndoors@gmail.com',
    pass: process.env.PASSWORD_EMAIL,
  },
});
const sendEmail = (to, text) => {
  const mailOptions = {
    from: 'CourseIndoors@gmail.com',
    to: to,
    subject: 'Password Reset',
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
};

const sendCertificateInEmail = (to, text, attachments) => {
  const mailOptions = {
    from: 'CourseIndoors@gmail.com',
    to: to,
    subject: 'Congratulations!',
    text: text,
    attachments: attachments
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}

module.exports = { sendEmail, sendCertificateInEmail };
