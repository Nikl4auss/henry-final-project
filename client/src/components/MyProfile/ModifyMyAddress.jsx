import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./ModifyMyAddress.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function postAddress(payload) {
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/address", payload, {});
    return json;
  };
}

function validate(input) {
  let errors = {};
  if (!input.street) {
    //console.log("calle");
    errors.street = "Calle para entrega es requerida.";
  } else if (!input.number) {
    errors.number = "Altura de la calle es requerida.";
  } else if (!input.country) {
    errors.country = "País es requerido.";
  } else if (!input.state) {
    errors.state = "Provincia es requerida.";
  } else if (!input.city) {
    errors.city = "Ciudad es requerida.";
  } else if (!input.postalCode) {
    errors.postalCode = "Código Postal es requerido.";
  } else if (!input.phone) {
    errors.phone = "Número de teléfono es requerido.";
  }
  return errors;
}

export default function ModifyMyAdress() {
  const { user } = useAuth0();
  //console.log(user.sub);

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    street: "",
    number: "",
    apartment: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    phone: "",
    comment: "",
    idUser: "google-oauth2|116882396145643655241",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.entries(errors).length !== 0) {
      let sendErrors = [];
      for (const key in errors) {
        sendErrors.push(
          `${key[0].toUpperCase() + key.slice(1)}: ${errors[key]}`
        );
      }
      return alert(sendErrors);
    } else if (input.street) {
      dispatch(postAddress(input));
      setInput({
        addressee: "",
        street: "",
        number: "",
        aparment: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        phone: "",
        comment: "",
        idUser: "google-oauth2|116882396145643655241",
      });
      return alert("Dirección guardada!");
    }
    //console.log("aqui");
    console.log(errors);
    return alert("Dirección requerida!");
  }
  console.log(input);

  return (
    <div>
      <h2 className={styles.title}>Dirección de envío</h2>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.street}
            name="street"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>Calle:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.number}
            name="number"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>Altura:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.apartment}
            name="apartment"
            onChange={(e) => handleChange(e)}
            placeholder="Ej: 2A, L111"
          ></input>
          <label>Piso/Departamento/Lote:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.postalCode}
            name="postalCode"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>Código Postal:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.city}
            name="city"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>Ciudad:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.state}
            name="state"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>Provincia:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.country}
            name="country"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>País:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.comment}
            name="comment"
            onChange={(e) => handleChange(e)}
            placeholder="Completar de ser necesario"
          ></input>
          <label>Comentarios de Entrega:</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            value={input.phone}
            name="phone"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <label>Teléfono:</label>
        </div>
        <button onClick={handleSubmit} type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}
