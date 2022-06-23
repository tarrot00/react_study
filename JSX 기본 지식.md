# JSX 기본 지식

------

[toc]

---

## JSX란?

- JavaScript의 확장 문법: JavaScript + XHL/ HTML

### JSX의 역할

- 코드가 간결해지고 생산성이 많이 올라감

### JSX의 장점

1. 간견한 코드

   ```jsx
   // JSX 사용
   <div>Hello, {name}</div>
   // JSX 미사용
   React.createElement{ 'div', null, `Hello, ${name}`};
   ```

2. 가독성 향상 - 버그를 발견하기 쉬움

3. Injection Attacks 방어

   ```jsx
   const title = response.potentiallyMaliciousInput;
   // 이 코드는 안전합니다.
   const element = <h1>{title}</h1>
   ```

### JSX 사용법

```jsx
const name = '소플';
const element = <h1>안녕, {name}</h1>; // JavaScript 변수나 함수를 사용할 때 {}를 사용
ReactDOM.render(
	element,
    document.getElementById('root')
);
```

- 사용자에 따라 다른 인사 출력

```jsx
// 사용자에 따라 다른 인사 출력
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>
    }
    return <h1>Hello, Stranger.</h1>
};
```

- 태그의 속성(attribute)에 값을 넣는 방법

```jsx
// 큰 따옴표 사이에 문자열을 넣거나
const element = <div tabIndex="0"></div>;
// 중괄호 사이에 자바스크립트 코드를 넣으면 됨!
const element = <img src={user.avatarUrl}></img>;
```

- 자식(children)을 정의하는 방법

```jsx
const element = (
	<div>
        <h1>안녕하세요</h1>
        <h2>열심히 리액트를 공부해 봅시다!</h2>
    </div>
);
```

