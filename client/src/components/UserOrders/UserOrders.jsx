import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import Orders from "../OrdersByUser/OrdersByUser";

function UserOrders() {

    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate()

    function returnHome() {
        navigate("/home")
    }
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <fieldset>
                        <legend>Mis compras</legend>

                    </fieldset>
                    <div><Orders /></div>
                    <button onClick={returnHome}>Volver</button>
                </div>

            ) : (

                <LoginButton />

            )}
        </div>
    )
}

export default UserOrders