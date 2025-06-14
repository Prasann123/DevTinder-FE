import Navbar from "./navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./body";
import Login from "./Login";
import Profile from "./profile";
import Feed from "./feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./connections";
import ConnectionRequests from "./ConnectionRequests";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/ConnectionRequests" element={<ConnectionRequests/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
