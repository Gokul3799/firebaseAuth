import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [err, setErr] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setErr("");
      setMessage('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check ur email for the password reset');
    } catch {
      setErr("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button type="submit" className="w-100 mt-4" disabled={isLoading}>
            Reset Password
          </Button>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Log In</Link>
          </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
