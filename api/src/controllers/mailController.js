const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { USER_MAILGUN, PASS_MAILGUN } = require("../utils/config");

//email sender function
exports.sendEmail = function (req, res) {
  const { name, email, subject, delivery} = req.body
  console.log(name, email, subject, delivery)
  const typeBuy = delivery?
                    'Pronto te avisaremos cuando despacharemos tu envío'
                    :'Pronto te avisaremos cuando puedes retirar tu compra';
  
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "../utils/templatesMails/notification.hbs"),
    "utf8"
  );
 
  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template({
       name: name,
       typeBuy: typeBuy,

     });

  //Definimos el transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: USER_MAILGUN,
      pass: PASS_MAILGUN,
    },
    tls: { rejectUnauthorized: false },
  });
  // Definimos el email
  let mailOptions = {
    from: "info.davoshoes@davoshoesargentina.com",
    to: email,
    subject: subject,
    //html: htmlToSend,
    text: 'probando 123'
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log("Email sent");
      res.status(200).send(info);
    }
  });
};
