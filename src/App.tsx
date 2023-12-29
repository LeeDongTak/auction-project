import Router from "./share/Router";
import GlobalStyle from "./styled/GlobalStyle";
import BidCustomModal from "./components/ui/bidCustomModal/BidCustomModal";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <BidCustomModal />
    </>
  );
}

export default App;
