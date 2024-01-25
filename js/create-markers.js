import { icon } from './constants.js';
import { pickUpAddressContainer } from './elements.js';

const createMarkers = (points, layer) => {
  for (const point of points) {
    const lat = point.coordinates[0];
    const lng = point.coordinates[1];
    const marker = L.marker(
      {
        lat,
        lng
      },
      {
        icon,
        title: point.address,
      });
    marker.on('click', () => {
      pickUpAddressContainer.querySelector(`input[value="${point.address}"]`).click();
    });
    marker.addTo(layer);
  }
};

export { createMarkers };
