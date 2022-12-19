import React from "react";
import "../index.css";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../Contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="updateProfile" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
              <Route path="forgotPassword" element={<ForgotPassword />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
