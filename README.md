# sygic-maps-services-js
[![Build](https://travis-ci.org/Sygic/sygic-maps-services-js.svg?branch=master)](https://travis-ci.org/Sygic/sygic-maps-services-js)
[![Version](https://img.shields.io/npm/v/sygic-maps-services.svg)](http://npm.im/sygic-maps-services)
[![Downloads](https://img.shields.io/npm/dm/sygic-maps-services.svg)](http://npm-stat.com/charts.html?package=sygic-maps-services&from=2018-03-01)
[![MIT License](https://img.shields.io/npm/l/sygic-maps-services.svg)](http://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/badge/%F0%9F%9A%80-semantic--release-yellow.svg)](https://github.com/semantic-release/semantic-release)

The Sygic Maps API for JavaScript is a set of programming interfaces that enable developers to build Web applications with feature rich, interactive Sygic Maps at their center.

## Installation

This package is distributed via npm:

```
npm install sygic-maps-services
```

## Usage

[Request Sygic Maps API key](https://www.sygic.com/business/request-sygic-maps-trial-api-key)

```javascript
var sygicMapsServices = require("sygic-maps-services");

var mapServices = sygicMapsServices.create({
  key: 'apikey'
});

mapServices.geocode({
  country: 'Deutschland',
  city: 'Berlin',
  street: 'Bernauer Strasse',
  house_number: '12',
  zip: '13355',
  admin_level_1: 'Berlin'
}, (error, response) => {
  //console.log(response);
  //console.log(error);
});
```

## Introduction

Online Maps and Directions, Geocoding, Search and route Optimization APIs for web development of Enterprise solutions.

- Here, TomTom, OSM & local maps and data under one roof
- Easy to integrate – intuitive maps APIs and outstanding support
- Commercial routing & optimization algorithm for Truck, Emergency, Bus, Van, Taxi used by +750k professional drivers worldwide
- Single source of map data and routing on web and on mobile device
- Transparent pricing per asset

Maps API
Embed raster map tiles or fast vector maps with any information and graphics using Custom Layers.
[Maps API](http://www.sygic.com/developers/maps-api-services/javascript-map-api)

Geocoding & Search API
Find places and addresses, convert them to geo-coordinates, or just see suggestions as you type using Autocomplete.
[Geocoding API](http://www.sygic.com/developers/maps-api-services/geolocation-and-search-api) | [Search API](http://www.sygic.com/developers/maps-api-services/search-api)

Routing API
Pedestrian, car, RV, bus, delivery van, or truck routing algorithms used by more than 150 million drivers worldwide.
[Routing API](http://www.sygic.com/developers/maps-api-services/routing-api)

Route Optimization API
Multi-vehicle and multi-stop sequence optimization using various restrictions and attributes.
[Optimization API](http://www.sygic.com/developers/maps-api-services/optimization-api)

## Support

Sygic provides professional technical support to developers and software vendors integrating our navigation with the SDK.

Sygic offers professional customer project management support and a team of highly skilled developers able to provide custom solutions and features.

[Sygic Maps](http://www.sygic.com/developers/products/sygic-maps-api)