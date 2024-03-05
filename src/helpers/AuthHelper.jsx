const SetAuth = (data) => {
  const namaString = JSON.stringify(data.nama_user);
  const roleString = JSON.stringify(data.role);
  const idString = JSON.stringify(data.id_user);
  const tokenString = data.token;

  localStorage.setItem("logged", "true");
  localStorage.setItem("nama_user",namaString );
  localStorage.setItem("id_user", idString);
  localStorage.setItem("role", roleString);
  localStorage.setItem("token", tokenString);
};

const GetRole = () => {
  const userString = localStorage.getItem("role");

  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }

  return null;
};

const ClearAuth = () => {
  localStorage.removeItem("logged");
  localStorage.removeItem("nama_user");
  localStorage.removeItem("role");
  localStorage.removeItem("id_user");
  localStorage.removeItem("token");
  localStorage.clear();
}

export default { SetAuth, GetRole, ClearAuth };
