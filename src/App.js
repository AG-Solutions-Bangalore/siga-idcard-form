import React from "react";
import { BrowserRouter as Router, Route,Routes, 
} from "react-router-dom";

import Register from "../src/components/register/index";
import Thankyou from "./components/register/thankyou";

function App() {
  return (
    <Router basename="/idcard">
      <Routes>
      <Route exact path="/" element={ <Register/> } />
      <Route path="/register" element={ <Register/> } />
      <Route path="/thankyou" element={<Thankyou/>}/>
      </Routes>
    </Router>
  );
}

export default App;
