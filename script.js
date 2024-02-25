'use strict';

const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    form = document.querySelector('.form'),
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
    // constructor
    constructor() {
        // get geolocation
        this._getLocation();
        // form submit
        form.addEventListener('submit', this._formSubmit.bind(this));
        // change inputs
        inputType.addEventListener('change', this._changeInputs.bind(this));
    }
    // get geolocation
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            this._positionSuccuss.bind(this),
            () => alert('Could not get your position!\nPlease turn on the VPN!')
        );
    }
    // Create map
    _positionSuccuss(position) {
        const { latitude: lat, longitude: lng } = position.coords;
        this.#map = L.map('map').setView([lat, lng], 13);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
        this._addMarker(lat, lng, 'My current location.');
        this._initMarker();
    }
    // Adding new Marker
    _addMarker(lat, lng, content) {
        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup('', {
                maxWidth: 250,
                minWidth: 50,
                closeOnClick: false,
                autoClose: false,
                className: 'running-popup',
            })
            .setPopupContent(content)
            .openPopup();
    }
    // init Marker Function
    _initMarker() {
        this.#map.on('click', event => {
            this.#mapEvent = event.latlng;
            form.classList.remove('hidden');
            inputDistance.focus();
        });
    }
    // form submit
    _formSubmit(e) {
        const { lat, lng } = this.#mapEvent;
        e.preventDefault();
        this._addMarker(lat, lng, 'workout...');
        this._clearInputs();
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
}

const app = new App();
