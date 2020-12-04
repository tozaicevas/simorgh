import React, { useContext, useEffect, useState } from 'react';
import Brand from '@bbc/psammead-brand';
import { bool, node } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import styled from "@emotion/styled"
import PuffLoader from 'react-spinners/PuffLoader';

const BrandContainer = ({ skipLink, scriptLink, ...props }) => {
  const [currentPosition, setCurrentPosition] = useState()
  const [currentWeather, setCurrentWeather] = useState()
  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => setCurrentPosition(position.coords));
      } else { 
        console.error('this browser doesnt support geolocation')
      }
    }

    getLocation()
  }, [])

  useEffect(() => {
    const getWeather = async () => {
      if (currentPosition) {
        const {latitude, longitude} = currentPosition
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ed066f80b6580c11d8d0b2fb71691a2c`)
        const json = await response.json()

        setCurrentWeather(json)
      }
    }

    getWeather()
  }, [currentPosition])

  const {
    product,
    serviceLocalizedName,
    brandSVG,
    service,
    theming,
  } = useContext(ServiceContext);

  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;

  const BrandWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #B80000;
  `

  const WeatherIcon = styled.div`
    margin-right: 16px;
  `

  const getWeatherIcon = () => {
    const {weather} = currentWeather;
    const {icon} = weather[0];
    
    console.log(weather)
    return icon;
  }


  return (
    <BrandWrapper>
    <Brand
      backgroundColour={brandBackgroundColour}
      logoColour={brandLogoColour}
      product={product}
      serviceLocalisedName={serviceLocalizedName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={`/${service}`}
      skipLink={skipLink}
      scriptLink={scriptLink}
      {...props}
    />
    <WeatherIcon>
      {currentWeather ? <img src={`http://openweathermap.org/img/wn/${getWeatherIcon()}@2x.png`} height="40px"/> : <PuffLoader
          size={30}
          color={"#fff"}
        />}
    </WeatherIcon>
    
    </BrandWrapper>
  );
};

BrandContainer.propTypes = {
  borderTop: bool,
  borderBottom: bool,
  skipLink: node,
  scriptLink: node,
};

BrandContainer.defaultProps = {
  borderTop: false,
  borderBottom: false,
  skipLink: null,
  scriptLink: null,
};

export default BrandContainer;
