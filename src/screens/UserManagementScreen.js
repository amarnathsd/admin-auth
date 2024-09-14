// src/UserManagementScreen.js
import React, { useState, useEffect } from "react";
import {
  firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagementScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [users, setUsers] = useState([]);

  const handleAddUser = async () => {
    try {
      if (name && email && mobile) {
        await addDoc(collection(firestore, "Users"), { name, email, mobile });
        toast.success("User added successfully");
        setName("");
        setEmail("");
        setMobile("");
        loadUsers();
      }
    } catch (error) {
      toast.error("Error adding user");
    }
  };

  const loadUsers = async () => {
    const usersCollection = collection(firestore, "Users");
    const userDocs = await getDocs(usersCollection);
    const userList = userDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(firestore, "Users", userId));
      toast.success("User deleted successfully");
      loadUsers();
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="user-manage-screen">
      <div className=" ">
        <div className="d-flex justify-content-center">
          <div className="user-form mt-4">
            <h2>Manage Users</h2>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="form-control"
                />
              </div>
              <button
                type="button"
                onClick={handleAddUser}
                className="btn btn-success"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.mobile}
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="btn btn-danger ms-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserManagementScreen;
