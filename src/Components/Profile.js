import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom'

const Profile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [err, setErr] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (passwordRef.current.value !== confPasswordRef.current.value) {
      return setErr("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setErr('');
    if(currentUser.email !== emailRef.current.value){
        promises.push(updateEmail(emailRef.current.value));
    }
    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises).then(()=>{
        navigate("/")
    }).catch(()=>{
        setErr('Update failed...')
    }).finally(()=>{
        setLoading(false);
    })
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required autoComplete="off" defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} autoComplete="off" placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control type="password" ref={confPasswordRef} autoComplete="off" placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Button type="submit" className="w-100 mt-4" disabled={isLoading}>
            Update
          </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
         <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default Profile;
