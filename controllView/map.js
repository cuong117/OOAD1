function showDetails(){
    if (!menuSide.style.width){
        menu.style.display = "none"
        menuSide.style.width = getComputedStyle(document.documentElement).getPropertyValue("--width-mobile")    
    }
}

function hideDetails(){
    menuSide.style.width = ""
    menu.style.display = "flex"
}

function hideSuggestRoute(){
    document.querySelector("li:not(.selected)").style.display = "none"
}

function clearDetails(){
    document.querySelector("#details").innerHTML = ""
}

