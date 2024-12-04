'use strict';


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout {
  date = new Date()
  static id = 1
  constructor(coords, distance, duration) {
    this.id = ++Workout.id
    this.coords = coords
    this.distance = distance
    this.duration = duration

  }
  _setDescription() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
  }
}

class Running extends Workout {
  type = 'running'
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration,)
    this.cadence = cadence
    this.calcPace()
    this._setDescription()
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance
    return this.pace
  }
}
class Cycling extends Workout {
  type = 'cycling'
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration,)
    this.elevationGain = elevationGain
    this.calcSpeed()
    this._setDescription()
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60)
    return this.speed
  }
}
class App {
  //private
  #map
  #mapEvent
  #workouts = []
  constructor() {
    //active the function when we create a new App
    this._getPosition()

    form.addEventListener('submit', this._newWorkout.bind(this))

    inputType.addEventListener('change', this._toggleElevationField)
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
    // window.addEventListener("load", this._getDataFromLocalStorage.bind(this))

  }

  _getDataFromLocalStorage() {
    this.#workouts = JSON.parse(localStorage.getItem("workoutsData")) || []
    if (!this.#workouts) return
    this.#workouts.map(workout => this._renderWorkout(workout))
    this.#workouts.map(workout => this._renderWorkoutMarker(workout))
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout')
    if (!workoutEl) return
    const workout = this.#workouts.find(work => work.id === +workoutEl.dataset.id)

    this.#map.setView(workout.coords, 15, {
      animate: true,
      pan: {
        duration: 2
      }
    })
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert('Could not get your location')
      })
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords
    console.log(latitude, longitude)
    this.#map = L.map('map').setView([latitude, longitude], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.#map)

    L.marker([latitude, longitude]).addTo(this.#map)
      .bindPopup('your location.')
      .openPopup()

    this.#map.on('click', this._showForm.bind(this))
    this._getDataFromLocalStorage()
  }

  _showForm(mapE) {
    this.#mapEvent = mapE
    form.classList.remove('hidden')
    inputDistance.focus()
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
  }


  _newWorkout(e) {

    const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))
    const allPositive = (...inputs) => inputs.every(inp => inp > 0)

    e.preventDefault()

    const type = inputType.value
    const distance = +inputDistance.value
    const duration = +inputDuration.value

    const { lat, lng } = this.#mapEvent.latlng

    let workout

    if (type === 'running') {
      const cadence = +inputCadence.value
      if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
        return alert('Input has to be positive numbers!')

      workout = new Running([lat, lng], distance, duration, cadence)

    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value
      if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
        return alert('Input has to be positive numbers!')

      workout = new Cycling([lat, lng], distance, duration, elevation)

    }

    this.#workouts.push(workout)
    this._renderWorkoutMarker(workout)
    this._renderWorkout(workout)
    form.classList.add('hidden')
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
    localStorage.setItem("workoutsData", JSON.stringify(this.#workouts))
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords).addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${workout.type}-popup`,

      }))
      .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'}${workout.description}`)
      .openPopup()
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
       <h2 class="workout__title">${workout.description}</h2>
       <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
        </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
        </div>`

    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
          `
    }

    if (workout.type === 'cycling') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
          `
    }
    form.insertAdjacentHTML('afterend', html)
  }


}

const app = new App()


