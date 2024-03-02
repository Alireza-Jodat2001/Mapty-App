'use strict';

import Running from './Running.js';
import Cycling from './Cycling.js';

const form = document.querySelector('.form'),
    containerWorkouts = document.querySelector('.workouts'),
    inputType = document.querySelector('.form__input--type'),
    inputDistance = document.querySelector('.form__input--distance'),
    inputDuration = document.querySelector('.form__input--duration'),
    inputCadence = document.querySelector('.form__input--cadence'),
    inputElevation = document.querySelector('.form__input--elevation'),
    inputs = form.querySelectorAll('.form__input');

class App {
    #map;
    #mapEvent;
    #myCoords;
    #workouts = [];
    #mapZoomLevel = 13;
    // constructor
    constructor() {
        // get geolocation
        this._getLocation();
        // new workout
        form.addEventListener('submit', this._newWorkout.bind(this));
        // change inputs
        inputType.addEventListener('change', this._changeInputs.bind(this));
        // move map
        containerWorkouts.addEventListener(
            'click',
            this._moveToPopup.bind(this)
        );
    }
    // get geolocation
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            // successful
            this._positionSuccuss.bind(this),
            // unsuccessful
            () => alert('Could not get your position!\nPlease turn on the VPN!')
        );
    }
    // Create map
    _positionSuccuss(position) {
        const { latitude, longitude } = position.coords;
        this.#myCoords = [latitude, longitude];
        // set view
        this.#map = L.map('map').setView(this.#myCoords, this.#mapZoomLevel);
        // set tileLayer
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
        // add first marker
        this._addMarker(this.#myCoords, '', 'My current location.');
        // init click on map function
        this._initMarker();
    }
    // Adding new Marker
    _addMarker(coords, popupCl, content) {
        L.marker(coords)
            .addTo(this.#map)
            .bindPopup(`${content}`, {
                maxWidth: 250,
                minWidth: 50,
                closeOnClick: false,
                autoClose: false,
                className: `${popupCl}-popup`,
            })
            .openPopup();
    }
    // init Marker Function
    _initMarker() {
        this.#map.on('click', event => {
            this.#mapEvent = event.latlng;
            form.classList.remove('hidden');
            inputDistance.focus();
        });
        // Show Workouts
        this._showWorkouts();
    }
    // move map
    _moveToPopup(e) {
        if (!e.target.closest('.workout')) return;
        const targetId = e.target.closest('.workout').dataset.id;
        const getCoords = this.#workouts.find(
            workoutObj => workoutObj._getId === targetId
        );
        this.#map.setView(getCoords._getCoords, this.#mapZoomLevel, {
            animate: true,
            pan: { duration: 0.8 },
        });
    }
    // Valid Inputs
    _validInputs(...inputs) {
        return inputs.every(input => Number.isFinite(+input.value));
    }
    // checking Positive inputs
    _allPositive(...inputs) {
        return inputs.every(input => +input.value > 0);
    }
    // Cecking All input
    _checkingInput(typeVal) {
        const cad_or_Elev =
            typeVal === 'running' ? inputCadence : inputElevation;
        return (
            this._validInputs(inputDistance, inputDuration, cad_or_Elev) &&
            this._allPositive(inputDistance, inputDuration, cad_or_Elev)
        );
    }
    // new workout
    _newWorkout(e_or_workoutObj) {
        if (e_or_workoutObj.target) {
            e_or_workoutObj.preventDefault();
            // Initilization
            const { lat, lng } = this.#mapEvent,
                coords = [lat, lng],
                typeVal = inputType.value,
                distanceVal = +inputDistance.value,
                durationVal = +inputDuration.value,
                cadenceVal = +inputCadence.value,
                elevationVal = +inputElevation.value,
                id = (Date.now() + '').slice(-10),
                now = new Date(),
                cad_or_Elev = typeVal === 'running' ? cadenceVal : elevationVal,
                argument = [
                    coords,
                    distanceVal,
                    durationVal,
                    id,
                    now,
                    cad_or_Elev,
                ];
            // Checking inputs and create new workout
            if (this._checkingInput(typeVal)) {
                // create workout Obj
                this._createWorkout(typeVal, argument);
                // Create Element
                this._createElement(this.#workouts.slice(-1)[0]);
                // Add Marker
                const [{ _getTypeVal, _getMarkerTitle }] =
                    this.#workouts.slice(-1);
                this._addMarker(coords, _getTypeVal, _getMarkerTitle);
                // clear inputs and  hide form
                this._hideForm();
            } else alert('Inputs have to be positive numbers!');
        } else {
            const {
                _getCoords,
                _getDistance,
                _getDuration,
                _getId,
                _getDate,
                _getTypeVal,
                _getCadence,
                _getElevationGain,
                _getMarkerTitle,
            } = e_or_workoutObj;
            const cad_or_Elev =
                _getTypeVal === 'running' ? _getCadence : _getElevationGain;
            const argument = [
                _getCoords,
                _getDistance,
                _getDuration,
                _getId,
                _getDate,
                cad_or_Elev,
            ];
            // create workout Obj
            this._createWorkout(_getTypeVal, argument);
            // Create Element
            this._createElement(e_or_workoutObj);
            // Add Marker
            this._addMarker(_getCoords, _getTypeVal, _getMarkerTitle);
        }
    }
    // create workout Obj
    _createWorkout(typeVal, argument) {
        typeVal === 'running'
            ? this._addRunning(argument)
            : this._addCycling(argument);
    }
    // Create Element
    _createElement(strEl) {
        const workoutEl = this._createStrElement(strEl);
        form.insertAdjacentHTML('afterend', workoutEl);
    }
    // Create Str Element
    _createStrElement(obj) {
        const {
            _getTypeVal,
            _getId,
            _getTitle,
            _getWorkoutIco,
            _getDistance,
            _getDuration,
            _getCadence,
            _getElevationGain,
            _getSpeedUnit,
            _getSpmIco,
            _calcPace,
            _calcSpeed,
            _getSpmUnit,
        } = obj;
        // return element
        return `<li class="workout workout--${_getTypeVal}" data-id="${_getId}">
                    <h2 class="workout__title">${_getTitle}</h2>
                    <div class="workout__details">
                        <span class="workout__icon">${_getWorkoutIco}</span>
                        <span class="workout__value">${_getDistance}</span>
                        <span class="workout__unit">km</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">⏱</span>
                        <span class="workout__value">${_getDuration}</span>
                        <span class="workout__unit">min</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${
                            _getTypeVal === 'running'
                                ? _getCadence
                                : _getElevationGain
                        }</span>
                        <span class="workout__unit">${_getSpeedUnit}</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">${_getSpmIco}</span>
                        <span class="workout__value">${
                            _getTypeVal === 'running' ? _calcPace : _calcSpeed
                        }</span>
                        <span class="workout__unit">${_getSpmUnit}</span>
                    </div>
                </li>`;
    }
    _hideForm() {
        this._clearInputs();
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    // Clear form inputs
    _clearInputs() {
        inputs.forEach(input => {
            if (input !== inputType) {
                input.value = '';
                input.blur();
            }
        });
    }
    // Change Inputs
    _changeInputs(e) {
        const optionActive = e.target.querySelector('option:checked');
        const hiddenRow = form.querySelector('.form__row--hidden');
        hiddenRow.classList.remove('form__row--hidden');
        form.querySelector(`.${optionActive.dataset.inputhidden}`)
            .closest('.form__row')
            .classList.add('form__row--hidden');
    }
    // add running
    _addRunning(argument) {
        const newWorkout = new Running(...argument);
        this.#workouts.push(newWorkout);
        this._sendToLocaleStorage();
    }
    // add cycling
    _addCycling(argument) {
        const newWorkout = new Cycling(...argument);
        this.#workouts.push(newWorkout);
        this._sendToLocaleStorage();
    }
    // Send To Locale Storage
    _sendToLocaleStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }
    // Show Workouts
    _showWorkouts() {
        const workoutsObj = JSON.parse(localStorage.getItem('workouts'));
        workoutsObj?.forEach(workout => this._newWorkout(workout));
    }
    // Reset App
    _resetApp() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();
