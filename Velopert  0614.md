## Velopert  0614

-----------

[toc]

----------

### 컴포넌트 매핑

```react
arr.map(callback, [thisArg])
```

- callback : 새로운 배열의 요소를 생성하는 함수로서, 다음 세가지 인수를 가진다
  1. currentValue: 현재 처리되고 있는 요소
  2. index: 현재 처리되고 있는 요소의 index 값
  3. array: 메소드가 불려진 배열
- thisArg(선택항목) callback 함수 내부에서 사용 할 this 값을 설정

- arrowfunction (...) => {...} **알아두기**

---------

- Webpack: 웹 프로젝트를 만들 때 전체적으로 파일을 관리해 주는 도구
- Babel: Javascript의 언어를 이전 버전으로 바꾸어 주는 도구

---------

```js
// jsx 기본 문법 공부하기 1 
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = '동찬'
    const number = 1;
    return (
      <div>
        <h1>안녕하세요 {name}</h1>
        { 
          1+1 === 3
            ? '맞다'
            : '틀리다'
        }
        {
          name === '수환!' && <div>수환이다!!</div>
        }
        {/* 
        함수를 JSX 안에서 사용하기
        함수를 사용한 후 다시 ()로 감싸고 뒤에서 ()로 호출한다. 
        */}

        {
          (function() {
            if (number === 1) return <div>1이다!!</div>
            if (number === 2) return <div>2이다!! </div>
            return <div>없다!! </div>
          })()

        }
      </div>
    );
  }
}

export default App;

```

```js
// jsx 기본 문법 공부하기 2 CSS
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const style = {
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: '36px'
    };
    return (

      <div 
      //주석을 이런식으로도 남길 수 있다
      >
        {/* 이렇게 주석을 남겨도 된다 */}
        <h1 style={style} >안녕하세요 리액트</h1>
        <h2 className="App">안녕하세요 APP.CSS </h2>
      </div>
    );
  }
}
export default App;
```

```css
.App {
  background-color: black;
  color: aqua;
  font-size: 36px;
  padding: 1rem;
  font-weight: 600;
}
```

-----

### props 최신버전

- props 부모가 자식에게 내려줄 때 주로 사용, 읽기 전용

```react
import React, { Component } from 'react';
import MyName from './MyName';



class App extends Component {
  render() {
    return <MyName name="리액트"/>;
  }
}

export default App;
```

```react
import React, {Component} from 'react';

class MyName extends Component {

  static defaultProps = {
    name: 'default name' // 기본 값 설정 1 
  }
  render() {
    return (
    <div>
      안녕하세요 제 이름은 <b>{this.props.name}</b>
    </div>
    )
  }
}
// 기본값 설정 2 : 아래쪽 꺼가 적용 코드 쭉 읽다가 아래쪾 꺼 적용하는 듯하다.
MyName.defaultProps = {  
  name: 'default name 2'
}

export default MyName
```

```react
// 함수형 
import React from 'react'; // component 필요없음

const MyName = ({name}) => {
  return <div>안녕하세요 ! 제 이름은 {name} 입니다.</div>
};
// 기본값 설정 
MyName.defaultProps = {
  name : 'default name 3 '
};


export default MyName
```

-------

### state

- state는 내부에서 변경 할 수 있다. 변경 할 때는 언제나 setState 라는 함수를 사용한다. 변경 가능 

```react
import React, {Component} from 'react';

class Counter extends Component {
// state는 문자열이나 숫자여서 안되고 '객체'여야 한다.
  state = {
    number: 0
  }

  handleIncrease = () => {
    // this.state.number = this.state.number + 1 사용 X 
    this.setState({
      number: this.state.number + 1
    })
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    })
  }
  render () {
    return (
      <div>
        <h1>카운터</h1>
        <div>값 : {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>        
      </div>
    )
  }
}

export default Counter
```

```react
//arrow 함수를 사용하지 않는 경우 constructor를 추가적으로 구성해 주고 bind시켜 줘야한다.
import React, {Component} from 'react';

class Counter extends Component {
// state는 문자열이나 숫자여서 안되고 '객체'여야 한다.
  state = {
    number: 0
  }
  constructor(props) {
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    // this.state.number = this.state.number + 1 사용 X 
    this.setState({
      number: this.state.number + 1
    })
  }

  handleDecrease() {
    this.setState({
      number: this.state.number - 1
    })
  }
```

