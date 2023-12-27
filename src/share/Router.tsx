import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddAuction from "../pages/AddAuction";
import Auth from "../pages/Auth";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { supabase } from "../supabase";

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      user ? setIsLogin(true) : setIsLogin(false);
    };
    fetchUser();
  }, []);

  console.log(isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:auctionId" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addAuction" element={<AddAuction />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Auth />} />
            <Route path="/*" element={<Navigate to={"/login"} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
