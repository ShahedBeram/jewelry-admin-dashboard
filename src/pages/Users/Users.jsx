import React, { useState, useEffect } from 'react';
import './Users.css';

const Users = ({ onLogin }) => {
  const initialUsers = [
    { id: 1, name: "Malak", email: "malak@example.com", role: "Admin" },
    { id: 2, name: "Sara", email: "sara@example.com", role: "User" },
    { id: 3, name: "Ahmed", email: "ahmed@example.com", role: "User" },
  ];

  const [users, setUsers] = useState(() => {
    const saved = sessionStorage.getItem('allUsers');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  useEffect(() => {
    sessionStorage.setItem('allUsers', JSON.stringify(users));
  }, [users]);

  const toggleRole = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        const newRole = user.role === 'Admin' ? 'User' : 'Admin';
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  
  const loginAs = (user) => {
  
    sessionStorage.setItem('userName', user.name);
  
    sessionStorage.setItem('userRole', user.role.toLowerCase());

    sessionStorage.removeItem('sessionProducts');

    onLogin(user); 
 
    alert(`Logged in as: ${user.name} (${user.role})`);
    
    window.location.href = '/products'; 
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Users Management 👤</h1>
        <p>Manage permissions and switch between accounts for testing.</p>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <strong>{user.name}</strong>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button 
                    className="change-btn" 
                    onClick={() => toggleRole(user.id)}
                    title="Change User Permission"
                  >
                    Toggle Role
                  </button>
                  <button 
                    className="login-btn" 
                    onClick={() => loginAs(user)}
                    title="Login as this user"
                    style={{ backgroundColor: '#2c3e50', color: 'white' }}
                  >
                    Login
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;