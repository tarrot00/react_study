# Styling

--------

[toc]

-------

## CSS

- Cascading Style Sheets 
  - 계단식 스타일링 방법

## Selector

- 선택자 - 스타일링을 어떤 Element에 적용할지 선택하게 해준다.

## CSS의 기본 문법

```css
h1 {color: green; font-size: 16px;}
// 선택자 { 속성(property): 값(value); 속성(property): 값(value);}
// 속성과 값을 합해서 선언(Declaration)이라고 한다.
```

## Selector의 유형

1. Element selector : 특정 html 태그를 선택하기 위함, 선택자(selector)에 html이름을 써주면 된다.

   ```css
   h1 { color: green; }
   ```

2. ID selector : html에서는 element의 ID를 정의할 수 있는데, ID셀렉터는 이 ID를 기반으로 선택함. #뒤에 ID를 넣어서 사용.

   ```css
   #ID { background-color: black; }
   ```

3. Class selector : ID는 고유한 값이어서 하나만 사용가능, 클래스는 분류를 위해 사용. 점(.)뒤에 클래스명을 넣어서 사용.

   - html태그와 클래스명을 동시에 사용할 경우, 해당 html태그에 클래스가 있는 경우만 적용

   ```css
   .클래스명 { font-size: 20px;}
   p.클래스명 { font-size: 30px; }
   ```

4. Universal selector: 특정 element가 아닌 전체 element에 적용하기 위한 선택자. *를 사용.

   ```css
   * { font-size: 20px; color: blue; }
   ```

5. Grouping selector : 여러가지 선택자를 group으로 묶어 하나의 스타일을 적용하기 위해 사용. 

   ```css
   h1, h2, p {
       color: black; 
       text-align: center;
   }
   ```

6. Element의 상태와 관련된 selector 

> :hover : 마우스 커서가 element 위에 올라왔을 때
>
> :active : 주로 <a> 태그에 사용되는데, element가 클릭됐을 때를 의미
>
> :focus : 주로<input>태그에 사용, element가 초점을 갖고 있을 경우를 의미
>
> :checked : radio button 이나 checkbox 같은 유형의 <input>태그가 체크되어 있는 경우를 의미
>
> :first-child, :last-child, :nth-child : 상위 element를 기준으로 각각 첫번째 child, 마지막 child, n번째 child 일 경우를 의미 

```css
button:hover {
    font-wieght: bold;
}
a:active {
    color: red;
}
input:focus {
    color: #00000;
}
options:checked {
    background: #00000;
}
p:first-child {
    background: #00000;
}
```

-------------

## 레이아웃과 관련된 CSS 속성

### display

```css
div {
    display: none | block | inline | flex;
}
```

- none : element를 화면에서 숨기기 위해서 사용. <script> 태그의 속성 기본값이 none.
- block : 블록단위로 element 배치. <p>, <div>, <h1> 등 태그의 기본값이 block. 
- inline: element를 라인 안에 넣는 것. <span> 태그의 display 속성 기본값이 inline.
- flex: element를 블록 레벨의 flex container로 표시. container이기 때문에 내부에 다른 element를 포함. 

### visibility

```css
div {
    visibility: visible | hidden; 
}
```

- visible : 화면에 보이게 하는 것.
- hidden : 화면에서 감추는 것. 화면에 안보이게만 하고 화면에서 영역은 그대로 차지.

### position

```css
div {
    position : static | fixed | relative | absolute;
}
```

- static : 기본값으로 element를 원래의 순서대로 위치시킴
- fixed : element를 브라우저 window에 상대적을 위치시킴
- relative: element를 보통의 위치에 상대적으로 위치시킴
- absolute : element를 절대위치에 위치시킴

### 가로, 세로 길이와 관련된 속성

```css
div {
    width: auto | value;
    heigth: auto | value;
    min-width: auto | value;
    min-height: auto | value;
    max-width: auto | value;
    max-height: auto | value;
}
```

- 값으로 실제 픽셀값을 넣거나, 상대값인 %를 사용.

### flexbox

```css
div {
    display: flex;
    flex-direction: row | column | row-reverse | column-reverse;
    align-items: stretch | flex-start | center | flex-end | baseline;
    justify-content: flex-start | center | flex-end | space-between | space-around; 
}
```

- flex-direction : 아이템들이 어떤 방향으로 배치될 것인지를 지정
- align-items : cross-axis를 기준으로 아이템을 정렬. 
  - stretch : 기본값. 아이템을 늘려서 컨테이너를 가득 채움.
  - flex-start : cross axis의 시작 지점으로 아이템을 정렬.
  -  center : cross axis의 중앙으로 아이템을 정렬.
  -  flex-end : cross axis의 끝 지점으로 아이템을 정렬.
  - baseline : 아이템을 baseline 기준으로 정렬.
- justify-content : 컨테이너 내에서 아이템들을 어떻게 나란히 맞출 것인지 지정.
  - flex-start : main-axis의 시작지점으로 아이템을 맞춤.
  - center:  main-axis의 중앙지점으로 아이템을 맞춤.
  - flex-end:  main-axis의 끝지점으로 아이템을 맞춤.
  -  space-between:  main-axis를 기준으로 첫 아이템은 시작 지점에 맞추고 마지막 아이템은 끝 지점에 맞추며, 중간에 있는 아이템들 사이의 간격이 일정하게 되도록 맞춤
  - space-around : main-axis를 기준으로 각 아이템의 주변 간격을 동일하게 맞춤

---------

## Font와 관련된 속성

```css
#title {
    font-family: "사용할 글꼴 이름", <일반적인 글꼴 분류>;
    font-size: value;
    font-weight: normal | bold;
    font-style: normal | italic | oblique;
}
```

### font-family

- 지정한 글꼴을 찾지 못했을 경우를 대비해서 그다음으로 사용할 글꼴을 지정

- 일반적인 글꼴 분류(Generc font family): 가장 마지막에 적어준다.
  - serif : 각 글자의 모서리에 작은 테두리를 갖고 있는 형태의 글꼴
  - sans-seiff : 모서리에 테두리가 없이 깔끔한 선을 가진 글꼴. 컴퓨터 모니터에서는 Serif보다 가독성이 좋음
  - monospace: 모든 글자가 같은 가로 길이를 가지는 글꼴. 코딩을 할 때 주로 사용.
  - cursive : 사람이 쓴 손글씨 모양의 글꼴.
  - fantasy : 장식이 들어간 형태의 글꼴.

```css
#title {
    font-family: "Time New Roman", Times, serif;
}
```

### font-style

- normal
- italic : 글자가 기울어진 형태로 나타남. 별도로 기울어진 형태의 글자들을 직접 디자인한 것.
- oblique : 글자가 비스듬한 형태로 나타남. 그냥 글자를 기울인 것.

--------

## 기타 많이 사용하는 속성

### background -color

- CSS의 색상 값으로 16진수 컬러 값(#ff0000), 투명도를 가진 16진수 컬러 값(#ff000055), 미리 정의된 색상의 이름(red), RGB 컬러 값(rgb(255, 0, 0))등 사용 가능
- 투명하게 만들고 싶은경우 transparent 키워드를 입력.

```css
div {
    background-color: color | transparent ; 
}
```

### border

- 테두리를 위한 속성

```css
div {
    border: border-width border-style border-color; 
    border: 1px solid black; 
}
```

----------

## Styled-components

```python
# npm을 사용하는 경우
npm install --save styled-components
# yarn을 사용하는 경우
yarn add styled-components 
```

### tagged template literal

```js
// untagged template literal 
// 단순한 문자영
`string text`

// 여러 줄에 걸친 문자열
`string text line 1
 string text line 2`

// 대체 가능한 expression이 들어있는 문자열
`string text ${expression} string text`

// tagged template literal
// myFunction의 파라미터로 expression을 구분된 문자열 배열과 expression이 순서대로 들어간 형태로 호출됨
myFunction `string text ${expression} string text`
```

## Style 확장하기

https://styled-components.com/docs

-------

## 실습

