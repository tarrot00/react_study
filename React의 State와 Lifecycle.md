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

------------

## state 실습

- Notification.jsx

```jsx
import React from "react";


class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};    
  }
  componentDidMount() {
    //백대쉬(`) 주의
    console.log(`${this.props.id} componentDidMount() called.`);    
  }

  componentDidUpdate() {
    console.log(`${this.props.id} componentDidUpdate() called.`);
  }
  
  componentWillUnmount() {
    console.log(`${this.props.id} componentWillUnmount() called.`);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <span style={styles.messageText}>{this.props.message}</span>
      </div>
    );
  }
}

export default Notification;
```



- NotificationList.jsx

```jsx
import { render } from "@testing-library/react";
import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
  {
    id: 1,
    message: "안녕하세요, 오늘 일정을 알려드립니다.",
  },
  {
    id: 2,
    message: "점심 식사 시간입니다.",
  },
  {
    id: 3,
    message: "이제 곧 미팅이 시작됩니다.",
  },
];

var timer;

class NotificationList extends React.Component {
  constructor(props) {
    super(props);
	// 생성자(constructor)에서 앞으로 사용할 데이터를 state에 넣어서 초기화
    this.state = {
      notifications: [],
    };
  };
  //class컴포넌트의 생명주기 함수 중 하나인 componentDidMount()에서 1초마다 정해진 작업 수행
  // 처음에는 아무것도 보이지 않다가 매초 알림이 하나씩 나타남
  componentDidMount() {
    const { notifications } = this.state;
    timer = setInterval(() => {
      if (notifications.length < reservedNotifications.length) {
        const index = notifications.length;
        notifications.push(reservedNotifications[index]);
        //state를 업데이트 하기 위해 반드시! setState 함수를 사용
        this.setState({
          notifications: notifications,
        });
      } else {
        //willUnmount 확인하기 위해 state 비워주기
        this.setState({
          notifications: [],
        });
        clearInterval(timer);
      }
    }, 1000);
  }
  
  render() {
    return (
      <div>
        {this.state.notifications.map((notification) => {
          return (
          <Notification 
            //key는 리액트 엘리먼트를 구분하기 위한 고유의 값, map함수를 사용할 때에는 필수적으로 들어가야 함
            key={notification.id}
            id={notification.id}
            message={notification.message} 
          />
          );
        })}
      </div>
    );
  }
}

export default NotificationList;
```

