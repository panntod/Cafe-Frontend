import Select from "react-select";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout, CustomButton } from "../../components/index";
import { fetchAllMenu } from "../../utils/Menu";
import { mejaKosong } from "../../utils/Meja";
import { addTransaksi } from "../../utils/Transaksi";

function TambahTransaksi() {
  const [detailTransaksi, setDetailTransaksi] = useState([]);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [idUser, setIdUser] = useState("");
  const [idMeja, setIdMeja] = useState({});
  const [status, setStatus] = useState({});
  const [meja, setMeja] = useState([]);
  const [menu, setMenu] = useState([]);
  const [harga, setHarga] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
    fetchMeja();
    fetchUser();
  }, []);

  const fetchMenu = async () => {
    const dataMenu = await fetchAllMenu();
    setMenu(dataMenu);
  };

  const fetchUser = async () => {
    const idUser = localStorage.getItem("id_user");
    setIdUser(idUser);
  };

  const fetchMeja = async () => {
    const dataMeja = await mejaKosong();
    setMeja(dataMeja?.data?.data);
  };

  const handleAddToCart = (id_menu, qty) => {
    const existingItem = detailTransaksi.find(
      (item) => item.id_menu === id_menu,
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        qty: existingItem.qty + qty,
        harga: existingItem.harga,
      };

      // Pastikan qty tidak negatif
      if (updatedItem.qty < 1) {
        updatedItem.qty = 0;
      }

      const updatedTransaksi = detailTransaksi.map((item) =>
        item.id_menu === id_menu ? updatedItem : item,
      );
      setDetailTransaksi(updatedTransaksi);
    } else {
      const newItem = { id_menu: id_menu, qty: Math.max(0, qty), harga };
      const updatedTransaksi = [...detailTransaksi, newItem];
      setDetailTransaksi(updatedTransaksi);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Filter detailTransaksi untuk menyertakan hanya item dengan qty yang lebih besar dari 0
      const filteredDetailTransaksi = detailTransaksi.filter(
        (item) => item.qty > 0,
      );

      if (filteredDetailTransaksi.length === 0) {
        // Jika tidak ada item yang memenuhi kriteria, tampilkan pesan atau lakukan sesuatu yang sesuai
        alert("Detail transaksi tidak boleh kosong");
        return;
      }

      const transaksiData = {
        id_user: idUser,
        id_meja: idMeja.value,
        nama_pelanggan: namaPelanggan,
        status: status.value,
        detail_transaksi: filteredDetailTransaksi,
      };

      const response = await addTransaksi(transaksiData);

      if (response.data.success) {
        alert("Transaksi berhasil ditambahkan");
        navigate("/Transaksi", { replace: true });
      } else {
        console.log(response);
        alert("Terjadi kesalahan saat menambahkan transaksi");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menambahkan transaksi");
    } finally {
      setIdUser("");
      setIdMeja("");
      setNamaPelanggan("");
      setStatus("");
      setDetailTransaksi([]);
      setTotalHarga(0);
    }
  };

  const calculateTotalHarga = () => {
    let total = 0;
    detailTransaksi.forEach((item) => {
      const menuItem = menu.find((menuItem) => menuItem.id === item.id_menu);
      total += item.qty * menuItem.harga;
    });
    setHarga(total);
    return Math.max(0, total);
  };

  useEffect(() => {
    const total = calculateTotalHarga();
    setTotalHarga(total);
  }, [detailTransaksi, menu]);

  return (
    <NavbarLayout>
      <div className="py-6 overflow-auto">
        <h1 className="flex justify-center font-semibold text-4xl">
          Tambah Transaksi
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 mx-14 sm:p-5"
        >
          {/* Nomor Meja */}
          <div>
            <label className="block mb-2 font-bold text-gray-900">
              Nomor Meja:
            </label>
            <Select
              onChange={(selectedOption) => setIdMeja(selectedOption)}
              value={idMeja}
              options={meja?.map((mejaItem) => ({
                value: mejaItem.nomor_meja,
                label: mejaItem.nomor_meja,
              }))}
              required
            />
          </div>

          {/* Nama Pelanggan */}
          <div>
            <label className="block mb-2 font-bold text-gray-900">
              Nama Pelanggan:
            </label>
            <input
              type="text"
              placeholder="Masukkan Nama Pelanggan"
              value={namaPelanggan}
              onChange={(event) => setNamaPelanggan(event.target.value)}
              className="w-full py-2 pl-4 text-sm outline-none bg-white text-gray-700 rounded border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>

          {/* Status Pembayaran */}
          <div>
            <label className="block mb-2 font-bold text-gray-900">
              Status Pembayaran:
            </label>
            <Select
              onChange={(selectedOption) => setStatus(selectedOption)}
              value={status}
              options={[
                { label: "Belum Bayar", value: "belum_bayar" },
                { label: "Lunas", value: "lunas" },
              ]}
              required
            />
          </div>

          {/* Daftar Menu */}
          <div className="col-span-2 mt-10">
            <table className="w-full text-md bg-slate-100 rounded-md shadow-lg overflow-hidden mb-5 ">
              <thead>
                <tr className="bg-slate-200 ">
                  <th className="text-center p-3 px-5">Menu</th>
                  <th className="text-center p-3 px-5">Harga</th>
                  <th className="text-center p-3 px-5">Jumlah</th>
                  <th className="text-center p-3 px-5">Total</th>
                  <th className="text-center p-3 px-5">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {menu &&
                  menu.map((menu) => (
                    <tr key={menu.id} className="hover:bg-gray-300">
                      <td className="text-center p-3 px-5">{menu.nama_menu}</td>
                      <td className="text-center p-3 px-5">{menu.harga}</td>
                      <td className="text-center p-3 px-5">
                        <p>
                          {detailTransaksi.find(
                            (item) => item.id_menu === menu.id,
                          )?.qty || 0}
                        </p>
                      </td>
                      <td className="p-3 px-2 text-center">
                        {menu.harga *
                          (detailTransaksi.find(
                            (item) => item.id_menu === menu.id,
                          )?.qty || 0)}
                      </td>
                      <td className="p-3 px-5 text-center" required>
                        <CustomButton
                          type="button"
                          onClick={() => handleAddToCart(menu.id, -1)}
                          color="red"
                          disabled={
                            detailTransaksi.find(
                              (item) => item.id_menu === menu.id,
                            )?.qty <= 0
                          }
                        >
                          Kurang
                        </CustomButton>
                        <CustomButton
                          type="button"
                          color="blue"
                          className="ml-3"
                          onClick={() => handleAddToCart(menu.id, 1)}
                        >
                          Tambah
                        </CustomButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Total Harga */}
          <div>
            <label className="block mb-1 text-xl font-bold text-gray-900">
              Total Harga:
            </label>
            <span className="text-xl font-semibold">{totalHarga}</span>
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end items-center">
            <CustomButton color="green" type="submit">
              Tambah Transaksi
            </CustomButton>
          </div>
        </form>
      </div>
    </NavbarLayout>
  );
}

export default TambahTransaksi;
