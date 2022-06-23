## Velopert 0613

----------

[toc]

------

### React를 사용하는 이유

- 장점
  1. 배우기 간단하다
  2. 뛰어난 Garbage Collection 메모리 관리 성능 - DOM을 활용한 
  3. 서버 & 클라이언트 렌더링 둘다 지원
     - 서버 렌더링이 왜 좋은가? 
       - 초기 구동의 딜레이가 감소하여 사용자의 사용감이 증가하고
       - SEO (검색 엔진최적화) 
  4. 매우 간편한 UI 수정 및 재사용 (컴포넌트화)
  5.  페이스북의 지속적인 지원 
  6. 다른 프레임워크나 라이브러리와 혼용 가능 
- 단점
  1. VIEW ONLY : 보여지는 부분만 기능, 데이터모델링, ajax, 라우팅 등의 기능이 없음
  2. IE8 이하 지원 X (리액트 버전 14이하를 사용하고 호환하는 policy를 활용하면 사용 가능)

-----------

### Class

- 특별한 함수, class 표현식과 class 선언 두 가지 방법을 제공

- Class 선언 - 클래스는 반드시 정의한 뒤에 사용할 수 있다.

- ```javascript
  class 클래스명 {
  	constructor(height, width) {
          this.height = height;
          this.width = width;
      }
  }
  ```

- Class 표현 - class를 정의하는 또 다른 방법. 이름을 가질 수도 있고, 갖지 않을 수도 있다. 이름을 가진 class 표현식의 이름은 Class body의 local scope에 한해 유효하다.

- ```javascript
  // unnamed
  let Rectangle = class {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  };
  console.log(Rectangle.name);
  // 출력: "Rectangle"
  
  // named
  let Rectangle = class Rectangle2 {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  };
  console.log(Rectangle.name);
  // 출력: "Rectangle2"
  ```

- Class body: Class body는 중괄호 `{}` 로 묶여 있는 안쪽 부분입니다. 이곳은 여러분이 메서드나 constructor와 같은 class 멤버를 정의할 곳입니다.

- Constructor (생성자): [constructor](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor) 메서드는 `class` 로 생성된 객체를 생성하고 초기화하기 위한 특수한 메서드입니다. "constructor" 라는 이름을 가진 특수한 메서드는 클래스 안에 한 개만 존재할 수 있습니다. 만약 클래스에 여러 개의 `constructor` 메서드가 존재하면 [`SyntaxError`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 가 발생할 것입니다.

- Static 메소드 사용 가능 

----------

### JSX

- JAVASCIRPT코드에서 HTML 형식의 코드를 작성할수 있도록 해줌 .
- () 를 사용하지 않아도 오류는 발생 하지 않지만 가독성을 위하여 사용한다.

---------

### props 

- 컴포넌트 내부의 Immutable Data 

- JSX 내부에 {this.props.propsName} 형식으로 사용

- 컴포넌트를 사용 할 때, <>괄호 안에 propsName="value"값이 들어감

- this.props.children 은 기본적으로 갖고있는 props로서, <Cpnt>여기에 있는 값이 들어간다.</Cpnt>

- defult props설정하기

- PropTypes 관련 변경사항 

  > 1. Settings 클릭 -> prop-types 라는 라이브러리를 추가할 것.
  > 2. Settings에서 기존 라이브러리 URL의 .min을 제거하라고 영상에서 설명하지만 제거하지 말 것. 
  > 3. 아래의 코드에서 React.을 제거할 것 
  > 4. 수정 전/ name: React.PropTypes.string, number: React.PropTypes.number.isRequired /
  > 5. 수정 후/ name: PropTypes.string, number: PropTypes.number.isRequire

-------

### state

- 유동적인 데이터를 보여줄 때 사용
- JSX 내부에 {this.state.stateName}
- 초기값 설정이 필수, 생성자(constructor)에서 this.state= { } 으로 설정
- 값을 수정 할 떄에는 this.setState({ ... }), 렌더링 된 다음엔 this.state = 절대 사용하지 말 것! 

---------

