import { useState, useEffect } from "react";
import { NavbarLayout, TopMenuCard } from "../../components/index";
import { fetchAllMejas } from "../../utils/Meja";
import { fetchAllMenu } from "../../utils/Menu";
import { fetchAllUsers } from "../../utils/User";
import { topSellingMenu } from "../../utils/Transaksi";

function DashboardManajer() {
  const [mejas, setMejas] = useState("");
  const [menus, setMenus] = useState("");
  const [user, setUser] = useState("");
  const [menuLaris, setMenuLaris] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([getMejas(), getMenus(), getUser(), getMenuLaris()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMejas = async () => {
    const dataMeja = await fetchAllMejas();
    setMejas(dataMeja);
  };

  const getMenus = async () => {
    const dataMenu = await fetchAllMenu();
    setMenus(dataMenu);
  };

  const getUser = async () => {
    const dataUser = await fetchAllUsers();
    setUser(dataUser);
  };

  const getMenuLaris = async () => {
    const dataMenu = await topSellingMenu();
    setMenuLaris(dataMenu);
  };

  return (
    <NavbarLayout>
      <div className="bg-gray-100">
        <div className="container px-6 py-8 mx-auto">
          <div className="container mx-auto">
            <h1 className="text-gray-800 my-4 font-extrabold text-center text-3xl">
              Selamat datang, Manager
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* menu */}
            <div className="w-full p-8 space-y-8 text-center bg-blue-500 rounded-lg">
              <p className="font-medium text-gray-100 uppercase">Menu</p>

              <h2 className="text-5xl font-bold text-white uppercase">
                {menus?.length}
              </h2>
              <p className="font-medium text-gray-100">Jumlah Menu</p>
            </div>

            {/* meja */}
            <div className="w-full p-8 space-y-8 text-center border bg-blue-700 rounded-lg ">
              <p className="font-medium uppercase text-gray-100">Meja</p>
              <h2 className="text-5xl font-bold uppercase text-white">
                {mejas?.length}
              </h2>
              <p className="font-medium text-gray-100">Jumlah Meja</p>
            </div>

            {/* user */}
            <div className="w-full p-8 space-y-8 text-center bg-blue-900 rounded-lg ">
              <p className="font-medium uppercase text-gray-100">User</p>

              <h2 className="text-5xl font-bold uppercase text-white">
                {user?.length}
              </h2>

              <p className="font-medium text-gray-100">
                Jumlah user (Admin, Manajer, Kasir)
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Top Selling Menu
            </h2>
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {menuLaris?.map((menu) => (
                  <TopMenuCard key={menu.id} menu={menu} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
}

export default DashboardManajer;
