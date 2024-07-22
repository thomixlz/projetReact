import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { fetchConferences } from '../redux/conferenceSlice';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker'; 

// On utilise Faker qui génère des données aléatoire.

const generateFakeConference = () => ({
  id: uuidv4(),
  title: faker.company.catchPhrase(),
  date: faker.date.future().toISOString().split('T')[0], 
  createdAt: new Date().toISOString(),
  description: faker.lorem.paragraph(),
  img: faker.image.url(),
  content: faker.lorem.paragraphs(),
  duration: `${faker.number.int({ min: 1, max: 5 })} hours`,
  osMap: {
    addressl1: faker.location.streetAddress(),
    addressl2: faker.location.secondaryAddress(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    coordinates: [faker.location.latitude(), faker.location.longitude()],
  },
  speakers: [
    {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  ],
  stakeholders: [
    {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      job: faker.person.jobTitle(),
      img: faker.image.avatar(),
    },
  ],
  design: {
    mainColor: faker.color.human(),
    secondColor: faker.color.human(),
  },
});

const CreateConference = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const conferenceData = generateFakeConference();
      console.log('Conference Data:', conferenceData); 

      await axios.post('http://localhost:4555/conference', { conference: conferenceData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchConferences());
      history.push('/admin/conferences');
    } catch (error) {
      console.error('Error creating conference:', error);
    }
  };

  return (
    <div>
      <h1>Create Conference</h1>
      <button onClick={handleSubmit}>Create Fake Conference</button>
    </div>
  );
};

export default CreateConference;
