import './styles.css';

const data = async (request) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_mZXwLKLEkMRCIAtxqlnRt3rO8k2if&ipAddress=`
  );
  const data = await response.json();
  console.log(data);
};
var map = L.map('map').setView([37.40599, -122.078514], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

data();
