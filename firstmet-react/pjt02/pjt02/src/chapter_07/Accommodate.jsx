import React, { useState, useEffect } from "react";
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
    console.log(`Current count value: ${count}`);
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