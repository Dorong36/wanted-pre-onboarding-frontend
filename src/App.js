import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Signin from "./components/SignIn";
import Signup from "./components/Signup";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/todos" element={<Todos/>}/>
      </Routes>
    </div>
  );
}

export default App;
