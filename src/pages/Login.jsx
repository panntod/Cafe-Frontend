import axios from "axios";
import { useState } from "react";
import { baseURL } from "../config";
import loginImg from "../assets/login.jpg";
import AuthHelper from "../helpers/AuthHelper";
import { useNavigate } from "react-router-dom";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { CustomAlert, CustomButton } from "../components/index";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);

      let response = await axios.post(baseURL + "/auth/authentication", {
        username,
        password,
      });

      if (response.data.success === true) {
        const responseData = {
          id_user: response.data?.data?.id,
          nama_user: response.data?.data?.nama_user,
          role: response.data?.data?.role,
          token: response.data?.token,
        };

        AuthHelper.SetAuth(responseData);
      }
      navigate(`/${response.data?.data?.role}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error(error);
        setErrorMessage("Terjadi kesalahan pada server. Silakan coba lagi.");
      }
      AuthHelper.ClearAuth();
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="login"
        />
      </div>

      <div className="bg-gray-800 flex flex-col items-center justify-center">
        <div className="relative py-24">
          {errorMessage && (
            <div className="absolute top-0 left-0 right-0">
              <CustomAlert message={errorMessage} />
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="max-w-[40rem] w-full mx-auto rounded-lg bg-gray-900 py-14 px-16"
          >
            <h2 className="text-4xl dark:text-white font-bold text-center uppercase">
              Login Pan Cafe
            </h2>
            <br />
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="username">Username</label>
              <div className="relative">
                <FaUser className="absolute -left-6 top-5 text-gray-500" />
                <input
                  className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col text-gray-400 py-2 relative">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <FaKey className="absolute -left-6 top-5 text-gray-500" />
                <input
                  className="p-2 rounded-lg w-full bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    onClick={handleTogglePassword}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    onClick={handleTogglePassword}
                  />
                )}
              </div>
            </div>

            <CustomButton
              className={`w-full py-3 mt-3 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 text-white font-semibold rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              SIGN IN
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
