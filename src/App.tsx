import Router from "./share/Router";
import GlobalStyle from "./styled/GlobalStyle";
import BidCustomModal from "./components/ui/bidCustomModal/BidCustomModal";
import { selectorBidCustomModal } from "./redux/modules/bidCustomModalSlice";
import { useSelector } from "react-redux";
import { selectorCustomModal } from "./redux/modules/customModalSlice";
import CustomModal from "./components/ui/customModal/CustomModal";

function App() {
  const { isOpen } = useSelector(selectorBidCustomModal);
  const { isOpen: isOpenCustomModal } = useSelector(selectorCustomModal);

  return (
    <>
      <GlobalStyle />
      <Router />
      {isOpen && <BidCustomModal />}
      {isOpenCustomModal && <CustomModal />}
    </>
  );
}

export default App;
