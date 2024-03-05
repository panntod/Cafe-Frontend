const myToken = localStorage.getItem("token");
export const baseURL = "http://localhost:8000";
export const imageURL = baseURL + "/gambar/";

export const config = {
  headers: { Authorization: `Bearer ${myToken}` },
};

export const initialNewMenuState = {
  id: "",
  nama_menu: "",
  jenis: "",
  deskripsi: "",
  gambar: null,
  harga: "",
};

export const initialNewUserState = {
  nama_user: "",
  role: "",
  username: "",
  password: "",
};

export const initialNewMejaState = {
  id: "",
  nomor_meja: "",
  status: "",
};
