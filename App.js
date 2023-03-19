import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';

const API_KEY = 'API_KEY';

const img = require('./assets/image.png')

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
    
        let {latitude, longtitude} = success.coords;
        fetchDataFromApi(latitude, longtitude)

    }, (err) => {
      if(err) {
        fetchDataFromApi("43.6532", "-79.3832")
      }
    })
  }, [])

  const fetchDataFromApi = (latitude, longtitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setData(data)
          })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex:1, 
    resizeMode: "cover", 
    justifyContent: "center"
  }
});
