import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConferences } from '../redux/conferenceSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminConferences = () => {
  const dispatch = useDispatch();
  const conferences = useSelector((state) => state.conferences.list);

  useEffect(() => {
    dispatch(fetchConferences());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4555/conference`, {
        data: { id }
      });
      dispatch(fetchConferences());
    } catch (error) {
      console.error('Error deleting conference:', error);
    }
  };

  return (
    <div>
      <h1>Manage Conferences</h1>
      <Link to="/admin/conference/create">Create Conference</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {conferences.map((conference) => (
            <tr key={conference.id}>
              <td>{conference.title}</td>
              <td>{conference.date}</td>
              <td>
                <Link to={`/admin/conference/edit/${conference.id}`}>Edit</Link>
                <button onClick={() => handleDelete(conference.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminConferences;
