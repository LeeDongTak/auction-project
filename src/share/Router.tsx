import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:auctionId" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
