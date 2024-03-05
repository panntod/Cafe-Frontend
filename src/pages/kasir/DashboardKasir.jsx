import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { NavbarLayout } from "../../components/index";

function DashboardKasir() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      navigate("/");
    } else {
      let role = localStorage.getItem("role");
      let namaUser = localStorage.getItem("nama_user");
      setUser(`Selamat datang sebagai ${role} dengan nama ${namaUser}`);
    }
  }, [navigate]);

  return (
    <NavbarLayout>
      <div className="container mx-auto my-8">
        <Typography variant="h1" color="blue" textGradient>
          <p className="text-3xl font-bold text-center mb-4 text-blue-600">
            Selamat datang di PAN CAFE
          </p>
        </Typography>

        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <Typography variant="h2" color="blue" textGradient>
            <p className="text-xl font-bold text-center text-blue-700">
              {user}
            </p>
          </Typography>
        </div>
      </div>
    </NavbarLayout>
  );
}

export default DashboardKasir;
