import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { styled } from "styled-components";
import { fetchGetAuctions, fetchGetCategories } from "../../api/auction";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import useDebounce from "../../hooks/useDebounce";
import { QUERY_KEYS } from "../../query/keys.constant";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { toggleViewSearchModal } from "../../redux/modules/searchSlice";
import { Auction_post } from "../../types/databaseRetrunTypes";
import PostItem from "../profile/PostList/PostItem/PostItem";
import { StModalBox, StModalContainer } from "./Search.styles";

// TODO: 스타일 수정

const Search = () => {
  const dispatch = useAppDispatch();
  const { viewSearchModal } = useAppSelector((state) => state.search);

  const [inputText, setInputText] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const debounceSearchInput = useDebounce({ value: inputText, delay: 500 });

  const queryOptions = {
    queryKey: [QUERY_KEYS.POSTS, { searchKeyword: debounceSearchInput }],
    queryFn: () => fetchGetAuctions({ searchKeyword: debounceSearchInput }),
    queryOptions: { staleTime: 0, enabled: !!debounceSearchInput },
  };

  const [data, isLoading] = useCustomQuery<Auction_post[]>(queryOptions);

  const { data: categories } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: fetchGetCategories,
  });

  useEffect(() => {
    if (viewSearchModal) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [viewSearchModal]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

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
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all" selected>
                  전체
                </option>
                {categories?.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>

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
            </div>

            <StSearchPostList>
              {inputText && (
                <>
                  {(data?.length as number) > 0 ? (
                    <>
                      {data?.map((post) => (
                        <PostItem post={post} key={post?.auction_id} />
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
    font-size: xx-large;
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
