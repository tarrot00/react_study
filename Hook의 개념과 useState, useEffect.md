# Hook의 개념과 useState, useEffect

-----

[toc]

------

## Hook

- React에 state와 Lifecycle, 최적화 관련 함수라는 갈고리를 걸어 원하는 시점에 정해진 함수를 실행 하도록 만든 것.
- 커스텀 Hook을 사용할 경우에도 이름 앞에 use를 붙여서 Hook이라는 것을 나타내 주어야 한다.

--------

### useState()

- state를 사용하기 위한 Hook

```jsx
// count 값은 바뀌나 재렌더링이 되지 않아 화면에서 count 변화하지 않음 -> useState()함수를 사용해서 재렌더링 해야함
function Counter(props) {
    var count = 0;
    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onClick={() => count++}>클릭</button>
        </div>
    );
}
```

- useState() 사용법

```jsx
const [변수명, set함수명] = useState(초기값);
// 이렇게 초기값을 넣어 useState를 호출하면 return값으로 배열이 나옴
```

```jsx
function Counter(props) {
    // 변수 각각에 대해 set함수가 따로 존재! 
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <!-- useState를 활용하여 count값을 state로 관리하도록 만든 것-->
            <button onClick={() => setCount(count+1)}>클릭</button>
        </div>
    );
}
```

---------



### useEffect()

- Side effect(=효과, 영향)를 수행하기 위한 Hook
- 서버에서 데이터를 받아오거나 수동으로 DOM을 변경하는 작업
- 다른 컴포넌트에 영향을 미칠수 있으며, 렌더링 중에는 작업이 완료될 수 없는 작업을 수행, 렌더링이 끝난 이후에 수행되어야 하는 작업들을 수행
- 리액트의 함수 컴포넌트에서 Side에서 실행될 수 있도록 해주는 Hook
- ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount와 동일한 기능을 하나로 통합해서 수행
- useEffect() 사용법

```jsx
useEffect(이펙트 함수, 의존성 배열);
// Effect function이 mount와 unmount시에 단 한번씩만 실행되게 하고 싶은 경우 의존성 배열에 빈 배열을 넣는다.
useEffect(이펙트 함수, []); 
// 의존성 배열을 생략하면 컴포넌트가 업데이트 될 때마다 호출 됨
useEffect(이펙트 함수);
```

```jsx
function Counter(props) {
    const [count, setCount] = useState(0);
    // componentDidMount, componentDidUpdate와 비슷하게 작동합니다.
    // 의존성 배열 없이 useEffect를 사용하면 react는 DOM이 변경된 이후에 해당 effect 함수를 실행하라는 의미로 받아들임
    //따라서 매번 렌더링 될 때마다 effect가 실행됨 
    useEffect(() => {
        //브라우저 API를 사용해서 document의 title을 업데이트 합니다.
        document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>            
            <button onClick={() => setCount(count+1)}>클릭</button>
        </div>
    );
}
```

```jsx
// 두개의 useEffect Hook을 사용할 수도 있다. useState와 useEffect를 각각 두개씩 사용 
function UserStatusWithCounter(props) {
    const [count, setCount] = useSate(0);
    useEffect(() => {
        document.title = `총 ${count}번 클릭했습니다.`;
    });
    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
}
```

```jsx
useEffect(() => {
    // 컴포넌트가 마운트 된 후,
    // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행됨
    // 의존성 배열이 빈 배열([])을 넣으면 마운트와 언마운트시에 단 한 번씩만 실행됨
    // 의존성 배열 생략 시 컴포넌트 업데이트 시마다 실행됨
    ...
    return () => {
        // 컴포넌트가 마운트 해제되기 전에 실행됨
    }
}, [의존성 변수1, 의존성 변수2, ...]);
```

--------

### useMemo()

- Memoized value를 리턴하는 Hook

  - Memoization - 최적화를 위해서 사용하는 개념

    >  비용이 높은(연산량이 많이 드는) 함수의 호출 결과를 저장해 두었다가 같은 입력값으로 함수를 호출하면 새로 함수를 호출 하지 않고, 이전에 저장해 두었던 호출 결과를 바로 반환하는 것
    >
    >  결과적으로 함수 호출 까지 걸리는 시간이 짧아질 뿐만 아니라 불필요한 중복 연산도 하지 않기 때문에 컴퓨터의 자원을 적게 사용한다.
    >
    >  빠른 렌더링 속도를 얻을 수 있다. 
    >
    > 

  - Memoizaed된 결과값을 영어로 Memoized value라고 함

- useMemo() 사용법

```jsx
//case1
const memoizedValue = useMemo(() => {
    // 연산량이 높은 작업을 수행하여 결과를 반환
    // useMemo를 통해 전달된 함수는 '렌더링이 일어나는 동안' 실행된다. 
    // 렌더링이 일어나는 동안 실행되어서는 안되는 함수를 useMemo에 넣어서는 안된다. ex. sideEffect
    return computeExpensiveValue(의존성 변수1, 의존성변수2 );
}, [의존성 변수1, 의존성 변수2]);

```

```jsx
//case2
// 의존성 배열을 넣지 않을 경우, 매 렌더링마다 함수가 실행됨
// 따라서 의존성 배열에 아무것도 넣지 않고 useMemo 함수를 사용하는 것은 아무 의미가 없다.
const memoizedValue = useMemo(() => computeExpensiveValue(a,b));
```

```jsx
//case3
// 의존성 배열이 빈 배열일 경우, 컴포넌트 마운트 시에만 호출 됨
// 즉, 마운트 이후에는 값이 변경 되지 않음 
const memoizedValue = useMemo(() => {
    return computeExpensiveValue(a,b);
}, []);
```

- 대부분의 경우 의존성 배열에 변수들을 넣고 해당 변수들의 값이 바뀜에 따라 새로 값을 계산해야 할 경우에만 사용하므로 case1의 경우에만 주로 사용

-------

### useCallback()

- useMemo() Hook과 유사하지만 값이 아닌 함수를 반환
- 컴포넌트가 매번 렌더링 될 때마다 매번 함수를 새로 정의하는 것이 아니라 의존성 배열에 값이 바뀌는 경우에만 함수를 새로 정의해서 return 해줌
- useCallback() 사용법

```jsx
const memoizedCallback = useCallback(
	() => {
        doSomething(의존성변수1, 의존성변수2);
    }, [의존성변수1, 의존성변수2]
);
```

- 동일한 역할을 하는 두 줄의 코드

```jsx
useCallback(함수, 의존성 배열);
useMemo(() => 함수, 의존성 배열);
```

- useCallback() 사용 예시

```jsx
// useCallback 을 사용 하지 않는 경우
function ParentComponent(props) {
  const [count, setCount] = useState(0);
  // 부모 컴포넌트가 재렌더링 될 때마다 매번 함수(자식 컴포넌트)가 새로 렌더링됨(정의됨)
  const handleClick = (event) => {
      // 클릭 이벤트 처리
  };
  return (
      <div>
          <button
              onClick={()=> {
                  setCount(count + 1);
              }}
            >
          	{count}
          </button>
          
          <ChildComponent handleclick={handleClick}/>
      </div>
  ); 
   
}
```

```jsx
//useCallback을 사용하는 경우
function ParentComponent(props) {
  const [count, setCount] = useState(0);
  // 컴포넌트가 마운트 될 때만(특정 변수의 값이 변한 경우에만) 함수가 정의됨
  // 함수에 변화가 없으면 자식 컴포넌트에 재렌더링이 일어나지 않음 
  const handleClick = useCallback((event) => {
      // 클릭 이벤트 처리
  }, []);
  return (
      <div>
          <button
              onClick={()=> {
                  setCount(count + 1);
              }}
            >
          	{count}
          </button>
          
          <ChildComponent handleclick={handleClick}/>
      </div>
  );    
}
```

----

### useRef()

- Reference를 사용하기 위한 Hook, Reference 객체를 반환함

  - Reference - 특정 컴포넌트에 접근할 수 있는 객체

    > Reference 객체에는 current라는 속성이 있음 `refObject.current` 이는 현재 참조하고 있는 Element를 의미함

- useRef() 사용법 (= 변경 가능한 current라는 속성을 가진 하나의 상자)

```jsx
const refContainer = userRef(초기값);
//파라미터로 초기값을 넣으면 해당 초기값으로 초기화된 reference 객체를 반환한다. 
//만약 초기값이 null 이라면 current 값이 null인 객체가 반환된다.
//이렇게 반환된 reference 값은 컴포넌트의 lifetime 전체에 걸쳐서 유지됨.(=컴포넌트의 마운트 해제 전까지 유지됨.) 
```

- 사용 예시

```jsx
// 버튼 클릭시 input 태그를 자동으로 focus 하도록 하는 코드
function TextInputWithFocusButton(props) {
    // 초기값 null, 결과로 반환된 inputElem라는 ref 객체를 input 태그에 넣어줌 <input ref={inputElem} type="text"/>
    const inputElem = useRef(null);
    
    //버튼 클릭시 호출되는 함수에서 inputElem.current를 통해 실제 element에 접근하여 focus 함수를 호출
    const onButtonClick = () => {
        // `current`는 마운트된 input element를 가리킴
        inputElem.current.focus();
    };
    return (
        <>
        	<input ref={inputElem} type="text"/>
        	<button onClick={onButtonClick}>
            	Focus the input
        	</button>
        </>
    );
}
```

- useRef() Hook은 내부의 데이터가 변경되었을 때 별도로 알리지 않는다. 따라서 current 속성을 변경한다고 해서 재 렌더링이 일어나지는 않는다.
- 따라서 ref에 DOM node가 연결되거나 분리되었을 때 어떤 코드를 실행하고 싶다면 Callback ref를 사용해야 한다.

### Callback ref

- DOM node의 변화를 파악하는 가장 기초적인 방법

```jsx
// h1태그의 높이값을 매번 업데이트
function MeasureExample(props) {
    const [height, setHeight] = useState(0);
    
    const measureRef = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
        // 빈 배열을 넣어서 h1태그가 마운트, 언마운트 될 때만 콜백 함수가 호출 됨(= 재렌더링일 일어날 때에는 호출 되지 않음)
    }, []);
    return (
        <>
        	<h1 ref={measuredRef}>안녕, 리액트</h1>
        	<h2>위 헤더의 높이는 {Math.round(height)}px 입니다.</h2>
        </>
    );
}
```

---

## Hook의 규칙

### 1. Hook은 무조건 최상위 레벨에서만 호출해야 한다.

- 반복문, 조건문, 중첩된 함수들 안에서 Hook을 호출해서는 안된다.
- Hook은 컴포넌트가 렌더링 될 때마다 매번 같은 순서로 호출되어야 한다.

### 2.  리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.

- 일반적인 JavaScript 함수에서 Hook을 호출해선 안된다.
- 리액트 함수 컴포넌트에서만 호출하거나 직접 만든 커스텀 Hook에서만 호출가능.

### Hook의 사용에 도움이 되는 플러그인 : eslint-plugin-react-hooks

- Hook의 규칙을 따르도록 강제해 주는 플러그인
- https://www.npmjs.com/package/eslint-plugin-react-hooks

----------

## Custom Hook 만들기

- 여러 컴포넌트에서 반복적으로 사용되는 함수를 Hook으로 만들어 재사용하기 위함
- Custom Hook을 만들어야 하는 상황

```jsx
// isOnline의 상태에 따라서 사용자가 온라인인지 아닌지를 텍스트로 보여주는 컴포넌트
function UserStatus(props) {
    const [isOnline, setIsOnline] = useState(null);
    
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });
    if (isOnline === null) {
        return '대기중...';
    }
    return (isOnline ? '온라인': '오프라인';)
}
```

```jsx
//위의 컴포넌트에서 연락처(UserListItem)를 온라인인 유저에게 초록색으로 보여주고자 할때 
function UserListItem(props) {
    const [isOnline, setIsOnline] = useState(null);
    //userEffect()부분이 동일 -> 여러 부분에서 중복되는 코드
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });
    
    return (
        <li style={{ color: isOnline ? 'green':'black' }}>
            {props.user.name}
        </li>
    );
}
```

- Custom Hook 추출하기

  > 이름이 use로 시작하고 내부에서 다른 Hook을 호출하는 하나의 자바스크립트 함수.
  >
  > 🎈단순한 함수와 같지만 이름을 use로 사용해서 리액트 Hook이라는 것을 나타내 준다.
  >
  > Hook의 두가지 조건이 적용됨.

```jsx
import {useState, useEffect } from "react";

function useUserStatus(userId) {
    const [isOnline, setIsOnline] = useState(null);
    
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ServerAPI.subscribeUserStatus(userId, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(userId, handleStatusChange); 
        };
    });
    return isOnline;
}
```

- Custom Hook의 사용

```jsx
function UserStatus(props) {
    const isOnline = useUserStatus(props.user.id);    
   
    if (isOnline === null) {
        return '대기중...';
    }
    return (isOnline ? '온라인': '오프라인';)
}

function UserListItem(props) {
   const isOnline = useUserStatus(props.user.id);         
   
    return (
        <li style={{ color: isOnline ? 'green':'black' }}>
            {props.user.name}
        </li>
    );
}
```

> Custom Hook의 이름은 꼭 use로 시작해야 한다
>
> 여러 개의 컴포넌트에서 하나의 Custom Hook을 사용할 때 컴포넌트 내부에 있는 모든 state와 effects는 전부 분리되어 있다.
>
> React 컴포넌트는 각각의 Custom Hook 호출에 대해서 분리된 state를 얻게됨, 각 Custom Hook의 호출 또한 완전히 독립적이다. 
>
> 만약 Hook들 사이에서 데이터를 공유하고 싶다면? 

```jsx 
//....
function ChatUserSelectior(props) {
    //useState Hook을 활용해서 userId라는 state를 만듬, 이를 useUserStatus의 파라미터에 넣어줌으로써 
    // setUserId 함수를 통해 userId가 변경 될 때마다, useUserSatus 함수가 이전의 userId를 취소하고 새로 선택된 유저의 온라인 여부를 확인
    const [userId, setUserId] = useState(1);
    const isUserOnline = useUserStatus(userId);
//....
}
```

-----------

## Hook 실습

- useCounter.jsx

```jsx
import React, { useState } from "react";  // {useState} 를 추가로 import 해주어야 한다.

// 초기 카운트 값을 파라미터로 받아서 count라는 state를 만들어서 값을 제공하고 count 증가 및 감소를 편리하게 할수 있도록 함수를 제공하는 Hook
// useCounter Hook을 사용하면 어떤 component에서든지 Counter 기능을 쉽게 사용 가능
function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  const increaseCount = () => setCount((count) => count + 1);
    //count 값이 0 아래로 내려갈 수 없도록 Math를 사용
  const decreseCount = () => setCount((count) => Math.max(count - 1, 0));

  return [count, increaseCount, decreseCount];
}

export default useCounter;
```

- Accommodate.jsx

```jsx
import React, { useState, useEffect } from "react"; // {useState, useEffect } 도 추가로 import 해주어야 한다.
import useCounter from "./useCounter";

const MAX_CAPACITY = 20;

function Accommodate(props) {
  const [isFull, setIsFull] = useState(false);
  const [count, increaseCount, decreseCount] = useCounter(0);

  //의존성 배열이 없는 형태
  //컴포넌트가 마운트 된 직후 호출되며, 업데이트 될 때마다 호출
  useEffect(() => {
    console.log("===============");
    console.log("useEffect() is called.");
    console.log(`isFull: ${isFull}`);
  });
  //의존성 배열이 있는 형태
  //컴포넌트가 마운트 된 직후 호출되며, count 값이 바뀔 때마다 호출
  //용량이 가득 찼는지 아닌지의 상태를 isFull이라는 state에 저장함
  useEffect(() => {    
    setIsFull(count >= MAX_CAPACITY);
    console.log(`Current count value: $(count)`);
  }, [count]);

  return (
    <div style={{padding: 16}}>
      <p>{`총 ${count}명 수용했습니다.`}</p>
      {/* count개수가 MAX_CAPACITY를 넘으면 경교 문구가 표시되면서 더이상 입장이 불가능해짐  */}
      <button onClick={increaseCount} disabled={isFull}>입장</button>
      <button onClick={decreseCount}>퇴장</button>
      {isFull && <p style={{color: "red"}}>정원이 가득찼습니다.</p>}
    </div>
  );
}

export default Accommodate
```

