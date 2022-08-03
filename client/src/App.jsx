import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home";
import Landing from "./components/LandingPage/Landing";
import NavBar from "./components/NavBar/NavBar";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NewProduct from "./components/Admin/NewProduct";
import { ShopingCart } from "./components/ShopingCart/ShopingCart";
import { CheckOut } from "./components/CheckOut/CheckOut";
import Success from "./components/Payment/Success";
import Pending from "./components/Payment/Pending";
import Failure from "./components/Payment/Failure";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";
import MyProfile from "./components/MyProfile/MyProfile";
import Sucursales from "./components/Sucursales/Sucursales";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import Overview from "./components/Admin/Overview/Overview";
import ModifyProduct from "./components/Admin/ModifiedProduct/ModifyProduct";
import LineOrder from "./components/Admin/LineOrder/LineOrder";
import Products from "./components/Admin/Products/Products";
import UserDashboard from "./components/Admin/UserDashboard/UserDashboard";
import OrdersByUser from "./components/OrdersByUser/OrdersByUser";
import Orders from './components/Admin/Orders/Orders'
import DetailOrder from "./components/DetailOrder/DetailOrder";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/" element={<NavBar />}>
          <Route exact path="/inicio" element={<Home />} />
          <Route exact path="/carrito" element={<ShopingCart />} />
          < Route path="/checkout" element={<CheckOut />} />
          <Route path="/pago">
            <Route path="exitoso" element={<Success />} />
            <Route path="fallido" element={<Failure />} />
            <Route path="pendiente" element={<Pending />} />
          </Route>
          <Route path="/producto">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path='/sucursales' element={<Sucursales />} />
          <Route exact path="/miperfil" element={<MyProfile />} />
          <Route exact path="/misordenes" >
            <Route index element={<OrdersByUser />} />
            <Route exact path=":id" element={<DetailOrder />} />
          </Route>
        </Route>
        <Route
          exact
          path="/admin"
          element={<ProtectedRoute component={Dashboard} role="Admin" />}
        >
          {/* <Route index element={<Overview />} /> */}
          <Route index element={<Products />} />
          <Route exact path="nuevoproducto" element={<NewProduct />} />
          <Route exact path="editarProducto/:id" element={<ModifyProduct />} />
          <Route path='ordenes' >
            <Route index element={<Orders />} />
            <Route exact path=":id" element={<LineOrder />} />
          </Route>
          <Route exact path="usuarios" element={<UserDashboard />} />
        </Route>
        <Route path="/sin-autorizacion" element={<NotAuthorized />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
