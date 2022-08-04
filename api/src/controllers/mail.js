const nodemailer = require("nodemailer");
const { USER_MAILGUN, PASS_MAILGUN, CLIENT_URL } = require("../utils/config");


const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 465,//587
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


// const getTemplateProductStock = (
//   username,
//   productName,
//   productImage,
//   productId
// ) => {
//   return `
//   <head>
//   <link rel="stylesheet" href="./style.css">
// </head>
// <div id="email___content">
//   <h2>Hola ${username}</h2>
//   <p>Te avisamos que ya tenemos disponible el siguiente producto por el cual estas interesado/a: </p>
//   <img src=${productImage} alt='' />
//   <a
  
//   target="_blank"
//   >${productName}</a>
// </div>`;
// };
const getProduct = (products) =>{
  
  let htmlProducts = products.map(product =>{
    return `<p>Producto: ${product.Stock.Product.name}</p>
    <p>Precio: ${product.Stock.Product.price}</p>
    <p>Cantidad: ${product.quantity}</p>
    <a href="${CLIENT_URL}/producto/${product.Stock.Product.id}">  
    <img width="100" height="100" src=${product.Stock.Product.images[0].image}/>
    </a> 
    <p>_______________________________________________________________</p>`
})

  return htmlProducts.join("<p></p>")
}

const getTemplateAproved = (name, id, products) => {
  let htmlProducts=getProduct(products)
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queríamos avisarte que hemos recibido tu pago por el pedido numero: ${id}!</p>
      <div>${htmlProducts}</div>
      <p>Muchas gracias por tu compra</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a>
  </div>`;
};

const getTemplateEntregado = (name, id) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>¡Ya recibiste tu compra correspondiente al número de orden ${id}!</p>
      <p>esperamos que la disfrutes al máximo</p>
      <p>Muchas gracias</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a>
  </div>`;
};
const getTemplatePending= (name, id) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queríamos avisarte que tu pago por el pedido número: ${id} ha quedado pendiente!</p>
      <p>Ponte en contacto con nosotros si quieres modificar la forma de pago</p>
      <p>Muchas gracias</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a>
  </div>`;
};

const getTemplateCancelado = (name, id) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>te informamos que tu pedido número ${id} fue cancelado</p>
      <p>si crees que se trata de un error ponte en contacto con nosotros</p>
      <p>Muchas gracias</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a>
  </div>`;
};
const getTemplateRejected = (name, id) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queríamos avisarte que hubo un problema en tu compra.. Inténtelo nuevamente!</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a></div>`;
};

const getTemplateDevuelto = (name, id) => {
  return `
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queríamos avisarte que hemos recibido la devolución de tu compra</p>
      <p>Pronto nos contactaremos contigo</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a>  </div>`;
};
//listo
const getTemplateDespachado = (name) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Tu orden esta en camino! Pronto podrás disfrutar de tu compra!</p>
      <a href=${CLIENT_URL}>  
       <img width="300" height="108" src="https://res.cloudinary.com/davoshoes/image/upload/v1659318622/LOGO/davo_shoes_500_250_px_re09ab.png"/>
      </a>  </div>`;
};
module.exports = {
  sendEmail,
  getTemplateAproved,
  getTemplateRejected,
  getTemplatePending,
  getTemplateDespachado,
  getTemplateEntregado,
  getTemplateCancelado,
  getTemplateDevuelto,
};