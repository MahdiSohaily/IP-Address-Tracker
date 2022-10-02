import './styles.css';

var map = L.map('map').setView([37.40599, -122.078514], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);
