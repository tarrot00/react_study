# useEffect의 사용법

```jsx
jsx
import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";


function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("")
  const onClick = () => setValue((prev) => prev + 1);
  const onChange =(event) => setKeyword(event.target.value);
  useEffect(()=>{
    console.log("i run only once");
  }, []);
  useEffect(() => {   
    console.log("i run when keyword change");      
  },[keyword]);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("i run when keword is over 5", keyword);
    }    
  },[keyword]);
  useEffect(() => {   
      console.log("i run when counter change");      
  },[counter]);
  useEffect(() => {   
    console.log("i run when keyword and counter change");      
  },[keyword, counter]);
  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..."></input>
      <h1 className={styles.title}>Welcom back!</h1>
      <button onClick={onClick}>Value + 1</button>
      <h3>{counter}</h3>
      <Button text={"Continue"}/>
    </div>
  );
}

export default App;

```
```


