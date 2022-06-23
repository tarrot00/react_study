import React from "react";
import Comment from "./Comment";

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
    <div>
      {comments.map((comment)=> {
          return (
            <Comment name={comment.name} comment={comment.comment}/>
          );
        })}
          
    </div>
  );
}

export default CommentList;
