import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConferences } from '../redux/conferenceSlice';
import { Link } from 'react-router-dom';

const ConferenceList = () => {
  const dispatch = useDispatch();
  const conferences = useSelector((state) => state.conferences.list);

  useEffect(() => {
    dispatch(fetchConferences());
  }, [dispatch]);

  return (
    <div>
      {conferences.map((conference) => (
        <div key={conference.id} style={{ backgroundColor: conference.design.mainColor }}>
          <h2>{conference.title}</h2>
          <Link to={`/conference/${conference.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ConferenceList;
