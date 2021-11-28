/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
setTempAndHumid()
setInterval(function () { setTempAndHumid() }, 1000);

//https://ros-temphumid.herokuapp.com/history/?format=json
async function setTempAndHumid() {
    //get temp and humid from api
    const ros_temphumi_URL = "https://ros-temphumid.herokuapp.com/?format=json"
    const x = "b3dhaXM6YWRtaW4=";
    var request = new XMLHttpRequest();
    request.open("GET", ros_temphumi_URL, false); // false for synchronous request
    request.setRequestHeader("Authorization", "Basic " + x)
    request.send(null);
    var response = JSON.parse(request.responseText)
    var currentTemperature = response["temperature"];
    var currentHumid = response["humidity"];
    console.log("tick");
    //change color for bad temp/humid
    if (currentTemperature < 25) {
        //less than 250 degrees
        document.getElementById("tempCard").classList.add("bg-success")
    } else if (currentTemperature >= 25 && currentTemperature < 30) {
        //greater than 250 degrees but less than 300
        document.getElementById("tempCard").classList.add("bg-warning")
    } else {
        //greater than 300 degrees
        document.getElementById("tempCard").classList.add("bg-danger")
    }
    if (currentHumid < 50) {
        //less than  %
        document.getElementById("humidCard").classList.add("bg-success")
    } else if (currentHumid >= 50 && currentHumid < 75) {
        //greater than  but less than 
        document.getElementById("humidCard").classList.add("bg-warning")
    } else {
        //greater than 
        document.getElementById("humidCard").classList.add("bg-danger")
    }
    //set value to currtemp card
    document.getElementById("currentTemperature").innerHTML = currentTemperature + "°C"
    document.getElementById("currentHumidity").innerHTML = currentHumid + "%"
}

