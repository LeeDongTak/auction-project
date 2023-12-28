import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route element={<AuthLayout />}>
          <Route path="detail/:auctionId" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addAuction" element={<AddAuction />} />
        </Route>
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
