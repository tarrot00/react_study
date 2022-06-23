# React Element, Components, Props

-----

[toc]

---------

## Elements

- 어떤 물체를 구성하는 성분, 요소

- 리액트 앱을 구성하는 가장 작은 블록들

  - DOM Elements VS React Elements

    > Virtual DOM > React Elements ==> render ==> Browser DOM > DOM Elements 
    >
    > React Elements는 DOM Elements의 가상 표현 , DOM Elements은 많은 정보를 담고 있기 때문에 상대적으로 크고 무겁다.
    >
    > React Elements는 화면에서 보이는 것들을 기술, 이러한 것들을 바탕으로 우리가 실제로 보는 DOM Element가 구성됨

- React Elements는 자바스크립트 객체 형태로 존재(불변성을 가지고 있음)

```js
{
    type: 'button', // 해당 태그의 이름을 가진 DOM node
    props: { // 속성을 나타냄, Element의 속성
        clasName: 'bg-green',
        children: { // 하위의 HTML태그를 나타냄 
            type: 'b',
            props: {
                children: 'Hello, element!'
            }
        }
    }
}
```



### Elements의 특징

- 불변성(immutable)

  > 변하지 않는 성질, 한번 생성된 Element는 변하지 않는다
  >
  > Elements '생성후'에는 children이나 attributes를 바꿀 수 없다!
  >
  > 화면에 변경된 Element를 보여주기 위해서는 새로운 Element를 만든후 바꿔치기 해주면 된다.



### Elements 렌더링 하기

```html
Root DOM Node
<div id="root"></div>
```

```react
const element = <h1>안녕, 리액트</h1>;
//render를 통해 React Element를 DOM Element에 렌더링
ReactDOM.render(element, document.getElementById('root'))
```

### 렌더링 된 Element 업데이트 하기

```react
function tick() {
    const element = (
        <div>
            <h1>안녕, 리액트!</h1>
            <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
        </div>
    );
    
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

----------

## Component and Props

### Components 

- 리액트는 Component-Based, 레고 블록을 조립하듯 컴포넌트들을 모아서 새로운 컴포넌트를 만들 수 있다. 
- 하나의 컴포넌트를 반복적으로 사용하면서 개발 시간과 유지 보수 비용을 줄일 수 있다.
- **Props를 입력 받아서 React element를 출력**하는 하나의 함수라고 생각 할 수있다.

### Props

- Property를 줄여 쓴것, 속성, 특성을 의미함

- Component의 속성을 나타낸다. 붕어빵에서 속 재료를 의미한다. 

  > Component = 붕어빵 틀
  >
  > Props = 팥, 슈크림, 고구마
  >
  > Element = 만들어진 붕어빵 

- 즉, Props는 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 '객체'이다.

### Props의 특징 및 사용법

- Read-Only: 읽을 수만 있다. 값을 변경 할 수 없다. 붕어빵이 다 구워진 이후에 속재료를 바꿀 수 없다.
- 모든 리액트 컴포넌트는 그들의 Props에 관해서는 Pure 함수 같은 역할을 해야한다.
- 모든 리액트 컴포넌트는 Props를 직접 바꿀 수 없고, 같은 Props에 대해서는 항상 같은 결과를 보여줄것!

```jsx
function App(props) {
    return (
    	<Profile
            name="소플"
            introduction="안녕하세요, 소플입니다."
          	viewCount={1500}
         />
    );
}
```

--------

## Component 만들기

- Function Component 와 Class Component

### Function Component

```jsx
function Welcom(props) {
    return <h1>안녕, {props.name}</h1>;
}
```

- 코드가 간단하다

### Class Component 

```jsx
class Welcome extends React.Component {
    render() {
        return <h1>안녕, {this.props.name}</h1>
    }
}
```

### Component의 이름

- Component 이름은 항상 대문자로 시작해야 한다! 
- 리액트는 소문자로 시작하는 태그를 DOM태그로 인식하기 때문! (ex. div, span)

### Component의 렌더링

- 컴포넌트로부터 엘리먼트를 만들어야 한다. 

```react
function Welcom(props) {
    return <h1>안녕, {props.name}</h1>;
}

const element = <Welcome name="인제" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
```

### Component 합성과 추출

- Component 합성
  - 리액트에서는 Component안에 다른 Component를 쓸 수 있다.
  - 따라서, 복잡한 화면을 여러개의 Component로 나눠서 구현 가능!

- Component 추출
  - 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것! 
  - 해당 컴포넌트가 작아질수록 기능과 내용이 명확해짐
  - 재사용성과 개발속도가 향상됨
  - 댓글 컴포넌트 > UserInfo 컴포넌트 > 아바타 컴포넌트

