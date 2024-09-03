import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers } from '../features/users/usersSlice';
import '../App.css'; // Import the CSS for styling

 export const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status } = useSelector((state: RootState) => state.users);

  const [filters, setFilters] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredUsers = users.filter(user =>
    Object.keys(filters).every(key =>
      user[key as keyof typeof filters]
        .toLowerCase()
        .includes(filters[key as keyof typeof filters].toLowerCase())
    )
  );

  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="search-bar">
        <input
          name="name"
          placeholder="Filter by name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          name="username"
          placeholder="Filter by username"
          value={filters.username}
          onChange={handleFilterChange}
        />
        <input
          name="email"
          placeholder="Filter by email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          name="phone"
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={handleFilterChange}
        />
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching data</p>}
      {status === 'succeeded' && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

