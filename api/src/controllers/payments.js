// SDK de Mercado Pago
const { json } = require("body-parser");
const mercadopago = require("mercadopago");
const axios = require('axios')
const EmailCtrl = require('../controllers/mailController.js');
const {ACCESS_TOKEN, CLIENT_URL, API_URL} = require('../utils/config.js')
const { sendEmail, getTemplateAproved } = require('../controllers/mail')
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const updateOrder = async (req, res) =>{
  let  { payment_id, external_reference }  = req.body;
  let mailTemplate
  let email =''
    try {
    const respuesta = await mercadopago.payment.get(payment_id)
    const { status } = respuesta.body
    if(status === 'approved'){
    let { data }  = await axios.get(`${API_URL}/order/${external_reference}`)
     
      if(data.status === 'Pendiente'){
    let name= data.User.name +' '+data.User.surname
     email= data.User.email;
     let subject= 'Recibimos tu pago';
     let id=external_reference
     let products = data.Line_orders
   
     mailTemplate = getTemplateAproved(name, id, products)
     await sendEmail(email, subject, mailTemplate )
     let statusOrder = await axios.put(`${API_URL}/order/${external_reference}`, {status}) 
      //  console.log(statusOrder,'statusOrder')
     data.Line_orders.forEach(async (product) => {
        let respuesta = await axios.put(`${API_URL}/stock/`,{id: product.id, quantity: product.quantity})
      //  console.log(respuesta.data)
     });

      }
      
     return res.send('approved')
      
    }

    return res.send(respuesta)
    
  } catch (error) {
    res.status(500).send(error)
    
  }
}




const statusOrder = (req, res) => {
  
  let  { payment_id, external_reference }  = req.body;
  
  mercadopago.payment
  .get(payment_id)
  .then(function (respuesta){
  
    console.log(respuesta.body)
    res.send(respuesta.body)
  })
  .catch(function (error){
    res.status(500).send(error)
  })
}
const checkoutCart = (req, res) => {
  let {itemsCart} = req.body;
  console.log(req.body)
  let {idOrder} = req.body;
  let preference = {
    //   items: [
    //       {
    //         title: "Mi producto",
    //         unit_price: 100,
    //         quantity: 1,
    //       }
    //   ],
    items: itemsCart.map((i) => {
      return {
        title: i.name,
        unit_price: parseInt(i.price),
        quantity: i.quantity,
      };
    }),
    back_urls: {
      success: `${CLIENT_URL}/pago/exitoso`,
      failure: `${CLIENT_URL}/pago/fallido`,
      pending: `${CLIENT_URL}/pago/pendiente`,
    },
   // notification_url: `HTTPS://localhost:3001/payment/feedback`,  //tiene que ser una ruta https
    auto_return: "approved",
    external_reference: idOrder.toString(),
  };
  mercadopago.preferences
    .create(preference)
    .then(function (respuesta) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      const preferenceId = respuesta.body.init_point;
      console.log(preferenceId)
      res.send(preferenceId);//devuelve el enlace de mercadopago
  })
    .catch(function (error) {
      error;
    });
    

};


module.exports = {
  statusOrder,
  checkoutCart,
  updateOrder
};

