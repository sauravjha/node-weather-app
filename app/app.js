'use strict';

const chalk = require("chalk");

const request = require("request");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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


