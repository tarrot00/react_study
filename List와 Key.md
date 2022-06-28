# List와 Key

--------

[toc]

-----

## 여러개의 Component 렌더링 하기

- map()

  > 한쪽의 아이템과 다른쪽의 아이템을 짝지어 준다
  >
  > ```js
  > const doubled = numbers.map((number) => number * 2);
  > ```
  >
  > ```jsx
  > const numbers = [1,2,3,4,5]; 
  > const listItems = numbers.map((number) => <li>{number}</li>);
  > 
  > ReactDOM.render(
  >     <ul>{listItems}</ul>,
  >     document.getElementById('root')
  > );
  > ```
  >
  > ```jsx
  > function NumberList(props) {
  >     const {number}
  > }
  > ```
  >
  > 

--------

## List의 Key

- Key는 아이템들을 구분하기 위한 고유한 번호
- Key의 값은 같은 List에 있는 Elements 사이에서만 고유한 값이면 된다.
- map() 함수 안에 있는 Elements는 꼭 key가 필요하다!!

```jsx
// key로 숫자의 고유한 값을 사용하는 경우, numbers 배열에 중복된 숫자가 없어야 정상 작동
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number)=> <li key={number.toString()}>{number}</li>);

// key 값으로 id를 사용하는 경우
const todoItems = todos.map((todo)=> <li key={todo.id}>{todo.text}</li>);

//key로 index를 사용하는 경우, 아이템들의 고유한 ID가 없을 경우에만 사용해야 함, 배열에서 아이템의 순서가 바뀔 수 있는경우에도 사용 X
const todoItems = todos.map((todo, index) => <li key={index}>{todo.text}</li>)
```

------

## 실습

```jsx
import React, {useState} from "react";

function SignUp(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("남자");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    alert(`이름: ${name}, 성별: ${gender}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름:
        <input type="text" value={name} onChange={handleChangeName} />
      </label>
      <br />
      <label>
        성별:
        <select value={gender} onChange={handleChangeGender}>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>
    

  );
}

export default SignUp
```

