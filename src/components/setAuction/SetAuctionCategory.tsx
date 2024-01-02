import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import { fetchGetCategories } from "../../api/auction";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { setAuctionCategoryList, setAuctionExistingCategory } from "../../redux/modules/setAuctionSlice";
import { Category } from "../../types/databaseRetrunTypes";

function SetAuctionCategory({ UpdIsLoading }: { UpdIsLoading?: boolean }) {
  const { auctionId } = useParams();
  const dispatch = useAppDispatch();
  const { categoryList, existingCategory } = useAppSelector((state) => state.setAuction);
  // const [existingCategory, setExistingCategory] = useState<string>("");
  const queryOptions = {
    queryKey: ["category"],
    queryFn: fetchGetCategories,
    queryOptions: { staleTime: Infinity },
  };
  const [data, isLoading] = useCustomQuery(queryOptions);
  const scrollEventRef = useRef<HTMLInputElement>(null);
  const checkBoxRef = useRef<HTMLInputElement[]>([]);

  const onScrollHandler = () => {
    scrollEventRef?.current?.style.setProperty("opacity", "0");
    setTimeout(() => {
      scrollEventRef?.current?.style.setProperty("display", "none");
    }, 200);
  };

  const categoryOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionCategoryList(e.target.value));
  };

  // const categoryOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setAuctionCategoryList({ id: e.target.value, checked: e.target.checked }));
  //   const isChecked = checkBoxRef.current.filter((x) => x.checked === true)
  //   if (isChecked.length > 5) e.target.checked = false
  // }

  // useEffect(() => {
  //   if (categoryList.length > 4) {
  //     dispatch(setIsAlert({ isAlert: true, ErrorMsg: "카테고리는 5개까지 선택 가능합니다" }))
  //   }
  // }, [categoryList])

  useEffect(() => {
    if (data) {
      const categoryName: Category[] = data?.filter((x) => categoryList?.includes(x.category_id))
      dispatch(setAuctionExistingCategory(categoryName?.[0]));
      dispatch(setAuctionCategoryList(""));
    }
  }, [isLoading, UpdIsLoading])

  return (
    <StCategoryWrapper>
      <StAuctionCategoryTitle>카테고리</StAuctionCategoryTitle>
      <StCategoryContentBox>
        <StCategoryListUl
          onScroll={() => {
            onScrollHandler();
          }}
        >
          <StScrollEvent ref={scrollEventRef}>
            <StChevronContainer>
              <StChevron></StChevron>
              <StChevron></StChevron>
              <StChevron></StChevron>
            </StChevronContainer>
            <StScrollText>스크롤을 아래로 내려주세요</StScrollText>
          </StScrollEvent>
          {data?.map((item, index) => {
            return (
              <StCategoryListLi key={item.category_id}>
                {/* <StCategoryCheckBox ref={(e: HTMLInputElement) => { checkBoxRef.current[index] = e }} name="category" value={item.category_id} type="checkbox" onChange={(e) => { categoryOnchangeHandler(e) }} /> */}
                <StCategoryCheckBox
                  ref={(e: HTMLInputElement) => {
                    checkBoxRef.current[index] = e;
                  }}
                  name="category"
                  value={item.category_id}
                  type="radio"
                  onChange={(e) => {
                    categoryOnchangeHandler(e);
                  }}
                />
                <StCategoryLabel htmlFor="">
                  {item.category_name}
                </StCategoryLabel>
              </StCategoryListLi>
            );
          })}
        </StCategoryListUl>
        <StCategoryListUl $ulType="resultCategory">
          {
            !auctionId
              ? <>
                <StChoiceCategory $listType="choiceCategoryTitle">
                  선택한 카테고리
                </StChoiceCategory>
                {data?.filter((x) => categoryList.includes(x.category_id))
                  .map((item) => {
                    return (
                      <StChoiceCategory key={item.category_id}>
                        {item.category_name}
                      </StChoiceCategory>
                    );
                  })}
              </>
              : <>
                <StChoiceCategory $typeIsSet="update" $listType="choiceCategoryTitle">
                  선택한 카테고리
                </StChoiceCategory>
                <StChoiceCategory $typeIsSet="update">
                  {existingCategory?.category_name}
                </StChoiceCategory>
                <StChoiceCategory $typeIsSet="update" $listType="choiceCategoryTitle">
                  수정한 카테고리
                </StChoiceCategory>
                {data?.filter((x) => categoryList.includes(x.category_id))
                  .map((item) => {
                    return (
                      <StChoiceCategory $typeIsSet="update" key={item.category_id}>
                        {item.category_name}
                      </StChoiceCategory>
                    );
                  })}
              </>
          }
        </StCategoryListUl>
      </StCategoryContentBox>
    </StCategoryWrapper>
  );
}

export default SetAuctionCategory;

const StCategoryWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
`;

const StAuctionCategoryTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`;
const StCategoryContentBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const StCategoryListUl = styled.ul<{ $ulType?: string }>`
  width: ${({ $ulType }) => ($ulType === "resultCategory" ? "50%" : "40%")};
  height: ${({ $ulType }) => ($ulType === "resultCategory" ? "auto" : "15em")};;
  border-radius: 0.5em;
  font-size: 2.2em;
  box-shadow: ${({ $ulType }) =>
    $ulType === "resultCategory" ? "none" : "0 0 0.2em 0.1em #AFCAFF"};
  transition: 0.2s;
  overflow-y: ${({ $ulType }) =>
    $ulType === "resultCategory" ? "none" : "scroll"};
  position: relative;
  ${({ $ulType }) =>
    $ulType === "resultCategory" &&
    `padding: 2%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  `}
  &::-webkit-scrollbar {
    display: none;
  }
  &::after {
    clear: both;
    display: block;
    content: "";
  }
`;

// 스크롤 이벤트 영역
const StScrollEvent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.2s;
  opacity: 1;
  background-color: rgba(2, 62, 125, 0.7);
`;
const StChevronContainer = styled.div`
  position: relative;
  width: 5em;
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const move = keyframes`
  25% {
    opacity: 1;
  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px);
    /* scale3d(0.5, 0.5, 0.5); */
  }
`;

const StChevron = styled.div`
  position: absolute;
  width: 4em;
  height: 0.8em;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: ${move} 2s ease-out infinite;
  &:first-child {
    top: 22%;
    /* animation: ${move} 3s ease-out 1s infinite; */
  }
  &:nth-child(2) {
    top: 0%;
    /* animation: ${move} 3s ease-out 2s infinite; */
  }
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: #FFFACD;
    left: 0;
    transform: skew(0deg, 30deg);
  }
  &::after {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: #FFFACD;
    right: 0;
    width: 50%;
    transform: skew(0deg, -30deg);
  }
`;
const StScrollText = styled.div`
  color: #fff;
  margin-top: 10%;
  text-shadow: 0 0 0.1em #FFFACD;
`;

// left list 영역
const StCategoryListLi = styled.li`
  width: 100%;
  height: 3em;
  border-bottom: 2px solid #afcaff;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCategoryCheckBox = styled.input`
  flex: 1;
  width: 2em;
  height: 2em;
`;

const StCategoryLabel = styled.label`
  flex: 2;
  text-align: center;
`;

// right list 영역
// const StChoiceCategory = styled.span`
//   background-color: #023E7D;
//   width: auto;
//   height: auto;
//   color: #FFFACD;
//   border: 1px solid #023E7D;
//   padding: 0.5em  1.5em;
//   font-size: 0.8em;
//   font-weight: bold;
//   margin: 3%;
//   float: left;
//   border-radius: 0.5em;
// `

const StChoiceCategory = styled.span<{ $typeIsSet?: string, $listType?: string }>`
  background-color: #023E7D;
  width: auto;
  height: auto;
  color: #FFFACD;
  border: 1px solid #023E7D;
  font-size: 1.2em;
  /* font-weight: bold;
  margin: 3% auto; */
  margin-bottom: ${({ $listType }) => $listType === "choiceCategoryTitle" ? '5%' : '13%'};
  border-radius: 0.5em;
  padding: 2% 8%;
  ${({ $listType }) =>
    $listType === "choiceCategoryTitle" &&
    `
      padding-top: 0;
      border: none;
      background-color: #FFFACD;
      color: #023E7D;
    `}
  ${({ $typeIsSet }) =>
    $typeIsSet === "update" &&
    `
      font-size: 1em;
      // margin: 0 auto;
    `}
  
`;
