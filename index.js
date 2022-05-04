var test = document.querySelector("#click")
var input_address_to = document.querySelector('#find-address-to')
var list_address_to = document.querySelector('.to')
var visit_address_to = document.querySelector('.visitMapTo')
var menu = document.querySelector('#menu')
var menuSide = document.querySelector('#menu-side')
var back = document.querySelector('.back')
var selectVehicle = document.querySelector('#vehicle')

input_address_to.oninput = e => {
    getSuggest(e, list_address_to)
}

visit_address_to.onmousedown = e => {
    e.preventDefault()
}

visit_address_to.onclick = e => {
    visitLocation(e, 1)
}

back.onclick = e => {
    hideDetails()
}

menu.onclick = e => {
    console.log(e.currentTarget)
    showDetails(e)
}

selectVehicle.onchange = e => {
    createStartPin(e.currentTarget.selectedIndex)
}


function createVehicle() {
    vehicles = [new Vehicle("car", new Microsoft.Maps.Location(21.023729849592034, 105.803293897214), "Tốt"),
    new Vehicle("car 1hjdfd", new Microsoft.Maps.Location(21.027377958761136, 105.78551963954398, "Tốt"))]

    var count = 0
    vehicles.forEach(e => {
        var op = document.createElement("option")
        op.innerHTML = `${e.getName()}`
        op.setAttribute("data", count)
        selectVehicle.append(op)
    })
}

function updateVehicle(location){
    var index = selectVehicle.selectedIndex
    vehicles[index].setLocation(location)
}