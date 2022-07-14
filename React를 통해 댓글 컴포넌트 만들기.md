# React를 통해 댓글 컴포넌트 만들기

------

[toc]

--------

## Comment 컴포넌트 작성

```jsx
import React from "react";
// CSS 부분
const styles = {
  wrapper: {
    margin: 8,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    border: "1px solid grey",
    borderRadius: 16,
  },
  imageContainer: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  nameText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  commentText: {
    color: "black",
    fontSize: 16,
  },
};
// 댓글 컴포넌트의 구성
function Comment(props) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" style={styles.image}/>
      </div>

      <div style={styles.contentContainer}>
        <!-- 처음에는 props.name 부분에 이름과 내용을 적었으나 동적으로 변경가능하도록 하기 위해 prop를 추가-->
        <span style={styles.nameText}>{props.name}</span>
        <span style={styles.commentText}>{props.comment}</span>
      </div>    
    </div>
  );
}
export default Comment;
```

## CommentList 컴포넌트 작성

```jsx
import React from "react";
import Comment from "./Comment";
// 댓글 배열 만들어서 댓글의 내용을 담고있는 객체 만들어주기
const comments = [
  {
    name: "이름1",
    comment: "댓글 1 입니다.",
  },
  {
    name: "이름2",
    comment: "댓글 2 입니다.",
  },
  {
    name: "이름3",
    comment: "댓글 3 입니다.",
  },
];

function CommentList(props) {
  return (
    <div //map 함수를 활용하여 댓글 불러오기
        >      
      {comments.map((comment)=> {
          return (
            <Comment name={comment.name} comment={comment.comment}/>
          );
        })}
          
    </div>
  );
}
export default CommentList;
```



## Index.js에서 컴포넌트 출력하기

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter_04/Clock';
import CommentList from './chapter_05/CommentList';

ReactDOM.render(
  <React.StrictMode>
    <CommentList/>
    <Clock />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

