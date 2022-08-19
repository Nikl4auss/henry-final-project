import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../redux/actions";
import styles from "./UserDashboard.module.css";

function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { user, isAuthenticated } = useAuth0();

  return (
    <div className={styles.generalContainer}>
      <fieldset>
        <legend className={styles.title}>Usuarios</legend>
        {isAuthenticated && usuario?.length > 0 ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr className={styles.headRow}>
                  <th className={styles.headCell}>Nombre</th>
                  <th className={styles.headCell}>Apellido</th>
                  <th className={styles.headCell}>email</th>
                  <th className={styles.headCellBtn}>Cambiar rol</th>
                  <th className={styles.headCellBtn}>Eliminar usuario</th>
                  <th className={styles.headCellBtn}>Resetear contraseña</th>
                </tr>
              </thead>
              <tbody>
                {usuario.map((item) => (
                  <tr className={styles.row}>
                    <td className={styles.cell}>{item.name}</td>
                    <td className={styles.cell}>{item.surname}</td>
                    <td className={styles.cell}>{item.email}</td>
                    <td className={styles.btnCell}>
                      <button>
                        X
                      </button>
                    </td>
                    <td className={styles.btnCell}>
                      <button
                        
                      >
                        Y
                      </button>
                    </td>
                    <td className={styles.btnCell}>
                      <button
                        
                      >
                        Z
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <LoginButton />
        )}
      </fieldset>
    </div>
  );
}

export default UserDashboard;
