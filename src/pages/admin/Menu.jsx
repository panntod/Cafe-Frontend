import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { imageURL, initialNewMenuState } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import {
  addMenu,
  deleteMenu,
  fetchAllMenu,
  findMenu,
  updateMenu,
} from "../../utils/Menu";
import {
  NavbarLayout,
  CustomCard,
  CustomButton,
  SearchInput,
} from "../../components/index";

export default function Menu() {
  let [menus, setMenus] = useState([]);
  let [ModalIsOpen, setModalIsOpen] = useState(false);
  let [newMenu, setNewMenu] = useState(initialNewMenuState);
  let [search, setSearch] = useState("");
  let [change, setChange] = useState(false);
  let [action, setAction] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const menuData = await fetchAllMenu();
      setMenus(menuData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await findMenu(search);
      setMenus(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setAction("add");
    setNewMenu(initialNewMenuState);
    setModalIsOpen(true);
  };

  const handleEdit = (item) => {
    setAction("edit");
    setModalIsOpen(true);
    setNewMenu({
      id: item.id,
      nama_menu: item.nama_menu,
      jenis: item.jenis,
      harga: item.harga,
      deskripsi: item.deskripsi,
      gambar: item.gambar,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this data?")) {
      const response = await deleteMenu(id);
      toast(response.message, {
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchMenu();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Loading...");

    let data = new FormData();
    data.append("nama_menu", newMenu?.nama_menu);
    data.append("jenis", newMenu?.jenis);
    data.append("harga", newMenu?.harga);
    data.append("deskripsi", newMenu?.deskripsi);
    data.append("gambar", newMenu?.gambar);

    if (action === "add") {
      const response = await addMenu(data);
      if (response.success == true) {
        toast.update(toastID, {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          render: response.message,
        });
      } else {
        toast.update(toastID, {
          type: "error",
          isLoading: false,
          autoClose: 3000,
          render: "Terjadi Kesalahan",
        });
      }
    } else if (action === "edit") {
      const response = await updateMenu(newMenu.id, data);
      if (response.success == true) {
        toast.update(toastID, {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          render: response.message,
        });
      } else {
        toast.update(toastID, {
          type: "error",
          isLoading: false,
          autoClose: 3000,
          render: "Terjadi Kesalahan",
        });
      }
    }

    fetchMenu();
    setModalIsOpen(false);
    setNewMenu(initialNewMenuState);
  };

  const handleClose = () => {
    setChange(false);
    setAction("");
    setModalIsOpen(false);
  };

  return (
    <NavbarLayout>
      <ToastContainer />
      <div className="mx-4 sm:p-4 lg:mx-32">
        <div className="w-full">
          <Typography variant="h1" color="blue" textGradient>
            <div className="container mx-auto">
              <p className="text-blue-500 my-4 text-center">Daftar Menu</p>
            </div>
          </Typography>

          <div className="flex justify-end items-center w-full sm:w-1/2 lg:w-full">
            <form
              className="w-full lg:w-1/2 flex justify-end text-gray-100"
              onSubmit={(e) => handleSearch(e)}
            >
              <SearchInput search={search} setSearch={setSearch} />
            </form>
          </div>

          <div className="flex flex-wrap -mx-2">
            {menus?.map((item) => (
              <CustomCard
                key={item.id}
                namaMenu={item.nama_menu}
                jenis={item.jenis}
                harga={item.harga}
                deskripsi={item.deskripsi}
                gambar={item.gambar ? imageURL + item.gambar : null}
                onEdit={() => handleEdit(item)}
                onDrop={() => handleDelete(item.id)}
              />
            ))}
          </div>

          <CustomButton color="green" onClick={() => handleAdd()}>
            Tambah
          </CustomButton>
        </div>

        {/* Modals */}

        <Modal
          isOpen={ModalIsOpen}
          ariaHideApp={false}
          className="flex justify-center items-center h-screen"
          onRequestClose={() => handleClose()}
        >
          <div className="modal-content sm:w-full md:w-[80rem] bg-white rounded-lg shadow-xl px-8 sm:px-16 py-8 sm:py-16 relative">
            <h2 className="text-3xl font-bold leading-tight tracking-wide">
              {action === "add" ? "Tambah Menu" : "Edit Menu"}
            </h2>
            <div>
              <button onClick={() => handleClose()}>
                <a className="absolute top-8 right-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6"
                  >
                    <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                  </svg>
                </a>
              </button>
            </div>

            <form onSubmit={(e) => handleSave(e)} className="flex items-center">
              <div>
                <label className="text-lg font-semibold text-gray-800">
                  Gambar
                </label>
                <img
                  src={
                    newMenu.gambar
                      ? change
                        ? typeof newMenu.gambar === "string"
                          ? imageURL + newMenu.gambar
                          : URL.createObjectURL(newMenu.gambar)
                        : imageURL + newMenu.gambar
                      : null
                  }
                  alt={newMenu.gambar}
                  className="max-w-xs rounded-md"
                />
                <input
                  type="file"
                  className="form-control mt-2"
                  onChange={(e) => {
                    setNewMenu({ ...newMenu, gambar: e.target.files[0] });
                    setChange(true);
                  }}
                  required
                />
              </div>

              <div className="flex-col w-full">
                <div className="mb-3">
                  <label className="text-base font-semibold text-gray-800">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, nama_menu: e.target.value })
                    }
                    value={newMenu.nama_menu}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="text-base font-semibold text-gray-800">
                    Jenis
                  </label>
                  <select
                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={newMenu.jenis}
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, jenis: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled hidden>
                      ~Choose~
                    </option>
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="text-base font-semibold text-gray-800">
                    Harga
                  </label>
                  <input
                    type="number"
                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, harga: e.target.value })
                    }
                    value={newMenu.harga}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="text-base font-semibold text-gray-800">
                    Deskripsi
                  </label>
                  <textarea
                    className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 h-24"
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, deskripsi: e.target.value })
                    }
                    value={newMenu.deskripsi}
                    required
                  />
                </div>

                <CustomButton color="blue" type="submit">
                  Save
                </CustomButton>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </NavbarLayout>
  );
}
