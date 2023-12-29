import Router from "./share/Router";
import GlobalStyle from "./styled/GlobalStyle";
import BidCustomModal from "./components/ui/bidCustomModal/BidCustomModal";
import { selectorBidCustomModal } from "./redux/modules/bidCustomModalSlice";
import { useSelector } from "react-redux";

function App() {
  const { isOpen } = useSelector(selectorBidCustomModal);

  return (
    <>
      <GlobalStyle />
      <Router />
      {isOpen && <BidCustomModal />}
    </>
  );
}

export default App;
