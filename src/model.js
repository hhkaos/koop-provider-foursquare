/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: https://koopjs.github.io/docs/usage/provider
*/

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
const config = require('../config/default.json')["koop-provider-foursquare"];
const request = require('request').defaults({gzip: true, json: true});

Model.prototype.getData = function (req, callback) {

  const geojson = {
    type: 'FeatureCollection',
    features: []
  }

  const [nearParam, categoryId] = req.params.host.split("::");

  let   endpoint = `https://api.foursquare.com/v2/venues/search?near=${nearParam}`;
        endpoint += `&v=${config.v}`;
        endpoint += `&client_id=${config.client_id}`;
        endpoint += `&client_secret=${config.client_secret}`;
        endpoint += `&limit=${config.limit}`;

  if(categoryId){
      endpoint += `&categoryId=${categoryId}`;
  }

  request(`${endpoint}`, (err, res, body) => {
      if (err) return callback(err)


      // translate the response into geojson
      let geojson = translate(body)

      // Optional: cache data for 10 seconds at a time by setting the ttl or "Time to Live"
      geojson.ttl = 600

      geojson.metadata = {
          title: `Venues from ${nearParam} by Foursquare`,
          name: `Venues from ${nearParam}`,
          idField: 'OBJECTID',
          description: `Generated from ${endpoint}`,
      }

      callback(null, geojson)
  });
}

function translate(input) {
    return {
        type: 'FeatureCollection',
        features: input.response.venues.map((elem, i) => formatFeature(elem, i))
    }
}

function formatFeature(inputFeature, i) {
    let categories = '';

    inputFeature.categories.forEach(cat => categories += `${cat.name}, `);

    const feature = {
      type: 'Feature',
      properties: {
         OBJECTID: i+1,
         id: inputFeature.id,
         name: inputFeature.name,
         postalCode: inputFeature.location.postalCode,
         city: inputFeature.location.city,
         state: inputFeature.location.state,
         country: inputFeature.location.country,
         category: categories
      },
      geometry: {
        type: 'Point',
        coordinates: [inputFeature.location.lng, inputFeature.location.lat]
      }
    }
    return feature;
}

module.exports = Model
