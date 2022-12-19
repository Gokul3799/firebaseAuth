import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import { AppProvider } from "../Contexts/AppContext";
import TodoDashboard from "./TodoDashboard";

const Dashboard = () => {
  const [err, setErr] = useState();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    setErr("");
    try {
      await logout();
    } catch (error) {
      setErr("Failed to logout");
    }
  };
  return (
   <AppProvider>
     <>
      <Card className="mt-2">
        <Card.Body>
          {err && <Alert variant="danger">{err}</Alert>}
          <strong className="text-center w-100 ">
            {currentUser && `Email: ${currentUser.email}`}
          </strong>
          <Link to="/updateProfile" className="btn btn-primary w-100 mt-2">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
    <TodoDashboard/>
   </AppProvider>
  );
};

export default Dashboard;
