import { imageURL } from "../config";

const TopMenuCard = ({ menu }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md w-[20rem]">
      <img
        src={menu.gambar ? imageURL + menu.gambar : null}
        alt={menu.nama}
        className="w-full h-[20rem] object-cover mb-4 rounded-md"
      />
      <div>
        <h3 className="text-lg font-semibold mb-2">{menu.nama}</h3>
        <p className="text-gray-600">Jenis: {menu.jenis}</p>
        <p className="text-gray-700 font-bold">Total Sales: {menu.total_penjualan}</p>
      </div>
    </div>
  );
};

export default TopMenuCard;
