# Conditional Rendering/ 조건부 렌더링

----

[toc]

----

## Conditional Rendering의 의미

- 조건에 따른 렌더링, 조건부 렌더링, 어떠한 조건(조건문)에 따라서 렌더링이 달라지는 것

```jsx
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGretting />;
}
```

---------

## JavaScript의 Truthy와 Falsy

- Boolean 자료형의 값은 참 과 거짓, 둘 중 하나가 된다.

- **Truthy** = true는 아니지만 true로 여겨지는 값
- **Falsy** = false는 아니지만 false로 여겨지는 값

```js
// truthy 
true
{} (empty object)
[] (empty array)
42 (number , not zero)
"0", "false" (string, not empty)

//falsy
false
0, -0 (zero, minus zero)
0n (BigInt Zero)
'',"",`` (empty string)
null
undefined
NaN (not a number)
```

### Element Variables

- 엘리먼트 변수 : 리액트의 엘리먼트를 변수처럼 다루는 방법

- 엘리먼트를 변수처럼 저장해 사용

### Inline Condition

- 조건문을 코드 안에 집어넣는 것

### Inline if

- if 문을 넣는 경우 && 연산자를 사용, 양쪽에 나오는 조건문이 모두 true인 경우에만 전체 결과가 true가 된다.
- true && expression -> expression, false && expression -> false

### Inline If-Else

- If-Else 문의 경우 ? 연산자를 사용, 앞에 나오는 조건문이 true이면 첫번째 항목을 false이면 두번째 항목을 return
- condition ? true : false

### 컴포넌트를 렌더링 하고 싶지 않은 경우? 

- null을 리턴하면 렌더링 되지 않음

