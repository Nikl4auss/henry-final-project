// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const {ACCESS_TOKEN, CLIENT_URL} = require('../utils/config.js')
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});


const checkoutCart = (req, res) => {
   let {itemsCart} = req.body;
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
      success: `${CLIENT_URL}/pago/success`,
      failure: `${CLIENT_URL}/pago/failure`,
      pending: `${CLIENT_URL}/pago/pending`,
    },
    //notification_url: "http://localhost:3001/payment/feedback", //tiene que ser una ruta https
    auto_return: "approved",
    external_reference: idOrder.toString(),
  };
  mercadopago.preferences
    .create(preference)
    .then(function (respuesta) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      const preferenceId = respuesta.body.init_point;
      res.send(preferenceId);//devuelve el enlace de mercadopago
   })
    .catch(function (error) {
      error;
    });
   
};

module.exports = checkoutCart;

