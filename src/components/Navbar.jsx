import NavbarAdmin from "./Navbar/NavbarAdmin";
import NavbarKasir from "./Navbar/NavbarKasir";
import NavbarManajer from "./Navbar/NavbarManajer";
import AuthHelper from "../helpers/AuthHelper";

export default function NavbarLayout({ children }) {
  const userRole = AuthHelper.GetRole();

  const roles = ["admin", "kasir", "manajer"];

  const navbarComponents = [
    <NavbarAdmin />,
    <NavbarKasir />,
    <NavbarManajer />,
  ];

  const selectedNavbar = navbarComponents[roles.indexOf(userRole)];

  return (
    <div>
      {selectedNavbar}
      {children}
    </div>
  );
}
