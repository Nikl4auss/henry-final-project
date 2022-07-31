import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions"
import OneUser from "./oneUser";


function UserDashboard () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usuario = useSelector((state) => state.allUser)

    useEffect(()=> {
        dispatch(getUsers())
    },[dispatch])

  //  console.log("este ",usuario)
    
    const { user,  isAuthenticated } = useAuth0();


    console.log (user)
  //  console.log("aqui",user)

    function returnHome () {
        navigate("/home")
    }

    return (    
        <div>
            <fieldset>
                <legend>Información de mi cuenta</legend>
                    {isAuthenticated && usuario?.length > 0 ? (
                        <div>
                            <OneUser prop={usuario} />
                            <button onClick={returnHome}>Volver</button>
                            <button onClick={returnHome}>Editar mi perfil</button>
                        </div>
                    ) : (
                    <LoginButton/>
                    )}
            </fieldset>
        </div>
    )
}

export default UserDashboard;