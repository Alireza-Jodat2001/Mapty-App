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
];

const form = document.querySelector('.form'),
    containerWorkouts = document.querySelector('.workouts'),
    inputType = document.querySelector('.form__input--type'),
    inputDistance = document.querySelector('.form__input--distance'),
    inputDuration = document.querySelector('.form__input--duration'),
    inputCadence = document.querySelector('.form__input--cadence'),
    inputElevation = document.querySelector('.form__input--elevation');

// check geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(PositionSuccussCallback, () =>
        alert('Could not get your position!\nPlease turn on the VPN!')
    );
}

// Create map
function PositionSuccussCallback(position) {
    const { latitude, longitude } = position.coords;

    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
}
