import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/actions";
import styles from "./MyAdress.module.css";
import apiInstance from "../../services/apiAxios";

function MyAdress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { user, isAuthenticated } = useAuth0();

  //console.log(addres);
  // console.log(usuario);

  function returnHome() {
    navigate("/miperfil");
  }

  let render_user = usuario.filter((us) => us.id === user.sub);
  console.log(render_user[0].Addresses[0].street);

  return (
    <div>
      <fieldset className={styles.container}>
        <div className={styles.header}>
          <legend>Mis direcciones</legend>
        </div>
        {isAuthenticated && usuario?.length > 0 ? (
          <div>
            <div className={styles.infoContainer}>
              <div className={styles.divInfo}>
                <label className={styles.label}>Calle:</label>
                {render_user[0].Addresses[0].street}
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>Altura:</label>
                {render_user[0].Addresses[0].number}
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>Piso/Departamento/Lote:</label>
                {render_user[0].Addresses[0].apartment}
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>Ciudad:</label>
                {render_user[0].Addresses[0].city}
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>Provincia:</label>
                {render_user[0].Addresses[0].state}
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>País:</label>
                {render_user[0].Addresses[0].country}
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>Teléfono:</label>
                {render_user[0].Addresses[0].phone}
              </div>
            </div>
            <button className={styles.buyBtn} onClick={returnHome}>
              Editar
            </button>
            <button className={styles.buyBtn} onClick={returnHome}>
              Volver
            </button>
          </div>
        ) : (
          <LoginButton />
        )}
      </fieldset>
    </div>
  );
}

export default MyAdress;
