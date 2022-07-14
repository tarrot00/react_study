# Context 

-----

[toc]

--------

## Context의 역할

- 컴포넌트의 사이에서 props를 통한 데이터 전달대신 컴포넌트 트리를 통해 곧바로 데이터를 컴포넌트로 전달하는 새로운 방식을 제공
- 이를 통해 어떤 컴포넌트라도 데이터에 쉽게 접근 가능

------

## 언제 Context를 사용해야 할까?

### 여러개의 Component들이 접근해야 하는 데이터

- 로그인 여부, 로그인 정보, UI테마, 현재 언어 등

  ```react
  // 컨텍스트는 데이터를 매번 컴포넌트를 통해 전달할 필요 없이 컴포넌트 트리로 곧바로 전달하게 해줍니다.
  // 여기에서는 현재 테마를 위한 `컨텍스트를 생성`하며, 기본값은 'light'입니다.
  const ThemeContext = React.createContext('light');
  
  // `Provider를 사용하여 하위 컴포넌트들에게 현재 테마 데이터를 전달`합니다. 
  // 모든 하위 컴포넌트들은 컴포넌트 트리 하단에 얼마나 깊이 있는지에 관계없이 데이터를 읽을 수 있습니다.
  // 여기에서는 현재 테마값으로 'dark'를 전달하고 있습니다.
  function App(props) {
      return (        
          <ThemeContext.Provider value="dark">
              <Toolbar />
          </ThemeContext.Provider>
      );
  }
  
  // 중간에 위치한 컴포넌트는 테마 데이터를 하위 컴포넌트로 전달할 필요가 없습니다.
  function Toolbar(props) {
      return (
          <div>
              <ThemeButton />
          </div>
      );    
  }
  
  function ThemedButton(props) {
      // 리액트는 가장 가까운 상위 테마 Provider를 찾아서 해당되는 값을 사용합니다.
      // 만약 해당되는 Provider가 없을 경우 기본값을 사용합니다.
      // 여기에서는 상위 Provider가 있기 때문에 현재 테마의 값은 'dark'가 됩니다.
      return (
          <ThemeContext.Consumer>
              {value => <Button theme={value} />}
          </ThemeContext.Consumer>
      );
  }
  ```

----------

   ## Context를 사용하기 전에 고려할 점

- Context를 사용하게 되면 컴포넌트의 재사용성이 떨어지게 된다. 따라서 하위 컴포넌트에서 똑같은 props를 반복 사용해야 하는 경우가 아니라면 props를 활용하는 것이 더욱 효과 적일 수 있다.

```react
// Page컴포넌트는 PageLayout컴포넌트를 렌더링
<Page user={user} avatarSize={avatarSize}/>

// PageLayout컴포넌트는 NavigationBar컴포넌트를 렌더링
<PageLayout user={user} avatarSize={avatarSize}/>

// NavigationBar컴포넌트를 Link컴포넌트를 렌덜이
<NavigationBar user={user} avatarSize={avatarSize}/>

// Link컴포넌트를 Avatar컴포넌트를 렌더링
<Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
</Link>
```

- 아바타 컴포넌트를 변수에 저장하여 직접 넘겨주는 방법, Element Variable

```react
function Page(props) {
    const user = props.user;
    
    const userLink = (
        <Link href={user.permalink}>
            <Avatar user={user} size={props.avatarSize} />
        </Link>
    );
    // Page 컴포넌트는 PageLayout 컴포넌트를 렌더링
    // 이때 props로 userLink를 함께 전달함.
    return <PageLayout userLink={userLink} />;
}

// PageLayout 컴포넌트는 NavigationBar 컴포넌트를 렌더링
<PageLayout userLink={...} />

// NavigationBar 컴포넌트는 props로 전달받은 userLink element를 리턴
<NavigationBar userLink={...} />
```

- 하위 컴포넌트를 여러개의 변수로 나눠서 전달

```react
function Page(props) {
    const user = props.user;
    
    const topBar = (
        <NavigationBar>
            <Link href={user.permalink}>
                <Avatar user={user} size={props.avatarSize}/>
            </Link>
        </NavigationBar>
    );
    const content = <Feed user={user} />;
    
    return (
        <PageLayout 
            topBar={topBar}
            content={content }
            />
    );
}
```

---------

## Context API

### createContext

- Context의 생성

```react
const Mycontext = React.createContext(기본값);
// 리액트에서 렌더링이 일어날 때, Context 객체를 구독하는 하위 컴포넌트가 나오면 현재 컨텍스트의 값을 가장 가까이에 있는 상위레벨의 Provider부터 받아온다. 이때 상위 레벨에 매칭되는 Provider가 없다면 기본값이 사용 됨! 
// 기본값으로 undefined를 넣으면 기본값이 사용되지 않음
```

### Context.Provider

- 하위컴포넌트들이 해당 컨텍스트를 받을 수 있도록 설정/ Provider 사용

```react
<MyContext.Provider value={/* some value */}
// value는 Provider 컴포넌트의 하위 컴포넌트에 전달 된다.
```

### Provider value에서 주의해야 할 사항

- Provider 컴포넌트가 재렌더링 될 때마다, 모든 하위 consumer 컴포넌트가 재렌더링 됨.

```react
function App(props) {
    return (
        <MyContext.Provider value={{ something: 'something' }}>
            <Toolbar />        
        </MyContext.Provider>            
    );
}
```

```react
// 재렌더링을 막기 위한 코드의 수정. state를 사용하여 불필요한 재렌더링을 막음.
// value를 직접 선언하는 것이 아니라 state를 선언하고 그 state의 값을 넣어준다.
function App(props) {
    const [value, setValue] = useState({ something: 'something' });
    
    return (
        <MyContext.Provider value={value}>
            <Toolbar />        
        </MyContext.Provider>
    );
}

```

### Class.contextType

- Provider 하위에 있는 Class컴포넌트에서 Context데이터에 접근하기 위해서 사용 하는 것. (최근에 Class 컴포넌트를 잘 사용하지 않음)

### Context.Consumer

- 함수 컴포넌트에서 Context 데이터에 접근하기 위해서 사용하는 것. 

```react
<MyContext.Consumer>
    {value => /* 컨텍스트의 값에 따라서 컴포넌트들을 렌더링 */}
</MyContext.Consumer>
```

### function as a child

- 컴포넌트의 자식으로 함수를 사용하는 방식

```react
// children이라는 prop을 직접 선언하는 방식
<Profile children={name => <p>이름: {name}</p>} />

// Profile컴포넌트로 감싸서 children으로 만드는 방식
<Profile>{name => <p>이름: {name}</p>}</Profile>
```

### display name

```react
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

//개발자 도구에 "MyDisplayName.Provider"로 표시됨
<MyContext.Provider/>

// 개발자 도구에 "MyDisplayName.Consumer"로 표시됨
<MyContext.Consumer/>
```

----------

## 여러개의 Context 사용하기

- Context.Provider를 중첩해서 사용한다.

--------

## useContext()

- 함수 컴포넌트에서 컨텍스트를 사용하기 위해 훅을 사용

```react
function Mycomponent(props) {
    const value = useContext(MyContext);
    
    return ( 
        ...
    );
}
```

```react
// 올바른 사용법 
useContext(MyContext);

// 잘못된 사용법
useContext(MyContext.Consumer);
useContext(MyContext.Provider);
```

