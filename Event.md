# Event 

-------

[toc]

-------

## Event의 의미

- 특정 사건

- 예시) 버튼 클릭 이벤트

- DOM의 이벤트

  ```jsx
  <button onclick="activate()">Activate</button>
  ```

- React의 이벤트

  ```jsx
  <button onClick={activate}>Activate</button>
  // camelCase 사용과 함수의 이름 전달 방식에서 차이가 있다.
  ```

----------

## Event Handling(EventListener)

- 이벤트가 발생하였을 때 해당 이벤트를 처리하는 역할을 하는 것
- Class 컴포넌트에서 이벤트의 처리

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { isToggleOn: true };
        
        //callback에서 'this'를 사용하기 위해서는 바인딩을 필수적으로 해줘야 합니다.    
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState(prevState => ({
            is ToggleOn: !prevState.isToggleOn
        }));
    }
    
    render () {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? '켜짐' : '꺼짐' }
            </button>
        );
    }
}
```

> JavaScript에서 기본적으로 class함수들이 bound 되지 않음. 따라서 bind해주지 않으면 this.handleClick이 글로벌 스코프에서 호출되는데, 글로벌 스코프에서 this.handleClick은 undefined 이므로 사용할 수가 없다. 

```jsx
//binding이 귀찮게 느껴진다면 Clss fields syntax 사용 
class MyButton extends React.Component {
    handleClick = () => {
        console.log('this is:', this);  //Clss fields syntax 사용 
    }
    render() {
        return (
            <button onClick={this.handleClick}>클릭</button>
        );
    }
}
```

```jsx
//binding이 귀찮게 느껴진다면 Arrow function 사용
class MyButton extends React.Component {
    handleClick() {
        console.log('this is:', this);  
    }
    render() {
        // 이렇게 하면 `this`가 바운드 된다.
        return (
            <button onClick={() => this.handleClick()}>클릭</button> //Arrow function 사용 
        );
    }
}
```

> Arrow function을 사용하는 경우 MyButton 컴포넌트가 렌더링 될 때마다 다른 callback 함수가 생성되는 문제가 있다.
>
> 이 callback 함수가 하위 컴포넌트에 prop으로 넘겨지게 되면 하위 컴포넌트에서 추가적인 렌더링이 발생하게 된다. 



- 함수 컴포넌트에서의 이벤트 처리

```jsx
function Toggle(props) {
    const [isToggleOn, setTIsToggleOn] = useState(true);
    
    // 방법 1. 함수안에 함수로 정의
    function handleClick() {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }
    
    //방법 2. arrow function을 사용하여 정의
    const handleClick = () => {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }
    
    return (
        <button onClick={handleClick}>
            {isToggleOn ? "켜짐" : "꺼짐"}
        </button>
    );
}
```

---------

## Arguments 전달하기

- 함수에 주장할 내용
- 함수에 전달할 데이터
- EventsHandler에 전달할 데이터
- 매개변수

```jsx
function MyButton(props) {
    const handleDelete = (id, event) => {
        console.log(id, event.target);
    };
    return (
        <button onClick={(event) => handleDelete(1, event)}>
            삭제하기
        </button>
    );
}
```

------

## 실습

```jsx
import React from "react";

class ConfirmButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isConfirmed: false,
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.setState((prevState)=>({
      isConfirmed: !prevState.isConfirmed,
    }));
  }

  render() {
    return (
      <button 
        onClick={this.handleConfirm}
        disabled={this.state.isConfirmed}
      >
        {this.state.isConfirmed ? "확인됨":"확인하기"}
      </button>
    );
  }
}

export default ConfirmButton
```

```jsx
// Arrow function 사용하기
import React from "react";

class ConfirmButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isConfirmed: false,
    };    
  }

  handleConfirm = () => {
    this.setState((prevState)=>({
      isConfirmed: !prevState.isConfirmed,
    }));
  }

  render() {
    return (
      <button 
        onClick={this.handleConfirm}
        disabled={this.state.isConfirmed}
      >
        {this.state.isConfirmed ? "확인됨":"확인하기"}
      </button>
    );
  }
}

export default ConfirmButton
```

```jsx
// 함수 컴포넌트로 바꿔보기
import React, {useState} from "react";

function ConfirmButtonFunction(props) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed);
  };

  return (
    <button onClick={handleConfirm} disabled={isConfirmed}>
      {isConfirmed ? "확인됨": "확인하기"}
    </button>
  );
}

export default ConfirmButtonFunction
```

