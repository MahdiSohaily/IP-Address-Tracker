import { concat } from 'lodash';
import './styles.css';

const data = async (request) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_mZXwLKLEkMRCIAtxqlnRt3rO8k2if&ipAddress=${request}`
  );
  const data = await response.json();
  return data;
};
data('').then((data) => {
  const ip = document.querySelector('.ip');
  const location = document.querySelector('.location');
  const timeZone = document.querySelector('.timeZone');
  const isp = document.querySelector('.isp');

  ip.innerHTML = data.ip;
  location.innerHTML =
    data.location.city +
    ',' +
    data.location.country +
    ', <br>' +
    data.location.geonameId;
  timeZone.innerHTML = 'UTC' + data.location.timezone;
  isp.innerHTML = data.isp;
  displayMap(data.location.lat, data.location.lng);
});

function displayMap(lat, lng) {
  var map = L.map('map').setView([lat, lng], 13);
  const tileUrl =
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  L.tileLayer(tileUrl, {
    maxZoom: 18,
    attribution: false,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);

  const locationIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [35, 35],
    iconAnchor: [15, 15],
  });
  const marker = L.marker([0, 0], { icon: locationIcon }).addTo(map);
}
