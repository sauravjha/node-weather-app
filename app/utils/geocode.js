'use strict';
const request = require("request");

const gecode = (address, callback) => {
    const geoLocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F1cmF2amhhMjQiLCJhIjoiY2tneGYzMWhzMGJtcTJycnNyNnprN2g4dSJ9.jQvfZP5ATORRMRMMxSD0cg'
    request({url: geoLocation, json: true}, (error, response) => {
      if(!error) {
        if(!response.body.error){
          callback( undefined, {
            latitude: response.body.features[0].geometry.coordinates[1],
            logitude: response.body.features[0].geometry.coordinates[0],
            location: response.body.features[0].place_name
          })
        } else {
          callback("Some issue with the request url", undefined)
        }
      } else {
        callback("Unable to connect map box", undefined)
      }
    })
  }

  module.exports = gecode