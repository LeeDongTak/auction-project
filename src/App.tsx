import Router from "./share/Router";
import GlobalStyle from "./styled/GlobalStyle";
import BidCustomModal from "./components/ui/customModal/BidCustomModal";

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
