## Overview

> **엘리트 옥션**
> 자신의 중고 물품을 경매형식으로 판매하는 사이트

📆 프로젝트 기간: 2023. 12. 26 ~ 2024. 01. 03

## 팀 소개
이동탁 : https://tak-web-front.tistory.com/ <br/>
김은비 : https://velog.io/@eunbi/posts <br/>
이다원 : https://velog.io/@dawnrose <br/>
권경열 : https://velog.io/@yeol10 <br/>

## 프로젝트 소개 <br/>
```
판매자는 경매하고 싶은 물건을 등록하고 등록 시 내용, 경매 기간, 입찰 하한가를 설정할 수 있습니다.
구매자는 경매 게시클에 입찰가를 입력할 수 있으며 이는 하한가보다 높을 떄 입력할 수 있습니다. 경매 기간 시작 전과 끝난 후에는 입찰을 할 수 없으며 남은 시간으로 표시됩니다.
사용자는 상품에 대해 등록, 찜하기, 질문 등을 할 수 있고 이는 회원가입 및 로그인 후 회원 정보가 정상적으로 등록 시 접근할 수 있습니다.
등록한 게시물 및 찜한 게시물은 프로필 페이지에서 확인할 수 있으며, 이 곳에서 등록한 게시물 삭제 및 수정 그리고 찜한 개시물을 목록에서 삭제할 수 있습니다. 프로필 수정 탭에서 회원 정보를 변경할 수 있습니다.

```

## Stack <br/>

### Enviroment

<img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white"/></a>
<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/></a>

### Config

<img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=white"/></a>
<img src="https://img.shields.io/badge/YARN-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"/></a>


### Development
<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"/></a> 
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/></a>

### Database

<img src="https://img.shields.io/badge/FIREBASE-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black"/></a>  

### Communication

<img src="https://img.shields.io/badge/SLACK-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/></a>
<img src="https://img.shields.io/badge/FIGMA-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/></a>




## 화면 구성

- 로그인 / 회원가입 페이지

- 메인 페이지

- 상세 페이지

- 작성 페이지


## 주요 기능


## 아키텍처


## 와이어프레임


## ERD <br/>

[
](https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F7375634c-2a28-470b-853a-075187172f76%2FScreen_Shot_2023-12-27_at_10.54.06_AM.png?table=block&id=10c593ca-8a16-4f0b-9b6f-ad24222b5612&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=1310&userId=&cache=v2)https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F7375634c-2a28-470b-853a-075187172f76%2FScreen_Shot_2023-12-27_at_10.54.06_AM.png?table=block&id=10c593ca-8a16-4f0b-9b6f-ad24222b5612&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=1310&userId=&cache=v2


## 파일 구조
```
📦src
 ┣ 📂api
 ┃ ┣ 📜auction.ts
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜bid.ts
 ┃ ┣ 📜connectSupabase.ts
 ┃ ┣ 📜likes.ts
 ┃ ┣ 📜qna.ts
 ┃ ┗ 📜setAuction.ts
 ┣ 📂common
 ┃ ┣ 📜dayjs.ts
 ┃ ┣ 📜formatUtil.ts
 ┃ ┗ 📜util.ts
 ┣ 📂components
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜AuctionList.tsx
 ┃ ┃ ┣ 📜CategorySelector.tsx
 ┃ ┃ ┗ 📜LikeButton.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Avatar.tsx
 ┃ ┃ ┗ 📜Button.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂bidPopup
 ┃ ┃ ┃ ┣ 📜BidCard.tsx
 ┃ ┃ ┃ ┣ 📜BidList.tsx
 ┃ ┃ ┃ ┣ 📜BidPopUpLayout.tsx
 ┃ ┃ ┃ ┣ 📜PopupToggleButton.tsx
 ┃ ┃ ┃ ┗ 📜Title.tsx
 ┃ ┃ ┣ 📂qna
 ┃ ┃ ┃ ┣ 📜QnaButtonGroup.tsx
 ┃ ┃ ┃ ┣ 📜QnaTextArea.tsx
 ┃ ┃ ┃ ┣ 📜QnaWrapper.tsx
 ┃ ┃ ┃ ┣ 📜Question.tsx
 ┃ ┃ ┃ ┣ 📜QuestionAnswerCard.tsx
 ┃ ┃ ┃ ┣ 📜QuestionAnswerWrapper.tsx
 ┃ ┃ ┃ ┣ 📜QuestionCard.tsx
 ┃ ┃ ┃ ┣ 📜QuestionForm.tsx
 ┃ ┃ ┃ ┗ 📜QuestionList.tsx
 ┃ ┃ ┣ 📜BidButton.tsx
 ┃ ┃ ┣ 📜DetailCarousel.tsx
 ┃ ┃ ┣ 📜DetailContent.tsx
 ┃ ┃ ┣ 📜DetailInfo.tsx
 ┃ ┃ ┗ 📜DetailTimeStamp.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜Nav.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂SocialLogin
 ┃ ┃ ┃ ┗ 📜SocialLogin.tsx
 ┃ ┃ ┣ 📜AuthFormValue.ts
 ┃ ┃ ┣ 📜LoginForm.styles.ts
 ┃ ┃ ┗ 📜LoginForm.tsx
 ┃ ┣ 📂modalCloseButton
 ┃ ┃ ┗ 📜CloseButton.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📂PostList
 ┃ ┃ ┃ ┣ 📂PostItem
 ┃ ┃ ┃ ┃ ┣ 📜PostItem.styles.ts
 ┃ ┃ ┃ ┃ ┗ 📜PostItem.tsx
 ┃ ┃ ┃ ┗ 📜PostList.tsx
 ┃ ┃ ┣ 📂ProfileMenu
 ┃ ┃ ┃ ┗ 📜ProfileMenu.tsx
 ┃ ┃ ┣ 📂UserProfile
 ┃ ┃ ┃ ┣ 📂EditProfile
 ┃ ┃ ┃ ┃ ┗ 📜EditProfile.tsx
 ┃ ┃ ┃ ┗ 📜UserProfile.tsx
 ┃ ┃ ┣ 📂WishList
 ┃ ┃ ┃ ┗ 📜WishList.tsx
 ┃ ┃ ┗ 📜MyPagePosts.styles.ts
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📂SearchItem
 ┃ ┃ ┃ ┗ 📜SearchItem.tsx
 ┃ ┃ ┣ 📜Search.styles.ts
 ┃ ┃ ┗ 📜Search.tsx
 ┃ ┣ 📂setAuction
 ┃ ┃ ┣ 📂setAuctionBtn
 ┃ ┃ ┃ ┣ 📜AddAuctionBtn.tsx
 ┃ ┃ ┃ ┗ 📜UpdateAuctionBtn.tsx
 ┃ ┃ ┣ 📜PriceAndDateAlert.tsx
 ┃ ┃ ┣ 📜SetAuctionAlert.tsx
 ┃ ┃ ┣ 📜SetAuctionBtn.tsx
 ┃ ┃ ┣ 📜SetAuctionCategory.tsx
 ┃ ┃ ┣ 📜SetAuctionContent.tsx
 ┃ ┃ ┣ 📜SetAuctionDate.tsx
 ┃ ┃ ┣ 📜SetAuctionImage.tsx
 ┃ ┃ ┣ 📜SetAuctionPrice.tsx
 ┃ ┃ ┣ 📜SetAuctionProductStatus.tsx
 ┃ ┃ ┣ 📜SetAuctionShippingType.tsx
 ┃ ┃ ┗ 📜SetAuctionTitle.tsx
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📂bidCustomModal
 ┃ ┃ ┃ ┣ 📂bidForm
 ┃ ┃ ┃ ┃ ┗ 📜BidForm.tsx
 ┃ ┃ ┃ ┗ 📜BidCustomModal.tsx
 ┃ ┃ ┣ 📂customModal
 ┃ ┃ ┃ ┗ 📜CustomModal.tsx
 ┃ ┃ ┣ 📂detailWrapper
 ┃ ┃ ┃ ┗ 📜DetailWrapper.tsx
 ┃ ┃ ┗ 📜Spacer.tsx
 ┣ 📂context
 ┃ ┣ 📜AnswerContext.tsx
 ┃ ┗ 📜AuctionDetailContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAddAuctionMutation.ts
 ┃ ┣ 📜useAuctionPostData.ts
 ┃ ┣ 📜useAuctionStatus.ts
 ┃ ┣ 📜useBidListState.ts
 ┃ ┣ 📜useCloseButtonState.ts
 ┃ ┣ 📜useCustomInfinityQuery.ts
 ┃ ┣ 📜useCustomModal.ts
 ┃ ┣ 📜useCustomMutation.ts
 ┃ ┣ 📜useCustomQuery.ts
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useDeleteAuctionMutation.ts
 ┃ ┣ 📜useDetailBidState.ts
 ┃ ┣ 📜useDidMountEffect.ts
 ┃ ┣ 📜useFetchAuctionChangeStatus.ts
 ┃ ┣ 📜useFormInput.ts
 ┃ ┣ 📜useGetAuthInfo.ts
 ┃ ┣ 📜useIsUpdateState.ts
 ┃ ┣ 📜useOnClickOutSide.tsx
 ┃ ┣ 📜useQuestionTanstackQuery.ts
 ┃ ┣ 📜useSubscribeBidTable.ts
 ┃ ┣ 📜useUpdateAuctionMutation.ts
 ┃ ┗ 📜useValidAddAuction.ts
 ┣ 📂images
 ┃ ┣ 📜clock.svg
 ┃ ┣ 📜coin.svg
 ┃ ┣ 📜end.svg
 ┃ ┣ 📜flag.svg
 ┃ ┣ 📜heart.svg
 ┃ ┣ 📜heart2.svg
 ┃ ┣ 📜logo.png
 ┃ ┣ 📜logo2.png
 ┃ ┣ 📜logo3.png
 ┃ ┣ 📜placeholder.svg
 ┃ ┣ 📜search.svg
 ┃ ┗ 📜thin_heart.svg
 ┣ 📂layout
 ┃ ┗ 📜Layout.tsx
 ┣ 📂pages
 ┃ ┣ 📜Auth.tsx
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Profile.tsx
 ┃ ┗ 📜SetAuction.tsx
 ┣ 📂query
 ┃ ┣ 📜keys.constant.ts
 ┃ ┣ 📜usePostsQuery.ts
 ┃ ┗ 📜useUsersQuery.ts
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.tsx
 ┃ ┗ 📂modules
 ┃ ┃ ┣ 📜auctionSingleDataSlice.ts
 ┃ ┃ ┣ 📜auctionTimestampSlice.ts
 ┃ ┃ ┣ 📜bidCustomModalSlice.ts
 ┃ ┃ ┣ 📜bidListSlice.ts
 ┃ ┃ ┣ 📜customModalSlice.ts
 ┃ ┃ ┣ 📜profileSlice.ts
 ┃ ┃ ┣ 📜searchSlice.ts
 ┃ ┃ ┣ 📜setAuctionSlice.ts
 ┃ ┃ ┗ 📜templateSlice.ts
 ┣ 📂share
 ┃ ┣ 📜AuthLayout.tsx
 ┃ ┗ 📜Router.tsx
 ┣ 📂styled
 ┃ ┗ 📜GlobalStyle.ts
 ┣ 📂types
 ┃ ┣ 📜databaseRetrunTypes.ts
 ┃ ┣ 📜detailTyps.ts
 ┃ ┣ 📜supabase.ts
 ┃ ┗ 📜userType.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┗ 📜supabase.ts
```
