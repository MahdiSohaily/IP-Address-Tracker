import './styles.css';
import './images/icon-location.svg'

// DOM reference to access data
const form = document.querySelector('.form');
const input = document.querySelector('.ipAddress');
const error = document.querySelector('.error');

// Add event listener to form to submit data on submission
form.addEventListener('submit', () => {
  const value = input.value;
  const regex =
    /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gim;
  if (regex.test(value)) {
    data(value);
  } else {
    displayError('Input correct IPv4 or IPv6 address.');
  }
});


// add async function to get data from an API
const data = async (request) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_1s5HKqawH1MICHWAQB7ZS9BCVt4CE&ipAddress=${request}`
  );

  const data = await response.json();
  return data;
};

// Call the initialization function to load current user data on load
data('')
  .then((data) => {
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
  })
  .catch((err) => console.log(err.message));

// add function to display Error
function displayError(message) {
  console.log('again')
  error.innerHTML = message;
  error.style.bottom = '10px';
  setTimeout(() => {
    error.style.bottom = '-100px';
  }, 2000);
}

// function to display map to the UI base on the API data
function displayMap(lat, lng) {
  var map = L.map('map').setView([lat, lng], 14);
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
    iconSize: [47, 60],
    iconAnchor: [15, 15],
  });

  const marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map);
}
