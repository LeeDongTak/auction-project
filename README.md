## Overview

 <br/>

> **엘리트 옥션**
<br/>
> 자신의 중고 물품을 경매형식으로 판매하는 사이트

 <br/>  <br/>

📆 프로젝트 기간: 2023. 12. 26 ~ 2024. 01. 03 

 <br/>

## 팀 소개
이동탁 : https://tak-web-front.tistory.com/ <br/>
김은비 : https://velog.io/@eunbi/posts <br/>
이다원 : https://velog.io/@dawnrose <br/>
권경열 : https://velog.io/@yeol10 <br/>

 <br/>

## 프로젝트 소개 <br/>
```
판매자는 경매하고 싶은 물건을 등록하고 등록 시 내용, 경매 기간, 입찰 하한가를 설정할 수 있습니다.
구매자는 경매 게시클에 입찰가를 입력할 수 있으며 이는 하한가보다 높을 떄 입력할 수 있습니다. 경매 기간 시작 전과 끝난 후에는 입찰을 할 수 없으며 남은 시간으로 표시됩니다.
사용자는 상품에 대해 등록, 찜하기, 질문 등을 할 수 있고 이는 회원가입 및 로그인 후 회원 정보가 정상적으로 등록 시 접근할 수 있습니다.
등록한 게시물 및 찜한 게시물은 프로필 페이지에서 확인할 수 있으며, 이 곳에서 등록한 게시물 삭제 및 수정 그리고 찜한 개시물을 목록에서 삭제할 수 있습니다. 프로필 수정 탭에서 회원 정보를 변경할 수 있습니다.

```
<br />

---
## Stack <br/>

### Enviroment   <br/>

<img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white"/></a>
<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/></a>

 <br/>

### Config  <br/>

<img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=white"/></a>
<img src="https://img.shields.io/badge/YARN-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"/></a>

 <br/>

### Development
<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=black"/></a> 

<br />

#### 전역 상태관리

##### 서버 상태 관리
<img src="https://img.shields.io/badge/React Query-61DAFB?style=for-the-badge&logo=reactquery&logoColor=white"/></a>

##### 클라이언트 상태 관리
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/></a>




 <br/>

### Database

<img src="https://img.shields.io/badge/SUPABASE-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black"/></a>  

 <br/>

### Communication

<img src="https://img.shields.io/badge/SLACK-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/></a>
<img src="https://img.shields.io/badge/FIGMA-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/></a>

 <br/>
 
---
## 화면 구성

 <br/>

- 로그인 / 회원가입 페이지
  

- 메인 페이지

- 상세 페이지

- 작성 페이지

 <br/>
 
---
## 주요 기능

- 경매 등록 및 완료
    - 경매 시간 
    - 입찰  
    - QnA
- 로그인 / 회원가입
    - react-hook-form을 사용한 유효성 검사
    - supabase auth 및 social login 기능 사용

- 무한 스크롤 및 페이지 네이션
    - useInfinityQuery
    - supabase range

- 좋아요 
    - react query

- 검색 
    - supabse ilke, or

---
## 아키텍처


### 와이어프레임 <br/>

https://www.figma.com/file/8EulxNUZx6EYdiQcVrxRtQ/Untitled?type=design&node-id=0-1&mode=design&t=M3zOyCeokyddmHGc-0


### ERD <br/>

[
](https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F7375634c-2a28-470b-853a-075187172f76%2FScreen_Shot_2023-12-27_at_10.54.06_AM.png?table=block&id=10c593ca-8a16-4f0b-9b6f-ad24222b5612&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=1310&userId=&cache=v2)https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F7375634c-2a28-470b-853a-075187172f76%2FScreen_Shot_2023-12-27_at_10.54.06_AM.png?table=block&id=10c593ca-8a16-4f0b-9b6f-ad24222b5612&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=1310&userId=&cache=v2

 <br/>

### 파일 구조
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
 ┃ ┣ 📂common
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂bidPopup
 ┃ ┃ ┣ 📂qna
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜Nav.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂SocialLogin
 ┃ ┣ 📂modalCloseButton
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📂PostList
 ┃ ┃ ┃ ┣ 📂PostItem
 ┃ ┃ ┣ 📂ProfileMenu
 ┃ ┃ ┣ 📂UserProfile
 ┃ ┃ ┃ ┣ 📂EditProfile
 ┃ ┃ ┣ 📂WishList
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📂SearchItem
 ┃ ┣ 📂setAuction
 ┃ ┃ ┣ 📂setAuctionBtn
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
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┗ 📜supabase.ts
```
