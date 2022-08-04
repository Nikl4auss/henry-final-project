import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import styles from './MyInfo.module.css';

function MyInfo() {
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
        <legend>Información de mi cuenta</legend>
        </div>
        {isAuthenticated && usuario?.length > 0 ? (
          <div>
            <div className={styles.infoContainer}>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Nombre:
                </label>
                <>{render_user[0].name}</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Apellido:
                </label>
                <>{render_user[0].surname}</>
              </div>
              <div className={styles.divInfo}>
                <label className={styles.label}>
                  Email:
                </label>
                <>{render_user[0].email}</>
              </div>
            </div>
            {/* <button onClick={returnHome}>Volver</button> */}
          </div>
        ) : (
          <LoginButton />
        )}
      </fieldset>
    </div>
  );
}

export default MyInfo;
