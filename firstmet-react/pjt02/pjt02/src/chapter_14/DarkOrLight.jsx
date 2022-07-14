import { useState, useCallback } from "react";
import ThemeContext from "./ThemeContext";
import MainContent from "./MainContent";

function DarkOrLight(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    if (theme == "light") {
      setTheme("dark");
    } else if (theme == "dark") {
      setTheme("light");
    }
  }, [theme]);

  return (
    //메인 컴포넌트를 테마 컨텍스트 프로바이더로 감싸서 테마 컨텍스트를 하위 컴포넌트가 사용할 수 있도록 해준다.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MainContent/>
    </ThemeContext.Provider>
  );
}

export default DarkOrLight;