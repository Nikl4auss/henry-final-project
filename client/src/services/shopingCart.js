import apiInstance from "./apiAxios";

export async function getStatusOrder(payment_id, external_reference) {
  const { data } = await apiInstance.post("/payment/feedback", {
    payment_id,
    external_reference,
  });
  return data;
}

export async function payCart(itemsCart, idOrder) {
  const response = await apiInstance.post("/payment", {
    itemsCart,
    idOrder,
  });
  return response.data;
}
