import { useState, useEffect, useRef } from "react";
import {
  fetchTransaksiKasir,
  findTransaksi,
  updateTransaksi,
} from "../../utils/Transaksi";
import { usePDF, Margin } from "react-to-pdf";

import { Typography } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  NavbarLayout,
  CustomButton,
  SearchInput,
} from "../../components/index";

// DAFTAR TRANSAKSI
const Transaksi = () => {
  let [search, setSearch] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [selectedItem, setselectedItem] = useState(null);
  const [showNota, setshowNota] = useState(false);

  const { toPDF, targetRef } = usePDF({
    filename: "receipt.pdf",
    page: { margin: Margin.MEDIUM },
  });

  useEffect(() => {
    fetchTransaksi();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      toPDF();
      setshowNota(false);
    }
  }, [selectedItem]);

  const fetchTransaksi = async () => {
    const dataTransaksi = await fetchTransaksiKasir();
    setTransaksi(dataTransaksi);
  };

  const handleToggleStatus = async (transaksiItem) => {
    const updatedTransaksi = {
      ...transaksiItem,
      status: transaksiItem.status === "belum_bayar" ? "lunas" : "belum_bayar",
    };

    await updateTransaksi(transaksiItem.id, updatedTransaksi);
    fetchTransaksi();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const dataSearch = await findTransaksi(search);
    setTransaksi(dataSearch);
  };

  const handlePrint = (transaksiItem) => {
    setselectedItem(transaksiItem);
    setshowNota(true);
  };

  const handlePrintButtonClick = () => {
    const input = document.getElementById("print-area");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("receipt-cafe.pdf");
    });
  };

  return (
    <NavbarLayout>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Daftar Transaksi
        </h1>
        <div className="flex justify-between items-center mb-3">
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
                  Kasir
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
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Struk
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transaksi?.map((transaksiItem, index) => (
                <tr key={`${transaksiItem.id}`}>
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
                        <li key={`detail_transaksi${detailItem.id}`}>
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
                    <div className="flex justify-center items-center">
                      {transaksiItem.status === "belum_bayar" ? (
                        <CustomButton
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                          onClick={() => handleToggleStatus(transaksiItem)}
                        >
                          Belum Bayar
                        </CustomButton>
                      ) : (
                        <button
                          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
                          disabled
                        >
                          Lunas
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap justify-center">
                    <CustomButton
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                      onClick={() => handlePrint(transaksiItem)}
                    >
                      Print
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Start Struk */}
        <div
          className="w-full"
          ref={targetRef}
          style={{ display: showNota ? "block" : "none" }}
        >
          <Typography variant="h1" color="blue" textGradient>
            <p className="text-blue-500 text-center">
              STRUK TRANSAKSI PAN CAFE <br />
              <span className="text-blue-300">Jalan Danau</span>
            </p>
          </Typography>
          Date: {selectedItem?.tgl_transaksi}
          <br></br>
          Nama Pelanggan: {selectedItem?.nama_pelanggan}
          <br></br>
          No. meja: {selectedItem?.meja.nomor_meja}
          <br></br>
          Menu:<br></br>
          ______________________________________________________________________________________________________________________________________________
          <table className="table-auto" width={`100%`}>
            <tr>
              <th align="left">nama menu</th>
              <th>jumlah</th>
              <th align="right">harga satuan</th>
              <th align="right">total</th>
            </tr>
            {selectedItem?.detail_transaksi?.map((detail, index) => (
              <tr key={`${index}`}>
                <td align="left">{detail.menu.nama_menu}</td>
                <td align="center">{detail.qty}</td>
                <td align="right">
                  Rp {Number(detail.harga) / Number(detail.qty)}
                </td>
                <td align="right"> @ {detail.harga}</td>
              </tr>
            ))}
          </table>
          ______________________________________________________________________________________________________________________________________________
          Total
          <br />
          Rp{" "}
          {selectedItem?.detail_transaksi.reduce(
            (total, detailItem) =>
              total + detailItem.menu.harga * detailItem.qty,
            0
          )}
          <br />
          ______________________________________________________________________________________________________________________________________________
        </div>
        {/* End Of Struk */}
      </div>
    </NavbarLayout>
  );
};
export default Transaksi;
