import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./CheckOut.module.css";
import Map from "../Map/Map";
import Shipping from "../Payment/Shipping";
import { payCart } from "../../services/shopingCart";
import ProductItem from "../ShopingCart/productItem";

// import { IoMdClose } from "react-icons/io";

export function CheckOut() {
  const [estadoEnvio, setEstadoEnvio] = useState();
  const [estadoSucursal, setEstadoSucursal] = useState();
  const order = useSelector((state) => state.order);
  const idOrder = useSelector((state) => state.idOrder);
  // const [product, setProduct] = useState({});
  // const [cantidad, setCantidad] = useState();

  let total = useMemo(() => {
    let count = 0;
    order?.forEach(
      (pr) => (count = count + parseFloat(pr.price) * pr.quantity)
    );
    return count;
  }, [order]);
  // const [active, setActive] = useState()

  let articulos = useMemo(() => {
    let count = 0;
    if (order.length === 0) return 0;
    order?.forEach((pr) => (count = count + pr.quantity));
    return count;
  }, [order]);

  async function redirectPay(e) {
    const data = await payCart(order, idOrder.orderId);
    window.location.href = data;
  }

  return (
    <>
      {
        <div className={styles.container}>
          <h1 className={styles.header}>Datos de envío</h1>
          <div className={styles.Encabezado}>
            <h3>Elegí como querés obtener tu producto</h3>
          </div>
          <div className={styles.subContainer}>
            {/* <button
                        onClick={() => setActive(!active)}
                        className={styles.close}><IoMdClose /></button> */}
            <div className={styles.btnContainer}>
              <button
                onClick={() => {
                  setEstadoEnvio(true);
                  setEstadoSucursal(false);
                }}
                className={styles.envio}
              >
                {" "}
                Envío a domicilio{" "}
              </button>
              <button
                onClick={() => {
                  setEstadoEnvio(false);
                  setEstadoSucursal(true);
                }}
                className={styles.sucursal}
              >
                {" "}
                Retiro por sucursal{" "}
              </button>
            </div>

            {estadoEnvio ? (
              <div className={styles.containerShipping}>
                <Shipping />
              </div>
            ) : (
              <div></div>
            )}
            {estadoSucursal ? (
              <div className={styles.containerMap}>
                <div>
                  <p>
                    <strong>Dirección de retiro:</strong> <br />
                    Liners 320, Provincia de Buenos Aires
                  </p>
                  <p>
                    <strong>Horarios:</strong> <br />
                    8:00 h - 18:00 h
                  </p>
                  <p>
                    <strong>Teléfono:</strong> <br />
                    1133456498
                  </p>
                </div>
                <Map />
                {estadoSucursal ? (
                  <button className={styles.btnPago} onClick={redirectPay}>
                    Pagar
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.divBtnPago}>
            {/* {estadoEnvio || estadoSucursal ?
                            <button className={styles.btnPago} onClick={redirectPay}>Pagar</button>
                            : <div></div>
                        } */}
            <div className={styles.grid}>
              <div className={styles.orderInfo}>
                <h3 className={styles.orderResumen}>Resumen del pedido</h3>
                <div className={styles.cartTotal}>
                  <h1 className={styles.cartTotalTitle}>
                    Subtotal: ${total}.00{" "}
                  </h1>
                  {/* <h1 className={styles.cartTotalPrice}>${total}.00</h1> */}
                  <h1 className={styles.CardEnvio}>Envio: $0,00</h1>
                  <h1 className={styles.cartTotalTitle}>Total: ${total}.00 </h1>
                  {/* <h1 className={styles.cartTotalPrice}>${total}.00</h1> */}
                </div>
              </div>

              <div className={styles.orderInfo}>
                <h3 className={styles.orderResumen}>Resumen de la orden</h3>
                <h1 className={styles.quantity}>
                  ({order.length === 0 ? 0 : articulos} productos)
                </h1>
                <div className={styles.cartProducts}>
                  {order?.map((element, i) => (
                    <ProductItem
                      key={i}
                      id={element.id}
                      quantity={element.quantity}
                      stock={element.stock_product}
                      name={element.title}
                      price={element.unit_price}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
