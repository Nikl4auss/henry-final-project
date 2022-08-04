import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";
import MyInfo from "./MyInfo";
import styles from './MyProfile.module.css';

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { user, isAuthenticated } = useAuth0();

  //console.log(user);
  //console.log(usuario);

  function goToMyInfo() {
    navigate("/miperfil");
  }

  function goToMyAdress() {
    navigate("misdirecciones");
  }

  let render_user = usuario.filter((us) => us.id === user.sub);
  //console.log(render_user[0]);
  return (
    <div className={styles.grid}>
      {/* <NavLink to="misdatos" element={<MyInfo />}>
        Mis datos
      </NavLink> */}
      <div className={styles.menuBtns}>
        <button className={styles.btn} onClick={goToMyInfo}>Mis datos</button>
        <button onClick={goToMyAdress}>Mis direcciones</button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MyProfile;
