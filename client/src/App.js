import Login from "../src/pages/login/login";
import SignUp from "../src/pages/signup/signup";
import Home from "../src/pages/home/home";
import { Route, Routes } from "react-router-dom";
import RequireUser from "./components/RequireUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
