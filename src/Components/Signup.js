import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import {Link} from 'react-router-dom'

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();
  const { signUp } = useAuth();
  const [err, setErr] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (passwordRef.current.value !== confPasswordRef.current.value) {
      return setErr("Passwords do not match");
    }
    try {
      setErr("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch {
      setErr("Failed to create a acc");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required autoComplete="off"/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required autoComplete="off"/>
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control type="password" ref={confPasswordRef} required autoComplete="off"/>
            </Form.Group>
            <Button type="submit" className="w-100 mt-4" disabled={isLoading}>
            Sign Up
          </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have a account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
