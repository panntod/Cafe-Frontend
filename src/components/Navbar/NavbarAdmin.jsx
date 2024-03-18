import { useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import AuthHelper from "../../helpers/AuthHelper";
import logo from "../../assets/logo.png";

export default function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus data dari localStorage
    AuthHelper.ClearAuth();
    // Navigasi ke halaman login
    navigate("/");
  };

  const MenuNavbar = (e) => {
    const list = document.querySelector("ul");
    const isOpen = e.target.name === "menuNavbar";

    e.target.name = isOpen ? "close" : "menuNavbar";

    list.classList.toggle("top-[60px]", isOpen);
    list.classList.toggle("opacity-100", isOpen);
    list.classList.toggle("z-10", isOpen);
  };

  return (
    <nav className="p-5 bg-gray-800 shadow-md md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-[Poppins] cursor-pointer">
          <img className="h-10 inline z-1" src={logo} alt="Pan Cafe" />
        </span>
        <span className="text-2xl font-[Poppins] cursor-pointer ml-5 text-white">
          Pan Cafe
        </span>
        <span className="text-3xl cursor-pointer mx-2 md:hidden block text-white">
          <IoMenuSharp name="menuNavbar" onClick={MenuNavbar} />
        </span>
      </div>

      <ul className="transp md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-800 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
        <li className="mx-4 my-6 md:my-0">
          <a
            href="Admin"
            className="text-xl hover:text-blue-900 duration-500 text-white"
          >
            Dashboard
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a
            href="Menu"
            className="text-xl hover:text-blue-900 duration-500 text-white"
          >
            Menu
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a
            href="Meja"
            className="text-xl hover:text-blue-900 duration-500 text-white"
          >
            Meja
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a
            href="User"
            className="text-xl hover:text-blue-900 duration-500 text-white"
          >
            User
          </a>
        </li>

        <Button
          className="mb-2w-full rounded-lg bg-gradient-to-tr from-blue-900 to-blue-400 py-3 px-6 text-sm font-bold uppercase text-white shadow-md shadow-gray-800/20 transition-all"
          type="button"
          onClick={handleLogout}
          data-ripple-light="true"
        >
          Log Out
        </Button>
      </ul>
    </nav>
  );
}
