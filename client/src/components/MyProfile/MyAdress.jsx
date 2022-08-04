import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import styles from './MyAdress.module.css';

function MyAdress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { user, isAuthenticated } = useAuth0();

  // console.log(user)
  // console.log(usuario)

  function returnHome() {
    navigate("/miperfil");
  }

  let render_user = usuario.filter((us) => us.id === user.sub);
  console.log(render_user[0]);
  return (
    <div>
      <fieldset className={styles.container}>
        <div className={styles.header}>
          <legend >Mis direcciones</legend>
        </div>
        {isAuthenticated && usuario?.length > 0 ? (
          <div>
            <div className={styles.infoContainer}>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Calle:
                </label>
                <>Pedernera</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Altura:
                </label>
                <>1234</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Piso/Departamento/Lote:
                </label>
                <>-</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Ciudad:
                </label>
                <>San Isidro</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Provincia:
                </label>
                <>Buenos Aires</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  País:
                </label>
                <>Argentina</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Teléfono:
                </label>
                <>1234567890</>
              </div>
            </div>
            <button className={styles.buyBtn} onClick={returnHome}>Editar</button>
            <button className={styles.buyBtn} onClick={returnHome}>Volver</button>
          </div>
        ) : (
          <LoginButton />
        )}
      </fieldset>
    </div>
  );
}

export default MyAdress;
