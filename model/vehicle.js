var vehicles
class Vehicle {
    #name
    #location
    #state

    constructor(name, location, state) {
        this.#name = name
        this.#location = location
        this.#state = state
    }

    setLocation(location){
        this.#location = location
    }

    getName() {
        return this.#name
    }

    getLocation() {
        return this.#location
    }

    getState() {
        return this.#state
    }
}