import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import AddAuction from "../pages/AddAuction";
import Auth from "../pages/Auth";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AuthLayout from "./AuthLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="detail/:auctionId" element={<Detail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addAuction" element={<AddAuction />} />
          </Route>
          <Route path="*" element={<Navigate replace to={"/"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
