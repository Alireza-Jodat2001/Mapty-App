export default class Workout {
    #coords;
    #distance;
    #duration;
    #id;
    #date;
    // constructor
    constructor(coords, distance, duration, id, date) {
        this.#coords = coords;
        this.#distance = distance;
        this.#duration = duration;
        this.#id = id;
        this.#date = date;
    }
    // Getter coords
    get _getCoords() {
        return this.#coords;
    }
    // Getter distance
    get _getDistance() {
        return this.#distance;
    }
    // Getter duration
    get _getDuration() {
        return this.#duration;
    }
    // Getter id
    get _getId() {
        return this.#id;
    }
    // Getter date
    get _getDate() {
        return this.#date;
    }
}
