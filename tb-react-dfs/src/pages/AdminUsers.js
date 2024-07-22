import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserRole, deleteUser, addUser } from '../redux/userSlice';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.list);
  const [newUser, setNewUser] = useState({ id: '', password: '', type: 'user' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (id, newType) => {
    dispatch(updateUserRole(id, newType));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(addUser(newUser));
    setNewUser({ id: '', password: '', type: 'user' });
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="id"
          value={newUser.id}
          onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
          placeholder="User ID"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
          required
        />
        <select
          name="type"
          value={newUser.type}
          onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <select
                  value={user.type}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
