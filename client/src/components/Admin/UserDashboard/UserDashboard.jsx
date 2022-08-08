import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../redux/actions";
import { blockUser } from '../../../services/usersServices'
import styles from "./UserDashboard.module.css";
import { toast } from "react-toastify";

function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.allUser);

  async function handleBlock(user) {
    const { id: userId, blocked } = user
    const token = await getAccessTokenSilently()
    toast.promise(
      blockUser(userId, !blocked, token),
      {
        pending: {
          render() {
            return `${blocked ? 'Desbloqueando' : 'Bloqueando'} Usuario`
          }
        },
        success: {
          render() {
            dispatch(getUsers())
            return `${!blocked === true ? 'Bloqueaste' : 'Desbloqueaste'} a ${user.name}`
          }
        },
        error: {
          render({ data }) {
            console.log(data)
            return `No se pudo ${blocked ? 'Desbloquear' : 'Bloqqquear'} al usuario`
          }
        }
      }
    )
  }
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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
                  <th className={styles.headCellBtn}>Bloquear Usuario</th>
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
                      <button onClick={() => handleBlock(item)}>
                        {`${item.blocked ? 'Desbloquear' : 'Bloquear'}`}
                      </button>
                    </td>
                    <td className={styles.btnCell}>
                      <button
                        onClick={() =>
                          alert("Nico! eliminame si tenes huevo!!")
                        }
                      >
                        Y
                      </button>
                    </td>
                    <td className={styles.btnCell}>
                      <button
                        onClick={() =>
                          alert("Nico! reseteame y te mato! jajaja")
                        }
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
