import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
        style={{ marginBottom: '10px' }}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        style={{ marginBottom: '10px' }}
      />
      <button
        style={{
          backgroundColor: '#876ffb',
          outline: 'none',
          border: 'none',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => handleLogin(username, password)}
      >
        Log in
      </button>
    </div>
  );
};

export default LoginPage;
