import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import { DashboardAdmin, Meja, Menu, User } from "../pages/admin/index";
import {
  DashboardKasir,
  TambahTransaksi,
  Transaksi,
} from "../pages/kasir/index";
import {
  DashboardManajer,
  Laporan,
  TransaksiManager,
} from "../pages/manajer/index";
import ProtectRoute from "./ProtectRoute";
import NotFoundPage from "../pages/NotFound";
import { Forbidden } from "../pages/Forbidden";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forbidden" element={<Forbidden />} />

        <Route
          path="/admin/*"
          element={
            <ProtectRoute>
              <DashboardAdmin />
            </ProtectRoute>
          }
        />
        <Route
          path="/Menu"
          element={
            <ProtectRoute>
              <Menu />
            </ProtectRoute>
          }
        />
        <Route
          path="/User"
          element={
            <ProtectRoute>
              <User />
            </ProtectRoute>
          }
        />
        <Route
          path="/Meja"
          element={
            <ProtectRoute>
              <Meja />
            </ProtectRoute>
          }
        />

        <Route
          path="/kasir/*"
          element={
            <ProtectRoute>
              <DashboardKasir />
            </ProtectRoute>
          }
        />
        <Route
          path="/Transaksi"
          element={
            <ProtectRoute>
              <Transaksi />
            </ProtectRoute>
          }
        />
        <Route
          path="/TambahTransaksi"
          element={
            <ProtectRoute>
              <TambahTransaksi />
            </ProtectRoute>
          }
        />

        <Route
          path="/manajer/*"
          element={
            <ProtectRoute>
              <DashboardManajer />
            </ProtectRoute>
          }
        />
        <Route
          path="/TransaksiManajer"
          element={
            <ProtectRoute>
              <TransaksiManager />
            </ProtectRoute>
          }
        />
        <Route
          path="/Laporan"
          element={
            <ProtectRoute>
              <Laporan />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default Router;
