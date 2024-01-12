import { ReactNode } from 'react';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
}

interface Sys {
  country: string;
}

interface WeatherResponse {
  weather: WeatherCondition[];
  main: MainWeather;
  sys: Sys;
  name: string;
  cod: number;
}

interface Launch {
  mission_name: string;
  mission_id: [string];
  details: string;
}

export type {
  Launch,
  WeatherResponse,
  Sys,
  MainWeather,
  WeatherCondition,
  AuthProviderProps,
  AuthContextType,
  ProtectedRouteProps,
};
