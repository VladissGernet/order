const receivingMethod = {
  delivery: 'delivery',
  pickUp: 'pickup',
};
const defaultCitySelection = 'Санкт-Петербург';
const defaultAddressSelection = 1;
const iconConfig = {
  main: {
    url: './img/pin-current.png',
    width: 28,
    height: 44,
    anchorX: 14,
    anchorY: 44,
  },
  default: {
    url: './img/pin.png',
    width: 20,
    height: 32,
    anchorX: 10,
    anchorY: 32,
  }
};
const mainPinIcon = L.icon({
  iconUrl: iconConfig.main.url,
  iconSize: [iconConfig.main.width, iconConfig.main.height],
  iconAnchor: [iconConfig.main.anchorX, iconConfig.main.anchorY],
});
const icon = L.icon({
  iconUrl: iconConfig.default.url,
  iconSize: [iconConfig.default.width, iconConfig.default.height],
  iconAnchor: [iconConfig.default.anchorX, iconConfig.default.anchorY],
});
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 11;

export {
  defaultCitySelection,
  defaultAddressSelection,
  receivingMethod,
  mainPinIcon,
  icon,
  COPYRIGHT,
  TILE_LAYER,
  ZOOM,
};
