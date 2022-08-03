import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";

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
      <fieldset>
        <legend>Información de mi cuenta</legend>
        {isAuthenticated && usuario?.length > 0 ? (
          <div>
            <label>
              Nombre:
              <p>{render_user[0].name}</p>
            </label>
            <label>
              Apellido:
              <p>{render_user[0].surname}</p>
            </label>
            <label>
              email:
              <p>{render_user[0].email}</p>
            </label>
            <button onClick={returnHome}>Volver</button>
          </div>
        ) : (
          <LoginButton />
        )}
      </fieldset>
    </div>
  );
}

export default MyInfo;
