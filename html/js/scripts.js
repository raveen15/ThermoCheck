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

setTempAndHumid();
//https://ros-temphumid.herokuapp.com/history/?format=json
async function setTempAndHumid() {
    //get temp and humid from api
    var currentTemperature = 20;
    var currentHumid = 75;
    const ros_temphumi_URL = "https://ros-temphumid.herokuapp.com/?format=json"
    const x = "b3dhaXM6YWRtaW4=";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", ros_temphumi_URL, false); // false for synchronous request
    xmlHttp.setRequestHeader("Authorization", "Basic " + x)
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);

    //set value to currtemp card
    document.getElementById("currentTemperature").innerHTML = currentTemperature + "°C"
    document.getElementById("currentHumidity").innerHTML = currentHumid + "%"
}

