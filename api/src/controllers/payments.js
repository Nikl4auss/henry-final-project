// SDK de Mercado Pago
const { json } = require("body-parser");
const mercadopago = require("mercadopago");
const EmailCtrl = require('../controllers/mailController.js');
const {ACCESS_TOKEN, CLIENT_URL, API_URL} = require('../utils/config.js')
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

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
        unit_price: parseInt(i.unit_price),
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
  checkoutCart
};

