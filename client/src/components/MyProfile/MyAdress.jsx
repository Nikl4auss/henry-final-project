import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions";

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
      <fieldset>
        <legend>Mi dirección</legend>
        {isAuthenticated && usuario?.length > 0 ? (
          <div>
            <label>
              {" "}
              Calle:
              <p>holi</p>
            </label>
            <label>
              {" "}
              Altura:
              <p>muy alto</p>
            </label>
            <label>
              {" "}
              Piso/Departamento/Lote:
              <p>0</p>
            </label>
            <label>
              {" "}
              País:
              <p>0</p>
            </label>
            <label>
              {" "}
              Provincia:
              <p>0</p>
            </label>
            <label>
              {" "}
              Ciudad:
              <p>0</p>
            </label>
            <label>
              {" "}
              Código Postal:
              <p>0</p>
            </label>
            <label>
              {" "}
              Teléfono:
              <p>0</p>
            </label>
            <button onClick={returnHome}>Volver</button>
            <button onClick={returnHome}>Editar</button>
          </div>
        ) : (
          <LoginButton />
        )}
      </fieldset>
    </div>
  );
}

export default MyAdress;
