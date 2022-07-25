import { useRef } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

function Dashboard() {
  const menuRef = useRef(null);
  function activeClassName(active) {
    return active ? "bg-slate-300 border-" : null;
  }

  function handleClick(e) {
    menuRef.current.classList.toggle("-translate-x-full");
  }
  return (
    <div>
      <div className="grid md:grid-cols-[1fr_3fr] grid-rows-[15%_85%] h-screen overflow-hidden relative">
        <nav className="w-full flex items-center justify-end md:col-start-2 shadow-lg relative">
          <button className="absolute left-0 md:hidden" onClick={handleClick}>
            Show Menu
          </button>
          <Link to="/home">Volver a la tienda</Link>
        </nav>
        <main className="col-span-full md:col-start-2 p-3 bg-blue-100">
          <Outlet />
        </main>
        <aside
          ref={menuRef}
          className="absolute w-2/5 h-full -translate-x-full transition-transform duration-500 md:translate-x-0 md:static md:w-full flex flex-col justify-start gap-3 px-2 bg-blue-600 row-span-full"
        >
          <button
            className="z-10 absolute right-4 md:hidden"
            onClick={handleClick}
          >
            X
          </button>
          <div>
            <img
              src="https://res.cloudinary.com/davoshoes/image/upload/v1658524699/LOGO/davo_shoes_1000_500_px_rxlpz2.png"
              alt="logo"
              className="max-w-full"
            />
          </div>
          <NavLink
            to="/admin"
            className={({ isActive }) => activeClassName(isActive)}
            end
          >
            Vista General
          </NavLink>
          <NavLink
            to="/admin/nuevoproducto"
            className={({ isActive }) => activeClassName(isActive)}
          >
            Productos
          </NavLink>
          <NavLink
            to="/admin/sucursales"
            className={({ isActive }) => activeClassName(isActive)}
          >
            Sucursales
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ active }) => activeClassName(active)}
          >
            Orders
          </NavLink>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
