import { useRef } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import styles from "./dashboard.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import UserDashboard from "../UserDashboard/UserDashboard";

function Dashboard() {
  const menuRef = useRef(null);
  function activeClassName(active) {
    return active ? "text-zink-800 bg-neutral-100 border- " : "text-white";
  }

  function handleClick(e) {
    menuRef.current.classList.toggle("-translate-x-full");
  }
  return (
    <div className="grid md:grid-cols-[1fr_3fr] grid-rows-[4%_100%] min-h-full relative">
      <nav className="w-full flex items-center justify-end md:col-start-2 shadow-lg h-24 relative bg-neutral-900">
        <button
          className="absolute left-4 md:hidden text-white text-2xl"
          onClick={handleClick}
        >
          <GiHamburgerMenu />
        </button>
        <div className={styles.searchbar}>
          <SearchBar />
        </div>
        <div className={styles.btnBack}>
          <Link to="/inicio">Volver a la tienda</Link>
        </div>
      </nav>
      <main className="col-span-full p-2 md:col-start-2 bg-neutral-100">
        <Outlet />
      </main>
      <aside
        ref={menuRef}
        className="absolute w-80 min-h-screen -translate-x-full transition-transform duration-500 md:translate-x-0 md:static md:w-full flex flex-col justify-start gap-3 px-2 bg-neutral-300 row-span-full"
      >
        <button
          className="z-10 absolute mt-1 right-4 text-zink-800 bg-zinc-50 rounded-full md:hidden"
          onClick={handleClick}
        >
          <IoMdClose />
        </button>
        <div className="w-80">
          <img
            src="https://res.cloudinary.com/davoshoes/image/upload/v1658524699/LOGO/davo_shoes_1000_500_px_rxlpz2.png"
            alt="logo"
            className="w-52"
          />
        </div>
        <NavLink
          to="/admin"
          className={({ isActive }) => activeClassName(isActive)}
          end
        >
          Lista de productos
        </NavLink>
        <NavLink
          to="nuevoproducto"
          className={({ isActive }) => activeClassName(isActive)}
        >
          Crear Producto
        </NavLink>
        <NavLink
          to="sucursales"
          className={({ isActive }) => activeClassName(isActive)}
        >
          Sucursales
        </NavLink>
        <NavLink
          to="ordenes"
          className={({ isActive }) => activeClassName(isActive)}
        >
          Órdenes
        </NavLink>
        <NavLink
          to="usuarios"
          className={({ isActive }) => activeClassName(isActive)}
        >
          Usuarios
        </NavLink>
      </aside>
    </div>
  );
}

export default Dashboard;
