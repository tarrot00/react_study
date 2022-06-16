# REACT 들어가기전 기본 지식

------

[toc]

----------

## 각종 용어

HTML: Hyper Text Markup Language 

> 웹 사이트의 뼈대를 구성하기 위해 사용하는 마크업 언어

TAG:

> 태그는 열었으면 꼭 닫아 줘야 함 
>
> 웹사이틔 뼈대를 구성하는 태그들 
>
> ```html
> <html>
>     <head 속성들이 들어감>
>         <title>웹사이트의 제목</title>
>     </head>
>     <body 실제로 웹사이트에서 보이는 콘텐츠가 들어감>        
>     </body>
> </html>
> ```
>
> 

SPA: Single Page Application

> 하나의 페이지만 존재하는 웹 애플리케이션
>
> 전통적의 방식의 경우 여러페이지가 존재하고 사용자가 요청을 보낼 때마다 새로운 페이지가 나타난다
>
> 하지만 SPA 경우 하나의 페이지만 존재하고 
>
> 

CSS: Cascading Style Sheets 

> 웹사이트의 색상과 글꼴 디자인을 입히는 역할을 함

-----

## JavaScript(ECMAScript)

- 웹사이트가 살아움직이도록 생명을 불어 넣는 언어, 스크립트 언어의 한 종류이다.

### JavaScript의 문법

- 자료형(Data Type)- Dynamic Typing(동적 타이핑)

```js
//Number Type
let n1 =1234;
//String Type
let s1 = "hello";
let s2 = 'world';
//Boolean type
let b1 = true;
//Null type
let n = null; // 값이 정의 되었지만 그 값이 null인 경우
//Undefined type
let u1; //변수의 선언만 하고 값을 대입하지 않으면 undefined 가 된다.
let u2 = undefined; //값이 아직 정의 되지 않은 경우 - null과 다름
//Array type (배열)
// 배열에 다양한 값이 변수로 들어 갈 수 있음
let arr = [1,2,3,4]; 
let arr2 = [1, "h", 2, "3"];
let arr3 = [ true, 1, undefined, false, "h", 2, null, "i"];

console.log(arr2[2]); //출력결과: 2
console.log(arr3[3]); //출력결과: false
//Object type (객체)
// 키(key)는 문자열이어야만 하고, 값(value)에는 어떠한 값이든 다 들어갈 수 있다.
let obj = {a:"apple", b:"banana", c:"cherry"}
let obj2 = {a: "hello", b: 100, c: [1,2,3,4]};
let obj3 = { a: { a1: 1, a2: 2}, b: { b1: 3, b2: 4 }, c: { c1: 5, c2: 6},};

console.log(obj3['c']); //출력결과: [1,2,3,4]
console.log(obj4.c.c2); //출력결과: 6
```

