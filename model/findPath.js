class FindPath {
    static #currentRoute

    static getPath() {
        showDetails()
        if (address[0] && address[1]) { 
            var directionManager
            Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
                directionManager = new Microsoft.Maps.Directions.DirectionsManager(map)
                directionManager.clearAll()
                directionManager.clearDisplay()
                var start = new Microsoft.Maps.Directions.Waypoint({ location: address[0].getLocation() })
                var end = new Microsoft.Maps.Directions.Waypoint({ location: address[1].getLocation() })
                directionManager.addWaypoint(start)
                directionManager.addWaypoint(end)
                directionManager.setRenderOptions({
                    itineraryContainer: "#details",
                    firstWaypointPushpinOptions: {
                        visible: false
                    },
                    lastWaypointPushpinOptions: {
                        visible: false
                    },
                })
                Microsoft.Maps.Events.addHandler(directionManager, 'directionsUpdated', e => {
                    this.#currentRoute = directionManager.getCurrentRoute().routePath
                })
                directionManager.calculateDirections()

            })
        }
    }

    static setMove() {
        if (this.#currentRoute && address[1]) {
            input_address_to.disabled = true
            selectVehicle.disabled = true
            hideSuggestRoute()
            map.layers.clear()
            this.#currentRoute.push(address[1].getLocation())
            var line = new Microsoft.Maps.Polyline(this.#currentRoute, {
                strokeColor: "blue",
                strokeThickness: 6
            })
            map.entities.push(line)
            var length = this.#currentRoute.length
            var i = 0
            var id = setInterval(async () => {
                if (i < length) {
                    address[0].setLocation(this.#currentRoute[i])
                    var des = await FindAddress.getAddressFromLocation(this.#currentRoute[i])
                    infobox[0].setOptions({
                        title: "Phương tiện đang di chuyển",
                        description: des,
                        actions: []
                    })
                    infobox[0].setLocation(this.#currentRoute[i])
                    i++
                } else {
                    clearInterval(id)
                    map.entities.remove(line)
                    map.entities.remove(address[1])
                    updateVehicle(address[1].getLocation())
                    infobox[0].setMap(null)
                    infobox[1] = null
                    address[1] = null
                    createStartPin(selectVehicle.selectedIndex)
                    selectVehicle.disabled = false
                    input_address_to.disabled = false
                    clearDetails()
                }
            }, 2000)
        }
    }

}