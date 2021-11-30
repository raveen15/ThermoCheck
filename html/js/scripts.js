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
/*

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 40000,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
*/
//https://ros-temphumid.herokuapp.com/history/?format=json
async function setTempAndHumid() {
    var innerHTML = "";
    //get temp and humid from api
    const ros_temphumi_URL = "https://ros-temphumid.herokuapp.com/?format=json"
    const x = "b3dhaXM6YWRtaW4=";
    var request = new XMLHttpRequest();
    request.open("GET", ros_temphumi_URL, false); // false for synchronous request
    request.setRequestHeader("Authorization", "Basic " + x)
    request.send(null);
    var response = JSON.parse(request.responseText)
    response.forEach(resp => {
        var title = resp["name"];
        var subtitle = resp["location"];
        var currentTemperature = resp["temperature"];
        var tempClass = "bg-primary";
        var currentHumid = resp["humidity"];
        var humidClass = "bg-primary";
        console.log(title, subtitle, currentHumid, currentTemperature);
        //change color for bad temp/humid
        if (currentTemperature < 250) {
            //less than 250 degrees
            tempClass = "bg-success"
        } else if (currentTemperature >= 250 && currentTemperature < 300) {
            //greater than 250 degrees but less than 300
            tempClass = "bg-warning"
        } else {
            //greater than 300 degrees
            tempClass = "bg-danger"
        }
        if (currentHumid < 50) {
            //less than  %
            humidClass = "bg-success"
        } else if (currentHumid >= 50 && currentHumid < 75) {
            //greater than  but less than 
            humidClass = "bg-warning"
        } else {
            //greater than 
            humidClass = "bg-danger"
        }
        //set value to currtemp card
        innerHTML += '<div class="card bg-white m-4 px-3 shadow"><h1 class="mt-4">' + title + '</h1><ol class="breadcrumb mb-4"><li class="breadcrumb-item active">' + subtitle + ' </li></ol><div class="row"><div class="col-md-2"><div class="card ' + tempClass + ' text-white text-center mb-3 h-45" id="tempCard"><div class="card-body">Current Temperature<p class="text card-text " id="currentTemperature">' + currentTemperature + '°C</p></div></div><div class="card ' + humidClass + ' text-white text-center mb-3 h-45" id="humidCard"><div class="card-body">Current Humidity<p class="text card-text " id="currentHumidity">' + currentHumid + '%</p></div></div></div><div class="col-md-5 h-100"><div class="card mb-4"><div class="card-header"><i class="fas fa-chart-area me-1"></i>Temperature History</div><div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div></div></div><div class="col-md-5 h-100"><div class="card mb-4"><div class="card-header"><i class="fas fa-chart-area me-1"></i>Humidity History</div><div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div></div></div></div></div>';
    });
    document.getElementById("moduleContainer").innerHTML = innerHTML



}

