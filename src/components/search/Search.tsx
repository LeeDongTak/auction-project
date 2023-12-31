import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { toggleViewSearchModal } from "../../redux/modules/searchSlice";
import { StModalBox, StModalContainer } from "./Search.styles";

const Search = () => {
  const dispatch = useAppDispatch();
  const { viewSearchModal } = useAppSelector((state) => state.search);

  const [inputText, setInputText] = useState("");

  return (
    <StModalContainer>
      {viewSearchModal && (
        <StModalBox>
          <form>
            <input
              type="text"
              placeholder="search"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">검색</button>
          </form>
          {/* 서치 리스트 */}
          <section>
            <ul></ul>
          </section>
          <button onClick={() => dispatch(toggleViewSearchModal(false))}>
            닫기
          </button>
        </StModalBox>
      )}
    </StModalContainer>
  );
};

export default Search;
