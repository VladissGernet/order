import {icon} from './constants.js';
import {addressContainer} from './elements.js';

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
      console.log(point.address);
      console.log(addressContainer.querySelector('input[value="point.address"]'))
      //остановился на создании переключателя адреса по клику на карте
      //сейчас просто выводится в консоль адрес точки по которой кликнули
    });
    marker.addTo(layer);
  }
};

export {createMarkers};
