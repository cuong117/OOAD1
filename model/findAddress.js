class FindAddress {
    static async getSuggestAddress(query) {
        var data = await this.#getSuggestFromApi(query)
        var place = []
        data.resourceSets.forEach(element => {
            element.resources.forEach(data1 => {
                data1.value.forEach(resources => {
                    place.push(new Place(resources.address.addressLine, resources.address.locality,
                        resources.address.adminDistrict2, resources.address.adminDistrict, resources.address.formattedAddress,
                        resources.name))
                })
            })
        })
        return place;
    }

    static async #getSuggestFromApi(query) {
        var res = await fetch("http://dev.virtualearth.net/REST/v1/Autosuggest?" + new URLSearchParams({
            key: bing_map_key,
            query: query,
            ur: "VN",
            c: "vi",
            cf: "VN",
            o: "JSON"
        }))
        return res.json()
    }

    static async getAddressFromLocation(location) {
        var res = await fetch(`http://dev.virtualearth.net/REST/v1/Locations/${location.latitude},${location.longitude}?` +
            new URLSearchParams({
                key: bing_map_key
            }))
        res = await res.json()
        return this.#getAddress(res)
    }

    static async getLocation(query){
        var res = await fetch("http://dev.virtualearth.net/REST/v1/Locations?" + new URLSearchParams({
            query: query,
            maxResults: 1,
            key: bing_map_key
        }))
        var data = await res.json()
        var location
        data.resourceSets.forEach(element => {
            var latitude = element.resources[0].point.coordinates[0]
            var longitude = element.resources[0].point.coordinates[1]
            location = new Microsoft.Maps.Location(latitude, longitude)
        })
        return location
    }

    static async getAddressOfVehicle(vehicle){
        var data = await FindAddress.getAddressFromLocation(vehicle.getLocation())
        return data
    }

    static #getAddress(data){
        var name = data.resourceSets[0].resources[0].name;
        var namearr = name.split(',')
        namearr.pop()
        var length = namearr.length
        var length_str = namearr[length - 1].length
        namearr[length - 1] = namearr[length - 1].substr(0, length_str - 6)
        return namearr.join(", ")
    }
}