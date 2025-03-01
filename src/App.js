import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import AddPassword from "./pages/appPassword";
import PrivateKey from "./pages/privateKey";
import Signin from "./pages/signin";
import SignUp from "./pages/signup";
import AllPasswords from "./pages/allPassword";
import { useEffect, useState } from "react";
import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  useEffect(() => {
    setAccessToken(sessionStorage.getItem("access"));
  }, []);
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route exact path="/" element={<a />} />
          <Route
            path="/signin"
            element={<Signin setAccessToken={setAccessToken} />}
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setAccessToken={setAccessToken}
                setPrivateKey={setPrivateKey}
              />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/privateKey"
            element={
              <ProtectedRoute>
                <PrivateKey
                  setPrivateKey={setPrivateKey}
                  privateKey={privateKey}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addPassword"
            element={
              <ProtectedRoute>
                <AddPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allPasswords"
            element={
              <ProtectedRoute>
                <AllPasswords privateKey={privateKey} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
