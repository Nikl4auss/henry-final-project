import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../services/apiAxios";
import { getStatusOrder } from "../../services/shopingCart";
import { useLocalStorage } from "../../services/useStorage";
import styles from "./Success.module.css";

export default function Success() {
  const [cart, setCart] = useLocalStorage("cart");
  const [dataStatusOrder, setDataStatusOrder] = useState("");
  const urlSearchParams = new URLSearchParams(window.location.search);
  let payment_id = urlSearchParams.get("payment_id");
  let external_reference = urlSearchParams.get("external_reference");

  async function sendMail() {
    const { data } = await apiInstance.post("/email", {
      name: "Estefi Bologna",
      email: "estefibologna@gmail.com",
      subject: "recibimos tu pago",
      delivery: true,
    });
    return data;
  }
  let send = false;
  useEffect(() => {
    setCart([]);
    getStatusOrder(payment_id, external_reference).then((data) => {
      setDataStatusOrder(data.status);
      console.log(data.status);

      if (!send && data.status === "approved") {
        sendMail();
        send = true;
      }
    });
  }, [payment_id]);

  console.log(dataStatusOrder);
  return dataStatusOrder === "approved" ? (
    <div>
      <p>Su pago se realizó con éxito, muchas gracias!</p>
      <p>{dataStatusOrder}</p>
      <Link to="/home" className={styles.btn}>
        ◀ Volver
      </Link>
    </div>
  ) : (
    <div>Loading</div>
  );
}
