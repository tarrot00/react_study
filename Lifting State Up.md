# Lifting State Up

----

[toc]

-----

## Shared State

- 하나의 데이터를 여러개의 Component에서 표현해야 하는 경우가 종종 생긴다
- 각 컴포넌트의 state에서 여러개의 데이터를 각각 보관하는 것이 아니라 가장 가까운 공통된 부모 컴포넌트에서 공유해서 사용하는 것이 효율적
- 공유된 State, 자식 컴포넌트들이 가장 가까운 부모 컴포넌트로부터 State를 공유해 사용 하는 것
- State에 있는 데이터를 여러 개의 하위 컴포넌트에서 공통적으로 사용

-------

## 하위 컴포넌트에서 State 공유하기

- 물의 끓음 여부를 알려주는 컴포넌트

```jsx
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>;
    }
    return <p>물이 끓지 않습니다.</p>;
}
```

```jsx
function Calculator(props) {
    const [temperature, setTemperature] = useState('');
    
    const handleChange = (event) => {
        setTemperature(event.target.value);
    }
    return (
        <fieldset>
            <legend>섭씨 온도를 입력하세요:</legend>
            <input 
                value={temperature}
                onChange={handleChange}
                />
            <BoilingVerdict celsius={parseFloat(temperature)} />
        </fieldset>
    );
}
```

- 입력 컴포넌트 추출하기

```jsx
const scaleNames = {
  c: '섭씨',
  f: '화씨'
};

function TemperatureInput(props) {
    const [temperature, setTemperature] = useState('');
    
    const handleChange = (event) => {
        setTemperature(event.target.value);
    };
    
    return (
        <fieldset>
            <legend>
                온도를 입력해 주세요(단위: {scaleNames[props.scale]});
            </legend>
            <input value={temperature} onChange={handleChange} />
        </fieldset>
    );
}
```

```jsx
function Calculator(props) {
    return (
        <div>
            <TemperatureInput scale="c"/>
            <TemperatureInput scale="f"/>
        </div>
    );
}
// 섭씨 온도와 화씨 온도를 따로 입력받으면 두개의 값이 다를 수 있다.
// 따라서 두개의 온도를 동기화 시켜주기 위해 각각의 값을 변환하는 함수를 작성

function toCelsius(fahrenheit) {
    return (fahrenheit - 32)*5 /9;
}

function toFahrenheit(celsius) {
    return (celisus * 9/5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number,isNaN(input)) {
        // 숫자가 아닌 값을 입력하면 빈 string을 반환하도록 예외 처리
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000)/1000;
    
    return rounded.toString();
}

//tryConvert 함수의 사용
tryConvert('abc', toCelsius); // empty string을 리턴
tryConvert('10.22', toFahrenheit); // '50.396'을 리턴
```

-------

## Shared State 적용하기

- 리프팅: 하위 컴포넌트의 state를 공통 상위 컴포넌트로 끌어 올림

```jsx
const scaleNames = {
  c: '섭씨',
  f: '화씨'
};

function TemperatureInput(props) {
    // const [temperature, setTemperature] = useState('');
    // state 가 제거되고 상위 컴포넌트에서 전달 받은 값만을 사용
    
    const handleChange = (event) => {
        //setTemperature(event.target.value);
        //온도값을 컴포넌트 state에서 가져오는 것이 아니라 props를 통게 가져오게 된다.
        //따라서, 온도값이 변경 되었을 때 상위 컴포넌트에 온도값을 전달 해 주어야 한다.
        props.onTemperatureChange(event.target.value);
    };
    
    return (
        <fieldset>
            <legend>
                온도를 입력해 주세요(단위: {scaleNames[props.scale]});
            </legend>
            <!--<input value={temperature} onChange={handleChange} />-->
            <input value={props.temperature} onChange={handleChange} />
        </fieldset>
    );
}
```

--------

## 실습

```jsx
const scaleNames ={
  c: "섭씨",
  f: "화씨",
};

function TemperatureInput(props) {
  const handleChange = (event) => {
    props.onTemperatureChange(event.target.value);
  };

  return (
    <fieldset>
      <legend>
        온도를 입력해주세요(단위: {scaleNames [props.scale]});
      </legend>
      <input value={props.temperature} onChange={handleChange} />
    </fieldset>
  );
}

export default TemperatureInput;
```

```jsx
import React, {useState} from "react";
import TemperatureInput from "./TemperatureInput";

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  } 
  return <p>물이 끓지 않습니다.</p>
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFarenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function Calculator(props) {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  const handCelsiusChange = (temperature) => {
    setTemperature(temperature);
    setScale("c");
  };

  const handleFarenheitChange = (temperature) => {
    setTemperature(temperature);
    setScale("f");
  };

  const celsius = 
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = 
    scale === "c" ? tryConvert(temperature, toFarenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handCelsiusChange} 
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFarenheitChange} 
      />
      <BoilingVerdict celsius={parseFloat(celsius)}/>
    </div>
  );
}

export default Calculator
```





