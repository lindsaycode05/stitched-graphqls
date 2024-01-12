/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
// This test ensures the MainPage renders and functions correctly
import React from 'react';
import { render } from '@testing-library/react';
import MainPage from '../pages/MainPage';
import { MockedProvider } from '@apollo/client/testing';
import { FETCH_WEATHER_AND_LAUNCHES } from '../apollo/queries';
import '@testing-library/jest-dom';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const mocks = [
  {
    request: {
      query: FETCH_WEATHER_AND_LAUNCHES,
    },
    result: {
      data: {
        getWeatherBatch: [
          {
            weather: [{ id: 800, main: 'Clear', description: 'clear sky' }],
            main: {
              temp: 20,
              feels_like: 21,
            },
            sys: {
              country: 'US',
            },
            name: 'Los Angeles',
          },
        ],
        getLast30Launches: [
          {
            mission_id: ['1'],
            mission_name: 'Falcon 9 Test Flight',
            details: 'Test flight of Falcon 9',
          },
        ],
      },
    },
  },
];

describe('MainPage', () => {
  it('renders weather and SpaceX launch data', async () => {
    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <AuthProvider>
            <MainPage />
          </AuthProvider>
        </Router>
      </MockedProvider>
    );

    // Waiting for specific elements to appear after data is fetched
    expect(await findByText('Weather Data')).toBeInTheDocument();
    expect(await findByText(/Los Angeles/)).toBeInTheDocument();
    expect(await findByText(/20°C/)).toBeInTheDocument();
    expect(await findByText(/clear sky/)).toBeInTheDocument();

    expect(await findByText('SpaceX Launch Data')).toBeInTheDocument();
    expect(await findByText(/Falcon 9 Test Flight/)).toBeInTheDocument();
  });
});
