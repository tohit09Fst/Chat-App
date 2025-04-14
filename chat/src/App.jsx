
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Join from "./component/Join";
import Chat from "./component/Chat";




function App() {
  return (
    <Router>
 <Routes>
      <Route path="/"  element={<Join/>}/> 
      <Route path="/chat"  element={<Chat/>}/>

      </Routes>

    </Router>

  );
}

export default App;
