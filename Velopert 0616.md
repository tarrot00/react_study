## Velopert 0616

-----

[toc]

---------

### Lifecycle API

- Mounting: 컴포넌트가 브라우저상에 나타날 때, 

  - **constructor**: state의 등의  초기 설정, 컴포넌트가 만들어지는 과정에서 미리 해야하는 작업이 있을 때
  - **getDerivedStateFromProps**: props로 받은 값을 state에 동결 시키고 싶을 때
  - **render**: 어떤 DOM을 만들 것인지, 그리고 내부에 어떤 tag들에 어떤 값을 전달 해 줄 것인지 정의해 줄 때
  - **componentDidMount**: 외부 라이브러리 연동(D3, masonry), 컴포넌트에서 필요한 데이터 요청(Ajax, GraphQL), DOM에 관련대 작업(스크롤 설정, 크기 읽어오기 등)

- Updating: 컴포넌트의 props 나 state 가 바뀌었을때

  - **shouldComponentUpdate**: `특정 조건에 따라 렌더링을 막아 줄 수 있는 함수.`쓸데 없이 낭비되고 있는 CPU 처리량을 줄여주기 위해서 Virtual DOM에 리렌더링 하는 것도 방지하기 위해서 작성, 기본적으로 true를 반환하지만 조건에 따라 false를 반환하면 해당 조건에는 render함수를 호출하지 않음. 

  - **getSnapshotBeforeUpdate()**: 렌더링한 결과물이 브라우저 상에 반영되기 직전 호출되어서 업데이트 하기 전에 스크롤의 위치, 해당 DOM의 크기를 사전에 가져오는 작업을 할 때 사용

  - ```js
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // DOM 업데이트가 일어나기 직전의 시점입니다.
        // 새 데이터가 상단에 추가되어도 스크롤바를 유지해보겠습니다.
        // scrollHeight 는 전 후를 비교해서 스크롤 위치를 설정하기 위함이고,
        // scrollTop 은, 이 기능이 크롬에 이미 구현이 되어있는데,
        // 이미 구현이 되어있다면 처리하지 않도록 하기 위함입니다.
        if (prevState.array !== this.state.array) {
          const { scrollTop, scrollHeight } = this.list;
    
          // 여기서 반환 하는 값은 componentDidMount 에서 snapshot 값으로 받아올 수 있습니다.
          return {
            scrollTop,
            scrollHeight
          };
        }
      }
      // 위에서 받아온 scrollTop과 scrollHeigth 값을 3번째 파라미터인 snapshot 으로 받아와서 
      // 새로운 데이터가 생성 되어도 지금 스크롤 위치를 유지하도록 설정 해 줄 수 있다. 
      componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
          const { scrollTop } = this.list;
          if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 구현되어있다면 처리하지 않습니다.
          const diff = this.list.scrollHeight - snapshot.scrollHeight;
          this.list.scrollTop += diff;
        }
      }
    ```

  - **componentDidUpdate**:  컴포넌트에서 render() 를 호출하고난 다음에 발생하게 됩니다. state가 바뀌었을 때 이전의 상태와 현재의 상태가 다를 때 특정 작업을 하도록 설정 가능

  - ```js
     componentDidUpdate(prevProps, prevState) {
        if (this.props.value !== prevProps.value) {
          console.log('value 값이 바뀌었다!', this.props.value);
        }
      }
    ```

- Unmounting : 컴포넌트가 브라우저 상에서 사라질 때, 리스너를 없에 주는 설정을 하면 된다.

- componentDidCatch: 에러가 발생 할 수 있는 부모 컴포넌트에서, 에러값과 인포를 받아온다. 에러: 어떤 에러가 발생 하였는가, 인포: 왜 이러한 에러가 발생 하였는가를 알려준다. 실수로 잡지 못했던 버그를 잡을 때 사용한다. 

---------

