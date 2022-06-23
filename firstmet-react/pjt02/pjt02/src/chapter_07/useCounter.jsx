import React, { useState } from "react"; 

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