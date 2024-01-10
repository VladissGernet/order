import { initAddressClickHandler } from './init-address-click-handler.js';
import { getAddressCoordinates, addMainPinMarker } from './util.js';
import {
  COPYRIGHT,
  TILE_LAYER,
  ZOOM,
} from './constants.js';
import { initButtonCityClickHandler } from './init-button-city-click-handler.js';
import { createMarkers } from './create-markers.js';

const initMap = (mapElement, points, cities, container) => {
  const map = L.map('order-map', {
    center: getAddressCoordinates(points[0]),
    zoom: ZOOM
  });
  L.tileLayer(TILE_LAYER, { attribution: COPYRIGHT }).on('load', () => {
    mapElement.style.backgroundImage = 'none';
  }).addTo(map);
  const markerGroup = L.layerGroup().addTo(map);
  createMarkers(points, markerGroup);
  addMainPinMarker(getAddressCoordinates(points[0]), markerGroup);
  initButtonCityClickHandler(cities, markerGroup, map);
  initAddressClickHandler(container, markerGroup, map);
};

export { initMap };
