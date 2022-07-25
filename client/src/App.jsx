import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/LandingPage/Landing";
import NavBar from "./components/NavBar/NavBar";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NewProduct from "./components/Admin/NewProduct";
import { ShopingCart } from "./components/ShopingCart/ShopingCart";
import Success from "./components/Payment/Success";
import Pending from "./components/Payment/Pending";
import Failure from "./components/Payment/Failure";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";
import Sucursales from "./components/Sucursales/Sucursales";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import Overview from "./components/Admin/Overview/Overview";
import ModifyProduct from "./components/Admin/Modified Product/ModifyProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/" element={<NavBar />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/carrito" element={<ShopingCart />} />
          <Route path="/pago">
            <Route path="success" element={<Success />} />
            <Route path="failure" element={<Failure />} />
            <Route path="pending" element={<Pending />} />
          </Route>
          <Route path="/product">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/sucursales" element={<Sucursales />} />
        </Route>
        <Route
          exact
          path="/admin"
          element={<ProtectedRoute component={Dashboard} role="Admin" />}
        >
          <Route index element={<Overview />} />
          <Route path="nuevoproducto" element={<NewProduct />} />
          <Route exact path="editarProducto/:id" element={<ModifyProduct />} />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </div>
  );
}

export default App;
