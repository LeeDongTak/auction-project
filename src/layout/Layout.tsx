import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
function Layout() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      {showButton && (
        <FloatButton
          shape="circle"
          type="primary"
          onClick={scrollToTop}
          style={{ right: 24 }}
          icon={<VerticalAlignTopOutlined />}
        />
      )}
    </>
  );
}

export default Layout;
