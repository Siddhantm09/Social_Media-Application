import Login from "../src/pages/login/login";
import SignUp from "../src/pages/signup/signup";
import Home from "../src/pages/home/home";
import { Route, Routes } from "react-router-dom";
import RequireUser from "./components/RequireUser";
import Feed from './components/feed/Feed'
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />} >
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
