import Workout from './Workout.js';

export default class Cycling extends Workout {
    #elevationGain;
    #speed;
    #typeVal = 'cycling';
    #workoutIco = '🚴‍♀️';
    #speedUnit = 'km/h';
    #spmIco = '⛰';
    #spmUnit = 'm';
    // constructor
    constructor(coords, distance, duration, id, date, elevationGain) {
        super(coords, distance, duration, id, date);
        this.#elevationGain = elevationGain;
        this._calcSpeed;
    }
    // To JSON
    toJSON() {
        return {
            _getDate: this._getDate,
            _getId: this._getId,
            _getTypeVal: this._getTypeVal,
            _getDistance: this._getDistance,
            _getDuration: this._getDuration,
            _getCoords: this._getCoords,
            _calcSpeed: this._calcSpeed,
            _getElevationGain: this._getElevationGain,
            _getWorkoutIco: this._getWorkoutIco,
            _getSpeedUnit: this._getSpeedUnit,
            _getSpmIco: this._getSpmIco,
            _getSpmUnit: this._getSpmUnit,
            _getWorkoutUpper: this._getWorkoutUpper,
            _getMonth: this._getMonth,
            _getDay: this._getDay,
            _getTitle: this._getTitle,
            _getMarkerTitle: this._getMarkerTitle,
        };
    }
    // getter typeVal
    get _getTypeVal() {
        return this.#typeVal;
    }
    // getter elevationGain
    get _getElevationGain() {
        return this.#elevationGain;
    }
    // calculation speed
    get _calcSpeed() {
        const speed = this._getDistance / (this._getDuration / 60);
        this.#speed = Number.isInteger(speed) ? speed : speed.toFixed(2);
        return this.#speed;
    }
    // getter workoutIco
    get _getWorkoutIco() {
        return this.#workoutIco;
    }
    // getter speedUnit
    get _getSpeedUnit() {
        return this.#speedUnit;
    }
    // getter spmIco
    get _getSpmIco() {
        return this.#spmIco;
    }
    // getter spmUnit
    get _getSpmUnit() {
        return this.#spmUnit;
    }
    // Getter Workout Upper
    get _getWorkoutUpper() {
        return this._getTypeVal.replace(
            this._getTypeVal[0],
            this._getTypeVal[0].toUpperCase()
        );
    }
    // Getter Month
    get _getMonth() {
        const month = new Date(this._getDate);
        return month.toLocaleString('en', {
            month: 'long',
        });
    }
    // Getter Day
    get _getDay() {
        const date = new Date(this._getDate);
        return date.getDate();
    }
    // Getter Title
    get _getTitle() {
        return `${this._getWorkoutUpper} on ${this._getMonth} ${this._getDay}`;
    }
    // Getter Marker Title
    get _getMarkerTitle() {
        return this._getTypeVal === 'running'
            ? `🏃‍♂️ ${this._getTitle}`
            : `🚴‍♀️ ${this._getTitle}`;
    }
}
