import { useState, useEffect } from "react";
import styled from "styled-components";

const BREAKPOINTS = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const WeatherTimeContainer = styled.div`
  padding: 4px 20px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  color: #ff6d4d;
  font-size: 0.8rem;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 0.7rem;
    gap: 10px;
    padding: 4px 15px;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    font-size: 0.6rem;
    padding: 4px 10px;
    gap: 8px;
  }
`;

const InfoText = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const WeatherTime = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(null);

  const VALENCIA_LAT = 39.4699;
  const VALENCIA_LON = -0.3763;

  useEffect(() => {
    const getWeather = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${VALENCIA_LAT}&longitude=${VALENCIA_LON}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData.current_weather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    getWeather();
    const weatherInterval = setInterval(getWeather, 1800000);
    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    const getTime = async () => {
      try {
        const timeResponse = await fetch(
          "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Madrid"
        );
        const timeData = await timeResponse.json();
        setTime(timeData);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    getTime();
    const timeInterval = setInterval(getTime, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <WeatherTimeContainer>
      <InfoText>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        {weather && `Valencia: ${weather.temperature}°C`}
      </InfoText>

      <InfoText>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {time && formatDate(time.dateTime)}
      </InfoText>

      <InfoText>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {time &&
          new Date(time.dateTime).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
      </InfoText>
    </WeatherTimeContainer>
  );
};

export default WeatherTime;
