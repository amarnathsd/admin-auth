// src/LoginScreen.js
import React, { useState } from 'react';
// import { signInWithEmailAndPassword, auth } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (email === "amarnathdevshatwar07@gmail.com" && password === "Amar@123") {
        toast.success('Logged in successfully');
        navigate('/admin/users');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };
  

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Admin Login</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button onClick={handleLogin} variant="primary">Login</Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default LoginScreen;
