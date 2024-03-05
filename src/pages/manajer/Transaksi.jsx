import React, { useState, useEffect } from "react";
import {
  NavbarLayout,
  CustomButton,
  SearchInput,
} from "../../components/index";
import {
  deleteTransaksi,
  fetchAllTransaksi,
  findTransaksi
} from "../../utils/Transaksi";

// DAFTAR TRANSAKSI
const Transaksi = () => {
  let [search, setSearch] = useState("");
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    const dataTransaksi = await fetchAllTransaksi();
    setTransaksi(dataTransaksi);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredTransaksi = await findTransaksi(search);
    setTransaksi(filteredTransaksi);
  };

  const handleDelte = async (id) => {
    if (window.confirm("Are you sure to delete this data?")) {
      const response = await deleteTransaksi(id);
      alert(response.message);
      fetchTransaksi();
    }
  };

  return (
    <NavbarLayout>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Daftar Transaksi
        </h1>
        <div className="flex justify-content-between align-items-center mb-3">
          {/* search form*/}
          <form
            className="w-full flex justify-end text-gray-100"
            onSubmit={(e) => handleSearch(e)}
          >
            <SearchInput search={search} setSearch={setSearch} />
          </form>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal Transaksi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Pelanggan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No Meja
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Menu
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transaksi?.map((transaksiItem, index) => (
                <tr key={`detail-${transaksiItem.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Intl.DateTimeFormat("id-ID").format(
                      new Date(transaksiItem.tgl_transaksi)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaksiItem.nama_pelanggan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaksiItem.meja.nomor_meja}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaksiItem.user.nama_user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {transaksiItem.detail_transaksi?.map((detailItem) => (
                        <li key={`detail_transaksi-${detailItem.id}`}>
                          {detailItem.menu.nama_menu} ({detailItem.qty})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      transaksiItem.detail_transaksi.reduce(
                        (total, detailItem) =>
                          total + detailItem.menu.harga * detailItem.qty,
                        0
                      )
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaksiItem.status === "belum_bayar" ? (
                      <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md">
                        Belum Bayar
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md"
                        disabled
                      >
                        Lunas
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CustomButton
                      color="red"
                      onClick={() => handleDelte(transaksiItem.id)}
                    >
                      Hapus
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Transaksi;
