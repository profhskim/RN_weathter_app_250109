import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, {useState, useEffect, useSyncExternalStore} from 'react'
import {Dimensions} from 'react-native';
import * as Location from 'expo-location';
import {GOOGLE_GEOLOCATION_API_KEY} from '@env';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = ()=>{

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city,setCity] = useState(null);

  // 허가여부
  const [permitted, setPermitted] = useState(true);

  const locationData = async ()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    // console.log(granted);
    if (!granted) {
      setPermitted(false);
      setErrorMsg('위치에 대한 권한 부여가 거부되었습니다.');

      return;
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
  
    const myApiKey = GOOGLE_GEOLOCATION_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myApiKey}`
   
    const response = await fetch(apiUrl);
    const data = await response.json();
    /*
    console.log(data);
    console.log(data.results[7].formatted_address)

    console.log(address)
    console.log(address[0].city)
    */
    const cityAddress = data.results[7].formatted_address;
    setCity(cityAddress);
  }

  useEffect(() => {
    locationData();
  }, []); 

  return (
    <View style={styles.container}>
      <View style={styles.cityCon}>
        <Text style={styles.city}>{city}</Text>
      </View>

      <View style={styles.regDateCon}>
        <Text style={styles.regDate}>1월 9일, 목, 15:51</Text>
      </View>
   
      <ScrollView 
        horizontal 
        pagingEnabled 
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator = {false}
      >
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempCon}>
            <Text style={styles.temp}>-9도</Text>
          </View>
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempCon}>
            <Text style={styles.temp}>-9도</Text>
          </View>
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempCon}>
            <Text style={styles.temp}>-9도</Text>
          </View>
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempCon}>
            <Text style={styles.temp}>-9도</Text>
          </View>
        </View>
      </ScrollView>
       <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#f0e924"
  },
  cityCon: {
    flex:0.4,
  },
  city:{
    flex:1,
    marginTop:50,
    paddingTop:20,
    fontSize: 40,
    textAlign:"center",
    fontWeight:"bold",
  },
  regDateCon: {
    alignItems:"center",
  },
  regDate: {
    paddingTop:10,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:15,
    backgroundColor:"black",
    color:"white" ,
    fontWeight:"bold",
    borderRadius:20,
    overflow: "hidden",
  },

  weather: {
    alignItems:"center",
  },
  weatherInner:{
    //flex:3,
    width:SCREEN_WIDTH,
  },
  day: {
    flex:0.2,
    alignItems:"center",
    justifyContent: "center",
   },
 
  desc: {
    flex:1.5,
    marginTop:20,
    fontSize:25,
    fontWeight:"bold",
  },
  tempCon: {
    flex:0.3,
    alignItems:"center",
    justifyContent:"center",
  },
  temp:{
    fontSize:120,
  }
});

export default App;
