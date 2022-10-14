import React from "react";
import { Router } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
  
        <Route path="/">
          <Home/>
        </Route>
        <Route path="/movie">
          <Detail/>
        </Route>
  
    </Router>
  );
  
}

export default App;
