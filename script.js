'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`)
    map = L.map('map').setView([latitude, longitude], 15)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    L.marker([latitude, longitude]).addTo(map)
      .bindPopup('your location.')
      .openPopup()

    map.on('click', function (mapE) {
      mapEvent = mapE
      form.classList.remove('hidden')
      inputDistance.focus()
    })

  }, function () {
    alert('Could not get your location')
  })

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const { lat, lng } = mapEvent.latlng
  L.marker([lat, lng]).addTo(map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',

    }))
    .setPopupContent('workout')
    .openPopup()
  form.classList.add('hidden')
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
})

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
})