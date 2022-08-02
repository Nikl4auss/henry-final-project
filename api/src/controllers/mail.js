const nodemailer = require("nodemailer");
const { USER_MAILGUN, PASS_MAILGUN } = require("../utils/config");

const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
          user: USER_MAILGUN,
          pass: PASS_MAILGUN,
        },
        tls: { rejectUnauthorized: false },
      });
 

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: "info.davoshoes@davoshoesargentina.com",
      to: email,
      subject,
      text: "",
      html,
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};
const getTemplate = (name, token) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Hola ${name}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="https://somosolea.vercel.app/auth/confirmregister/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
};


const getTemplateProductStock = (
  username,
  productName,
  productImage,
  productId
) => {
  return `
  <head>
  <link rel="stylesheet" href="./style.css">
</head>
<div id="email___content">
  <h2>Hola ${username}</h2>
  <p>Te avisamos que ya tenemos disponible el siguiente producto por el cual estas interesado/a: </p>
  <img src=${productImage} alt='' />
  <a
  
  target="_blank"
  >${productName}</a>
</div>`;
};

const getTemplateAproved = (name, price) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queríamos avisarte que hemos recibido tu pago!</p>
      <p>Muchas gracias por tu compra</p>
  
  </div>`;
};
const getTemplateRejected = (name) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queríamos avisarte que hubo un problema en tu compra.. Inténtelo nuevamente!</p>
     
  </div>`;
};

const getTemplateEnvio = (name, price) => {
  return `
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queriamos avisarte que tu compra por ${price} se completo exitosamente!</p>
      <p>Te enviaremos otro email cuando tu orden este en camino!</p>
  </div>`;
};
const getTemplateEnCamino = (name) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Tu orden esta en camino! Notificanos por la pagina cuando te llego!</p>
  </div>`;
};
module.exports = {
  sendEmail,
  getTemplate,
  getTemplateAproved,
  getTemplateProductStock,
  getTemplateRejected,
  getTemplateEnvio,
  getTemplateEnCamino,
};