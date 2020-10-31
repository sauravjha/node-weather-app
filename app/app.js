'use strict';

const chalk = require("chalk");

const request = require("request");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// const url = "http://api.weatherstack.com/current?access_key=e6ffb9a32a68e38475971a2c74b72021&query=Melbourne"

// request({url: url, json: true}, (error, response) =>{
//   if(!error) {
//     if(!response.body.error) {
//       console.log(response.statusCode)
//       const temperature = response.body.current.temperature
//       const feelslike  = response.body.current.feelslike
//       const rain  = response.body.current.precip
//       const weather_description = response.body.current.weather_descriptions[0]
//       console.log(weather_description + ". It is currently ", temperature, "degree out. Feels like", feelslike,"degree out.")
//       console.log(weather_description + ". It is currently ", temperature, "degree out. There is", rain,"% chances of rain")
//     } else {
//       console.log(chalk.red("Some issue with the request url"))
//     }
//   } else {
//     console.log("Unable to connect to the weatherstack")
//   }
// })


// const geoLocation = "https://api.mapbox.com/geocoding/v5/mapbox.places/unit 2, 127 kitchener Street Broadmedows.json?access_token=pk.eyJ1Ijoic2F1cmF2amhhMjQiLCJhIjoiY2tneGYzMWhzMGJtcTJycnNyNnprN2g4dSJ9.jQvfZP5ATORRMRMMxSD0cg"

// request({url: geoLocation, json: true}, (error, response) =>{
//   if(!error) {
//     if(!response.body.error){
//       const longitudeLatitude = response.body.features[0].geometry.coordinates
//       console.log(longitudeLatitude[0], longitudeLatitude[1])
//     } else {
//       console.log(chalk.red("Some issue with the request url"))
//     }
//   } else {
//     console.log(chalk.red("Unable to connect map box"))
//   }
// })

var address = process.argv[2]

if (!address) {
  console.log("Please provide the address")
} else {
  geocode(address, (error, geoData)=> {
    if(error) {
      return console.log(chalk.red(error))
    }
    forecast(geoData.latitude, geoData.logitude, (error, forcastData) => {
      if(error) {
        return console.log(chalk.red(error))
      }
      const {latitude, logitude,  location, idontExists = "my home"} = geoData
      console.log(location)
      console.log(idontExists)
      console.log(forcastData)
    })
  })
}


