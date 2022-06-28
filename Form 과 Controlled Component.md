# Form 과 Controlled Component

----

[toc]

-----

## Form

- 사용자로부터 입력을 받기 위해 사용하는 형식

## Controlled Component
- 값이 리액트의 통제를 받는 Input Form Element

- HTML Form 은 자체적으로 state를 관리

- Controlled Component 에서는 모든 데이터를 state에서 관리

- 리액트에서 모든 값을 통제할 수 있다. 

- 사용자의 입력을 집접적으로 제어할 수 있다.

  ```jsx
  // 모든 입력값을 대문자로 변경하여 state에 저장
  const handleChange = (event) => {
      setvalue(event.target.value.toUpperCase());
  }
  ```
  
------------

  ## Text area tag

- 여러 줄에 걸쳐 긴 텍스틀를 입력받기 위한 HTML 태그

```html
<textarea>
    안녕하세요, 여기에 텍스트가 들어갑니다.
</textarea>
```

### request form

```jsx
function RequestForm(props) {
    const [value, setValue] = useState('요청사항을 입력하세요.');
    
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    const handleSubmit = (event) => {
        alert('입력한 요청사항:' + value);
        event.preventDefault();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                요청사항: 
                <textarea  value={value} onChange={handleChange}/>
            </label>
        </form>
    );
}
```

### select tag

> Drop-down 목록을 보여주기 위한 HTML 태그

```html
<!-- HTML의 select 태그-->
<select>
    <option value="apple">사과</option>
    <option value="banana">바나나</option>
    <!--선택된 옵션 -->
    <option slected value="grape">포도</option> 
    <option value="watermelon">수박</option>
</select>
```

```jsx
// React 
function FruitSelect(props) {
    // 초기값으로 grape 저장
    const [value, setValue] = useState('grape');
    
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    const handleSubmit = (event) => {
        alert('선택한 과일:' + value);
        event.preventDefault();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                과일을 선택하세요:
                <select value={value} onChange={handleChange}>
                    <option value="apple">사과</option>
   				   <option value="banana">바나나</option>
    			   <option value="grape">포도</option> 
   				   <option value="watermelon">수박</option>                    
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    );
}
```

```jsx
// 여러개의 옵션을 선택 가능하게 하려면!
<select multiple={true} value={['B','C']}></select>
```

--------

### Tag 사용법 요약 

```jsx
// input 태그
<input type="text" value={value} onChange={handleChange}></input>
// textarea 태그
<textarea value={value} onChange={handleChange}></textarea>
// select 태그
<select value={value} onChange={handleChange}>
    <option value="apple">사과</option>
    <option value="banana">바나나</option>
    <option value="grape">포도</option>
    <option value="watermelon">수박</option>
</select>
```

---------

### File input tag

- 디바이스의 저장 장치로부터 하나 또는 여러개의 파일을 선택할 수 있게 해주는 HTML 태그
- 서버로 파일을 업로드 하거나 JS의 File API를 사용해서 file을 다룰 때 사용

```html
<input type="file">
```

- 그 값이 읽기 전용이기 때문에 Uncontrolled Component라서 그 값이 React의 통제를 받지 않음

--------

## Multiple Input

- 하나의 컴포넌트에서 여러개의 입력을 다루기 위해서는 여러개의 state를 사용해서 각각의 입력에 대해 사용!

```jsx
function Reservation(props) {
    const [haveBreakfast, setHaveBreakfast] = useState(true);
    const [numerOfGuest, setNumberOfGuest] = useState(0);
    
    const handleSubmit = (event) => {
        alert(`아침식사 여부: ${haveBreakfast}, 방문객 수: ${numberOfGuest}`);
        event.preventDefault();
    }
    
    return (
        <form>
            <label>
                아침식사 여부:
                <input
                    type="checkbox"
                    checked={haveBreakfast}
                    onChange={(event) => {
                        setHaveBreakfast(event.target.checked);
                    }} />
            </label>
            <label>
                방문객 수:
                <input
                    type="number"
                    value={numberOfGuest}
                    onChange={(event) => {
                        setNumberOfGuest(event.target.value);
                    }} />
            </label>
            <button type="submit">제출</button>
        </form>
    );
}
```

----

## Input Null Value

- value prop을 넣으면서 사용자가 자유롭게 값을 변경할 수 있게 할 수 있다.

```jsx
// 처음에는 input값이 hi로 정해져 있어서 값이 변경 될 수 없는 입력 불가 상태
ReactDOM.render(<input value="hi"/>, rootNode);
//타이머에 의해 1초뒤에 value가 null인 입력 가능한 input 태그로 변경
setTimeout(function() {
    ReactDOM.render(<input value={null}/>, rootNode);
}, 1000);
```

