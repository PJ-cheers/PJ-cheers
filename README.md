## 칵테일 레시피 사이트 Cheers(치얼스)

리액트를 이용해 칵테일 레시피 추천 및 공유 사이트 구현 (react-query, react-route-dom, firebase 사용)

---

## 팀구성

| 김채현 | 이지원 | 전대현 | 정봉호 |

---

## 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Creact React App-09D3AC?style=for-the-badge&logo=CreactReactApp&logoColor=white>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">

---

## 깃 플로우 전략

- main
- develop
- feature

---

## 커밋 컨벤션

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 변경
- style : styled-components 수정, layout 수정 등 스타일 관련 변경
- refactor : 코드 리팩토링 (변수명 변경 등)
- chore : 설정 변경, 기타 변경사항
- hotfix : 긴급 수정사항
- test : 테스트 커밋
- init : 초기설정

---

## 코드 컨벤션

### 폴더, 파일명

컴포넌트 파일명은 파스칼 케이스(PascalCase)를 사용한다.

```js
MainComponent.jsx;
Route.jsx;
```

컴포넌트를 제외한 폴더, 파일명은 카멜 케이스(camelCase)를 사용한다.

```js
components;
modules;
configStore.js;
```

### 함수

함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

```js
function nameOfFunction() {
  // ...some logic
}
```

### 변수명

상수는 모두 대문자로 쓰며 띄어쓰기는 \_로 처리하며, 객체타입의 경우 카멜 케이스를 적용한다.

```javascript
const SOME_VALUE = 1;

const people = {
  name: '김자바',
  age: '26'
};
```

### 클래스명

클래스명은 케밥 케이스(kebab-case)를 원칙으로 한다.

```html
<h1 class="main-title">오늘 메뉴 추천</h1>
```

---

### 변수명 컨벤션

```javascript
회원가입: signUp;
로그인: logIn;
로그아웃: logOut;
비밀번호수정: updatePassword;

최신글불러오기: getBoard;
내가쓴글불러오기: getMyBoard;
좋아요목록불러오기: getLikedBoardList;

새글등록: addBoard;
글수정: editBoard;
글삭제: deleteBoard;

좋아요누르기: pressLike;
좋아요취소: cancelLike;
```

---

### 스타일 코드 순서 (styled-components)

스타일 코드의 순서는 아래와 같이 작성한다.

```css
.sample {
  /* position 관련 */
  position: absolute;
  top: 0;
  left: 0;

  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;

  /* size 관련 */
  width: auto;
  height: auto;

  /* margin, padding */
  margin: 0 auto;
  padding: 12px;

  /* background 관련 */
  background-color: #ffffff;

  /* border 관련 */
  border: 1px solid #ffffff;
  border-radius: 12px;

  /* font 관련 */
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  /* animation 관련 */
  transform: translate(10px, 100%);
  transition: 300ms;
}
```

# cheers_4조
