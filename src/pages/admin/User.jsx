import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import {
  CustomButton,
  NavbarLayout,
  SearchInput,
} from "../../components/index";
import { initialNewUserState } from "../../config";
import {
  fetchAllUsers,
  findUser,
  deleteUsers,
  addUsers,
  updateUsers,
} from "../../utils/User";

export default function User() {
  let [users, setUsers] = useState([]);
  let [ModalIsOpen, setModalIsOpen] = useState(false);
  let [newUser, setNewUser] = useState(initialNewUserState);
  let [search, setSearch] = useState("");
  let [idUser, setIdUser] = useState("");
  let [action, setAction] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const usersData = await fetchAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const usersData = await findUser(search);
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (action === "add") {
      await addUsers(newUser);
    } else {
      await updateUsers(idUser, newUser);
    }

    setModalIsOpen(false);
    fetchUser();
    setNewUser(initialNewUserState);
  };

  const handleEdit = (item) => {
    setAction("edit");
    setModalIsOpen(true);
    setNewUser({
      nama_user: item.nama_user,
      role: item.role,
      username: item.username,
    });
  };

  const handleCloseModal = () => {
    setAction("");
    setIdUser("");
    setModalIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this data?")) {
      try {
        const response = await deleteUsers(id);
        alert(response);
      } catch (error) {
        console.error(error);
        alert("Error deleting user");
      }
      fetchUser();
    }
  };

  return (
    <NavbarLayout>
      <div className="mx-32 sm:p-4">
        <div className="w-full">
          <Typography variant="h1" color="blue" textGradient>
            <div className="container mx-auto">
              <p className="text-blue-500 my-4 text-center">Daftar User</p>
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

          <table className="w-full my-5 border-collapse rounded-md overflow-hidden shadow-lg">
            <thead className="bg-blue-600 w-full text-lg text-white">
              <tr>
                <th className="p-3">No</th>
                <th className="py-3">Nama</th>
                <th className="py-3">role</th>
                <th className="py-3">Username</th>
                <th className="py-3 pl-14">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 divide-y divide-gray-700 text-base">
              {users?.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-300">
                  <th className="p-3">{index + 1}</th>
                  <td align="center">{item.nama_user}</td>
                  <td align="center">{item.role}</td>
                  <td align="center">{item.username}</td>
                  <td align="center" className="h-full justify-center">
                    <div className="flex justify-center gap-2">
                      <CustomButton
                        color="blue"
                        onClick={() => {
                          handleEdit(item);
                          setIdUser(item.id);
                        }}
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

          <CustomButton
            color="green"
            onClick={() => {
              setModalIsOpen(true);
              setAction("add");
              setNewUser(initialNewUserState);
            }}
          >
            Tambah
          </CustomButton>
        </div>

        <Modal
          isOpen={ModalIsOpen}
          ariaHideApp={false}
          className="flex flex-col justify-center items-center h-screen"
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="modal-content sm:w-full md:w-[30rem] bg-white rounded-lg shadow-xl px-8 sm:px-16 py-8 sm:py-16 relative">
            <h2 className="text-3xl font-bold leading-tight tracking-wide">
              {action === "add" ? "Tambah User" : "Edit User"}
            </h2>
            <button
              onClick={() => handleCloseModal()}
              className="absolute top-8 right-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
              </svg>
            </button>

            <form onSubmit={(e) => handleSave(e)} className="flex flex-col">
              <div className="mb-3">
                <label className="text-base font-semibold text-gray-800">
                  Nama
                </label>
                <input
                  type="text"
                  placeholder="Nama"
                  value={newUser.nama_user}
                  onChange={(e) =>
                    setNewUser({ ...newUser, nama_user: e.target.value })
                  }
                  className="w-[22rem] px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="text-base font-semibold text-gray-800">
                  Role
                </label>
                <select
                  className="w-[22rem] px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  required
                >
                  <option value="role">
                    {newUser.role !== "" ? newUser.role : "~Choose~"}
                  </option>
                  <option value="manajer">Manajer</option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="text-base font-semibold text-gray-800">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="w-[22rem] px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="text-base font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-[22rem] px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <CustomButton color="blue" type="submit">
                Save
              </CustomButton>
            </form>
          </div>
        </Modal>
      </div>
    </NavbarLayout>
  );
}
