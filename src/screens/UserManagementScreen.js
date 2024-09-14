// src/UserManagementScreen.js
import React, { useState, useEffect } from 'react';
import { firestore, collection, addDoc, deleteDoc, doc, getDocs } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const UserManagementScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [users, setUsers] = useState([]);

  const handleAddUser = async () => {
    try {
      if (name && email && mobile) {
        await addDoc(collection(firestore, 'Users'), { name, email, mobile });
        toast.success('User added successfully');
        setName('');
        setEmail('');
        setMobile('');
        loadUsers();
      }
    } catch (error) {
      toast.error('Error adding user');
    }
  };

  const loadUsers = async () => {
    const usersCollection = collection(firestore, 'Users');
    const userDocs = await getDocs(usersCollection);
    const userList = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(firestore, 'Users', userId));
      toast.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Manage Users</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </Form.Group>
            <Button onClick={handleAddUser} variant="success">Add User</Button>
          </Form>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name} ({user.email}) - {user.mobile}
                <Button onClick={() => handleDeleteUser(user.id)} variant="danger" className="ms-2">Delete</Button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default UserManagementScreen;
