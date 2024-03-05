import React, { useState, useEffect } from "react";
import { CustomButton, NavbarLayout } from "../../components/index";

import { fetchAllMenu } from "../../utils/Menu";
import { fetchAllMejas } from "../../utils/Meja";
import { fetchAllUsers } from "../../utils/User";

function DashboardAdmin() {
  const [mejas, setMejas] = useState([]);
  const [menus, setMenus] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async() => {
    getMejas();
    getMenus();
    getUsers();
  }

  const getMejas = async () => {
    const dataMeja = await fetchAllMejas();
    setMejas(dataMeja);
  };

  const getMenus = async () => {
    const dataMenu = await fetchAllMenu();
    setMenus(dataMenu);
  };

  const getUsers = async () => {
    const dataUser = await fetchAllUsers();
    setUsers(dataUser);
  };

  return (
    <NavbarLayout>
      <div className="container mx-auto">
        <h1 className="text-teal-500 my-4 font-extrabold text-center text-3xl">
          Selamat datang di Admin Panel
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full p-8 space-y-8 text-center bg-teal-400 rounded-lg">
            <p className="font-semibold text-gray-200 uppercase">Menu</p>
            <h2 className="text-5xl font-bold text-white uppercase">
              {menus.length}
            </h2>
            <p className="font-semibold text-gray-200">Jumlah Menu</p>
            <CustomButton color="blue" disabled={false} onClick={getMenus}>
              Refresh Menu
            </CustomButton>
          </div>

          <div className="w-full p-8 space-y-8 text-center border bg-teal-500 rounded-lg">
            <p className="font-semibold uppercase text-gray-200">Meja</p>
            <h2 className="text-5xl font-bold uppercase text-white">
              {mejas.length}
            </h2>
            <p className="font-semibold text-gray-200">Jumlah Meja</p>
            <CustomButton color="blue" onClick={getMejas}>
              Refresh Meja
            </CustomButton>
          </div>

          <div className="w-full p-8 space-y-8 text-center bg-teal-600 rounded-lg">
            <p className="font-semibold uppercase text-gray-200">User</p>
            <h2 className="text-5xl font-bold uppercase text-white">
              {users.length}
            </h2>
            <p className="font-semibold text-gray-200">
              Jumlah user (admin, Manajer, Kasir)
            </p>
            <CustomButton color="blue" onClick={getUsers}>
              Refresh User
            </CustomButton>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
}

export default DashboardAdmin;
