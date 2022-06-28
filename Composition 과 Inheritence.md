# Composition 과 Inheritence

----

[toc]

-----

## Composition 

- 여러개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것

- 합성

- 여러개의 컴포넌트들을 어떻게 조합할 것인가?

------

### 1. Containment

- 담다, 포함하다
- 하위 컴포넌트를 포함하는 형태의 합성 방법
- Sidebar나 Dialog 같은 Box형태의 컴포넌트는 자신의 하위 컴포넌트를 미리 알 수 없다. 해당 컴포넌트를 사용하는 사용자가 어떤 내용을 담느냐에 따라 하위 컴포넌트가 바뀌기 때문
- Children이라는 prop을 사용해서 조합!

```jsx
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
```

```jsx
// FancyBorder 컴포넌트 안에 있는 모든 JSX 태그는 children으로 전달됨!
function WelcomeDialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">어서오세요</h1>
            <p className="Dialog-message">우리 사이트에 방문하신 것을 환영합니다.</p>
        </FancyBorder>
    );
}
```

```jsx
// 여러개의 children 집합이 필요한 경우
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">{props.left}</div>
            <div className="SplitPane-right">{props.right}</div>
        </div>
    );
}

function App(props) {
    return (
        <SplitPane
            left ={
                <Contacts />
            }
            right ={
                <Chat />
            }
        />
    );
}
```

------

### 2. Specilization

- 전문화, 특수화 
- WelcomeDialog는 Dialog의 특별한 케이스, 이처럼 범용적인 개념을 구별이 되도록 구체화 하는 것을 Specilization이라고 한다.
- 기존의 객체지향 언어에서는 상속을 사용하여 Specialization을 구현, 리액트에서는 합성을 사용하여 Specialization을 구현 

```jsx
// 범용적으로 쓸 수 있는 컴포넌트를 만들어 두고
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
        </FancyBorder>
    );
}
// 이를 특수한 경우에 구체화 시켜서 사용하는 컴포지션 방법
function WelcomeDialog(props) {
    return (
        <Dialog 
            title = "어서오세요"
            message= "우리 사이트에 방문하신 것을 환영합니다."
        />
    );
}
```

-----

### 3.Containment 와 Specilization을 같이 사용하기

```jsx
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
            <!--컨테인먼트를 위해 props.children 추가
		       이를 통해 하위 컴포넌트가 Diaglog 하단에 렌더링 된다.		
		   -->
            {props.children}
        </FancyBorder>
    );
}
```

```react
function SignUpDialog(props) {
    const [nickname, setNickname] = useState('');
    
    const handleChange = (event) => {
        setNickname(event.target.value);
    }
    
    const handleSignUp = () => {
        alert(`어서오세요, ${nickname}님!`);
    }
    
    return (
        // Specialization
        <Dialog
            title= "화성 탐사 프로그램"
            message= "닉네임을 입력해 주세요."
            >
            <!-- Containment/인풋과 버튼 태그는 props.children으로 전달 되어 화면에 출력-->
            <input
                value={nickname}
                onChange={handleChange}
                />
            <button onClick={handleSignUp}>가입하기</button>
        </Dialog>
    );
}
```

-----

## Inheritence 

- 상속
- 부모 클래스를 상속 받아서 새로운 자식 클래스를 만든다는 것
- 다른 컴포넌트로부터 상속받아서 새로운 컴포넌트를 만드는 것 
- 리액트에서는 상속보다는 컴포지션을 활용하는 것이 유용

--------

### 복잡한 컴포넌트를 쪼개서 여러개의 컴포넌트로 만들고, 만든 컴포넌트들을 조합해서 새로운 컴포넌트를 만들자 ! 
