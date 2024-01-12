import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_WEATHER_AND_LAUNCHES } from '../apollo/queries';
import { useAuth } from '../context/AuthContext';
import { Launch, WeatherResponse } from '../interfaces';

const MainPage = () => {
  const { handleLogout } = useAuth();

  const { data = [], loading, error } = useQuery(FETCH_WEATHER_AND_LAUNCHES);
  const { getLast30Launches = [], getWeatherBatch = [] } = data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div style={{ padding: '0px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Weather and SpaceX Launch Data</h1>
        <button
          style={{
            backgroundColor: '#876ffb',
            outline: 'none',
            border: 'none',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
            height: '30px',
          }}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h2>Weather Data</h2>
          {getWeatherBatch?.length &&
            getWeatherBatch.map(
              (weatherData: WeatherResponse, index: number) => (
                <div key={index}>
                  <h3>
                    {weatherData.name} (Country: {weatherData.sys.country})
                  </h3>
                  <p>Temperature: {weatherData.main.temp}°C</p>
                  <p>Feels Like: {weatherData.main.feels_like}°C</p>
                  <p>
                    Weather: {weatherData.weather.map((w) => w.main).join(', ')}
                  </p>
                  <p>
                    Description:{' '}
                    {weatherData.weather.map((w) => w.description).join(', ')}
                  </p>
                </div>
              )
            )}
        </div>
        <div style={{ flex: 1 }}>
          <h2>SpaceX Launch Data</h2>
          {getLast30Launches?.length &&
            getLast30Launches.map((launch: Launch, index: number) => (
              <div key={index}>
                <h3>Mission Name: {launch.mission_name}</h3>
                <p>Mission ID: {launch.mission_id.join(', ')}</p>
                <p>Details: {launch.details}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
