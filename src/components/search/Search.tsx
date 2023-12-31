import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../api/auction";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import useDebounce from "../../hooks/useDebounce";
import { QUERY_KEYS } from "../../query/keys.constant";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { toggleViewSearchModal } from "../../redux/modules/searchSlice";
import { Auction_post } from "../../types/databaseRetrunTypes";
import PostItem from "../profile/PostList/PostItem/PostItem";
import { StModalBox, StModalContainer } from "./Search.styles";

// TODO: 모달 수정
// TODO: 스타일 수정

const Search = () => {
  const dispatch = useAppDispatch();
  const { viewSearchModal } = useAppSelector((state) => state.search);

  const [inputText, setInputText] = useState("");

  const debounceSearchInput = useDebounce({ value: inputText, delay: 500 });

  const queryOptions = {
    queryKey: [QUERY_KEYS.POSTS, { searchKeyword: debounceSearchInput }],
    queryFn: () => fetchGetAuctions({ searchKeyword: debounceSearchInput }),
    queryOptions: { staleTime: 0, enabled: !!debounceSearchInput },
  };

  const [data, isLoading] = useCustomQuery<Auction_post[]>(queryOptions);

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const closeHandler = () => {
    dispatch(toggleViewSearchModal(false));
    setInputText("");
  };

  return (
    <>
      {viewSearchModal && (
        <StModalContainer>
          <StModalBox>
            <StSearchForm onSubmit={searchHandler}>
              <input
                type="text"
                placeholder="search"
                autoFocus
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit">
                <MdOutlineSearch />
              </button>
            </StSearchForm>

            <StSearchPostList>
              {inputText && (
                <>
                  {(data?.length as number) > 0 ? (
                    <>
                      {data?.map((post) => (
                        <PostItem post={post} key={post?.auction_id} />
                        // <li key={post.auction_id}>
                        //   <h3>{post.title}</h3>
                        //   <p>{post.content}</p>
                        // </li>
                      ))}
                    </>
                  ) : (
                    <div>검색 결과가 존재하지 않습니다.</div>
                  )}
                </>
              )}
            </StSearchPostList>
            <button onClick={closeHandler}>닫기</button>
          </StModalBox>
        </StModalContainer>
      )}
    </>
  );
};

const StSearchForm = styled.form`
  display: flex;
  width: 600px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  padding: 1rem 0.5rem 1rem 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--main-color);
  border-radius: 3rem;

  > input {
    font-size: x-large;
    width: 100%;
    outline: none;
    border: none;
  }

  > button {
    display: flex;
    align-items: center;
    font-size: x-large;
    background-color: transparent;
    border: none;
  }
`;

const StSearchPostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #222;
`;

export default Search;
