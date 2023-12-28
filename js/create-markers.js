import {icon} from './constants.js';

const createMarkers = (points, layer) => {
  for (const point of points) {
    const lat = point.coordinates[0];
    const lng = point.coordinates[1];
    const marker = L.marker({lat, lng}, {icon});
    marker.addTo(layer);
  }
};

export {createMarkers};
