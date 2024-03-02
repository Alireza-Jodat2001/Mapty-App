import Workout from './Workout.js';

export default class Running extends Workout {
    #cadence;
    #pace;
    #typeVal = 'running';
    #workoutIco = '🏃‍♂️';
    #speedUnit = 'min/km';
    #spmIco = '🦶🏼';
    #spmUnit = 'spm';
    // constructor
    constructor(coords, distance, duration, id, date, cadence) {
        super(coords, distance, duration, id, date);
        this.#cadence = cadence;
        this._calcPace;
    }
    // To Json
    toJSON() {
        return {
            _getDate: this._getDate,
            _getId: this._getId,
            _getDistance: this._getDistance,
            _getDuration: this._getDuration,
            _getTypeVal: this._getTypeVal,
            _getCoords: this._getCoords,
            _calcPace: this._calcPace,
            _getCadence: this._getCadence,
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
    // Getter cadence
    get _getCadence() {
        return this.#cadence;
    }
    // calculation pace
    get _calcPace() {
        const pace = this._getDuration / this._getDistance;
        this.#pace = Number.isInteger(pace) ? pace : pace.toFixed(2);
        return this.#pace;
    }
    // Getter workoutIco
    get _getWorkoutIco() {
        return this.#workoutIco;
    }
    // Getter speedUnit
    get _getSpeedUnit() {
        return this.#speedUnit;
    }
    // Getter spmIco
    get _getSpmIco() {
        return this.#spmIco;
    }
    // Getter spmUnit
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
