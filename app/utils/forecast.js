'use strict';
const request = require("request");

const forecast = (latitude, logitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e6ffb9a32a68e38475971a2c74b72021&query=' + latitude +', ' + logitude +''
    request({url: url, json: true}, (error, {body}) =>{
      if(!error) {
        if(!body.error) {
            const temperature = body.current.temperature
          callback(undefined, {
            temperature,
            feelslike: body.current.feelslike,
            rain: body.current.precip,
            weather_description: body.current.weather_descriptions[0]
          })
        } else {
          callback("Some issue with the request url", undefined)
          console.log(chalk.red("Some issue with the request url"))
        }
      } else {
        callback("Unable to connect to the weatherstack", undefined)
      }
    })
  }

  module.exports = forecast