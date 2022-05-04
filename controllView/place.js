const bing_map_key = "AlBNU0mQXvdQU1b1JTEi5YZElIvaX3TFP5ov3pR_5Xq4pl2XEDA3mccLe3fClWZ3"
var address = [null, null]
var add_address = [false, false]
var input = [0, input_address_to]
var infobox = [null, null]
var map

function GetMap() {
    map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(21.032857804598823, 105.83215941068394),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 16,
        showMapTypeSelector: false,
        showBreadcrumb: true,
        navigationBarMode: Microsoft.Maps.NavigationBarMode.square,
        showLocateMeButton: false
    })

    createVehicle()
    createStartPin(0)
    Microsoft.Maps.Events.addHandler(map, 'rightclick',async function(e){
        map.layers.clear()
        document.querySelector("#details").innerHTML = ""
        var name = await FindAddress.getAddressFromLocation(e.location)

        createPushpin(e.location.latitude, e.location.longitude, 1, name)
        input[1].value = name

    })
}

function addSuggest(place, input) {
    var fullAddress = ""
    var nameAddress = ""
    fullAddress = place.getFullName()
    nameAddress = place.getAddressName()
    var li = document.createElement('li')
    li.className = "suggestElememt"
    li.setAttribute('data', place.getQuery())
    li.innerHTML = `
    <label class="nameAddress">${nameAddress}</label></br>
    <label class="fullAddress">${fullAddress}</label>
    <hr>`
    li.onclick = e => {
        input.blur()
        if(input == input_address_to){
            getGeo(e, 1)
        }
        input.value = e.currentTarget.querySelector(".nameAddress").textContent
    }
    li.onmousedown = e => {
        e.preventDefault()
    }
    return li
}

async function getGeo(e, index) {
    var location
    var address_data = e.currentTarget.getAttribute('data')
    location = await FindAddress.getLocation(address_data)
    createPushpin(location.latitude, location.longitude, index, address_data)
}

function getAddress(data){
    var name = data.resourceSets[0].resources[0].name;
    var namearr = name.split(',')
    namearr.pop()
    var length = namearr.length
    var length_str = namearr[length - 1].length
    namearr[length - 1] = namearr[length - 1].substr(0, length_str - 6)
    return namearr.join(", ")
}

function createPushpin(latitude, longitude, index, des) {
    console.log(des)
    if (address[index]) {
        map.entities.remove(address[index])
    }
    var location = new Microsoft.Maps.Location(latitude, longitude)
    var color = "red"
    var title = "Điểm đến"
    if (!index){
        color = "green"
        title = "Điểm xuất phát"
    }

    var pin = new Microsoft.Maps.Pushpin(location, {
        color: color
    })

    var info
    if(index){
        console.log("1")
        info = new Microsoft.Maps.Infobox(location, {
            title: title,
            description: des,
            visible: false
        })
    }else{
        console.log("0")
        info = new Microsoft.Maps.Infobox(location, {
            title: title,
            description: des,
            visible: false,
            actions: [{
                label: 'Bắt Đầu',
                eventHandler: () => {
                    console.log("start")
                    FindPath.setMove()
                }
            }]
        })
    }

    infobox[index] = info
    console.log(info)

    Microsoft.Maps.Events.addHandler(pin, 'mouseover', e => {
        info.setOptions({
            visible: true
        })
    })

    Microsoft.Maps.Events.addHandler(pin, 'mouseout', e => {
        info.setOptions({
            visible: false
        })
    })

    info.setMap(map)
    map.entities.push(pin)
    address[index] = pin
    if(index || (!index && address[1]) ){
        map.layers.clear()
        FindPath.getPath()
    }
}

async function getSuggest(e, list) {
    list.innerHTML = ""
    if (e.target.value != ""){
        var place = await FindAddress.getSuggestAddress(e.target.value)

        place.forEach(element => {
            list.append(addSuggest(element, e.target))
        })
    }
}

function visitLocation(e, index){
    if(address[index]){
        map.setView({
            center: address[index].getLocation()
        })
        e.target.blur()
    }
}

function visitPin(pin){
    map.setView({
        center: pin.getLocation()
    })
}

async function createStartPin(index){
    var vehicle = vehicles[index] 
    var location = vehicle.getLocation()
    createPushpin(location.latitude, location.longitude, 0,await FindAddress.getAddressOfVehicle(vehicle))
    visitPin(address[0])
}
