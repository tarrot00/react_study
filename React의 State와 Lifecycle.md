# React의 State와 Lifecycle

------

[toc]

----

## State 

- 리액트 Component의 변경 가능한 데이터
- state는 개발자가 직접 정의해서 사용한다
- 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함시켜야 함!
- state가 재변경될 경우 컴포넌트가 재 렌더링 되기 때문에 렌더링과 데이터에 관련없는 값을 포함하면 불필요한 경우에 컴포넌트가 재렌더링 되면서 성능을 저하시키게 된다.
- state에 포함되지 않아야 하는 값의 경우 instance에 포함시킨다.
- state는 JavaScript 객체이다
- state는 직접 수정 할 수 없다.(하면 안된다.)

```jsx
//state를 직접 수정 (잘못된 사용법)
this.state = {
  name: '이름'  
};
// setState 함수를 통한 수정 (정상적인 사용법)
this.setState({
   name: '이름' 
});
```



### constructor

- 생성자, class가 생성될 때 실행되는 함수

------

## Lifecycle

- 생명주기

- 컴포넌트는 계속 존재하는 것이 아니라, 시간의 흐름에 따라 생성되고 업데이트 되다가 사라진다.

- 리액트 component의 생명주기

- Mounting

  - constructor(생성자 실행): 컴포넌트의 state를 정의
  - 컴포넌트가 render되며 , componentDidMount 함수가 호출됨.

- Updating

  - 변화를 겪으면서 여러번 변화를 겪음
  - props, setstate(), forceUpdate()를 통해서 변화를 겪음
  - componentDidUpdate 함수가 호출됨.

- Unmounting

  - 상위 컴포넌트에서 현재 컴포넌트를 호출하지 않게 될 때
  - componentWillUnmount 함수가 호출됨.

  