import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { initialNewMejaState } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import {
  NavbarLayout,
  CustomButton,
  SearchInput,
} from "../../components/index";
import {
  addMeja,
  deleteMeja,
  fetchAllMejas,
  findMejas,
  updateMeja,
} from "../../utils/Meja";

export default function Meja() {
  let [mejas, setMejas] = useState([]);
  let [ModalIsOpen, setModalIsOpen] = useState(false);
  let [newMeja, setnewMeja] = useState(initialNewMejaState);
  let [search, setSearch] = useState("");
  let [action, setAction] = useState("");

  useEffect(() => {
    fetchMeja().then((res) => console.log(res));
  }, []);

  const fetchMeja = async () => {
    try {
      const mejaData = await fetchAllMejas();
      setMejas(mejaData);
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await findMejas(search);
      setMejas(response);
    } catch (error) {
      alert(error);
    }
  };

  const handleAdd = () => {
    setAction("add");
    setnewMeja(initialNewMejaState);
    setModalIsOpen(true);
  };

  const handleEdit = (item) => {
    setAction("edit");
    setModalIsOpen(true);
    setnewMeja({
      id: item.id,
      nomor_meja: item.nomor_meja,
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this data?")) {
      const response = await deleteMeja(id);
      toast(response.message, {
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchMeja();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Loading...");

    const data = {
      nomor_meja: newMeja.nomor_meja,
      status: newMeja.status,
    };

    if (action === "add") {
      const response = await addMeja(data);
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
      const response = await updateMeja(newMeja.id, data);
      console.log(response);
      if (response.success === false) {
        toast.update(toastID, {
          type: "error",
          isLoading: false,
          autoClose: 3000,
          render: "Terjadi Kesalahan",
        });
      } else {
        toast.update(toastID, {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          render: response.message,
        });
      }
    }

    setnewMeja(initialNewMejaState);
    setModalIsOpen(false);
    fetchMeja();
  };

  return (
    <NavbarLayout>
      <ToastContainer />
      <div className="mx-32 sm:p-4">
        <div className="w-full">
          <Typography variant="h1" color="blue" textGradient>
            <div className="container mx-auto">
              <p className="text-blue-500 my-4 text-center">Daftar Meja</p>
            </div>
          </Typography>

          <div className="flex justify-content-between align-items-center">
            <form
              className="w-full flex justify-end text-gray-100"
              onSubmit={(e) => handleSearch(e)}
            >
              <SearchInput search={search} setSearch={setSearch} />
            </form>
          </div>

          <table className="w-full border-collapse rounded-md shadow-lg overflow-hidden my-5">
            <thead className="bg-blue-600 w-full text-lg text-white">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nomor Meja</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 divide-y divide-gray-700 text-base">
              {mejas?.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-300">
                  <td align="center" className="py-3 px-4">
                    {index + 1}
                  </td>
                  <td align="center" className="py-3 px-4">
                    {item.nomor_meja}
                  </td>
                  <td align="center" className="py-3 px-4">
                    {item.status}
                  </td>
                  <td align="center" className="py-3 px-4">
                    <div className="flex justify-center items-center gap-2">
                      <CustomButton
                        color="blue"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </CustomButton>
                      <CustomButton
                        color="red"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CustomButton color="green" onClick={() => handleAdd()}>
            Tambah
          </CustomButton>
        </div>

        {/* Start Form Modal */}
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
          className="flex flex-col justify-center items-center h-screen"
        >
          <div className="modal-content sm:w-full md:w-[20rem] bg-white rounded-lg shadow-xl px-8 sm:px-16 py-8 sm:py-16 relative">
            <h2 className="text-2xl font-semibold leading-tight tracking-wide">
              {action === "add" ? "Tambah Meja" : "Edit Meja"}
            </h2>
            <div>
              <button onClick={() => setModalIsOpen(false)}>
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
            <form onSubmit={(e) => handleSave(e)} className="flex flex-col">
              <div className="mb-3">
                <label className="text-sm text-gray-800">Nomor Meja</label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) =>
                    setnewMeja({
                      ...newMeja,
                      nomor_meja: e.target.value,
                    })
                  }
                  value={newMeja.nomor_meja}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="text-sm text-gray-800">Status</label>
                <select
                  className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-400 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={newMeja.status}
                  onChange={(e) =>
                    setnewMeja({
                      ...newMeja,
                      status: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Status">
                    {newMeja.status !== "" ? newMeja.status : "~Choose~"}
                  </option>
                  <option value="kosong">Kosong</option>
                  <option value="terisi">Terisi</option>
                </select>
              </div>

              <CustomButton
                color="blue"
                type="submit"
                className="cursor-pointer"
              >
                Save
              </CustomButton>
            </form>
            {/* End Form Modal */}
          </div>
        </Modal>
      </div>
    </NavbarLayout>
  );
}
