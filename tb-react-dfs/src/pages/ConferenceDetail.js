import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConferenceDetail } from '../redux/conferenceSlice';
import { useParams } from 'react-router-dom';

const ConferenceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const conference = useSelector((state) => state.conferences.conferenceDetail);

  useEffect(() => {
    dispatch(fetchConferenceDetail(id));
  }, [dispatch, id]);

  return (
    <div style={{ backgroundColor: conference.design.mainColor }}>
      <h1>{conference.title}</h1>
      <p>{conference.description}</p>
      {/* Afficher plus de détails ici */}
    </div>
  );
};

export default ConferenceDetail;
