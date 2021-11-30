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
setInterval(function () { setTempAndHumid() }, 10000);


// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
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
      data: [],
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

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

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
        var currentHumid = resp["humidity"];
        console.log(resp);
        addData(myLineChart, time, currentTemperature);
        //change color for bad temp/humid
        if (currentTemperature < 250) {
            //less than 250 degrees
            document.getElementById("tempCard").classList.add("bg-success")
            document.getElementById("tempCard").classList.remove("bg-warning")
            document.getElementById("tempCard").classList.remove("bg-danger")
        } else if (currentTemperature >= 250 && currentTemperature < 300) {
            //greater than 250 degrees but less than 300
            document.getElementById("tempCard").classList.add("bg-warning")
            document.getElementById("tempCard").classList.remove("bg-success")
            document.getElementById("tempCard").classList.remove("bg-danger")
        } else {
            //greater than 300 degrees
            document.getElementById("tempCard").classList.add("bg-danger")
            document.getElementById("tempCard").classList.remove("bg-warning")
            document.getElementById("tempCard").classList.remove("bg-success")
        }
        if (currentHumid < 50) {
            //less than  %
            document.getElementById("humidCard").classList.add("bg-success")
            document.getElementById("humidCard").classList.remove("bg-warning")
            document.getElementById("humidCard").classList.remove("bg-danger")
        } else if (currentHumid >= 50 && currentHumid < 75) {
            //greater than  but less than 
            document.getElementById("humidCard").classList.add("bg-warning")
            document.getElementById("humidCard").classList.remove("bg-success")
            document.getElementById("humidCard").classList.remove("bg-danger")
        } else {
            //greater than 
            document.getElementById("humidCard").classList.add("bg-danger")
            document.getElementById("humidCard").classList.remove("bg-warning")
            document.getElementById("humidCard").classList.remove("bg-success")
        }
        //set value to currtemp card
        innerHTML += '<div class="card bg-white m-4 px-3 shadow"><h1 class="mt-4">' + title + '</h1><ol class="breadcrumb mb-4"><li class="breadcrumb-item active">' + subtitle + ' </li></ol><div class="row"><div class="col-md-2"><div class="card bg-primary-white text-center mb-3 h-45" id="tempCard"><div class="card-body">Current Temperature<p class="text card-text" id="currentTemperature">' + currentTemperature + '°C</p></div></div><div class="card bg-primary text-white text-center mb-3 h-45" id="humidCard"><div class="card-body">Current Humidity<p class="text card-text" id="currentHumidity">' + currentHumid + '%</p></div></div></div><div class="col-md-5 h-100"><div class="card mb-4"><div class="card-header"><i class="fas fa-chart-area me-1"></i>Temperature History</div><div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div></div></div><div class="col-md-5 h-100"><div class="card mb-4"><div class="card-header"><i class="fas fa-chart-area me-1"></i>Humidity History</div><div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div></div></div></div></div>';
    });



}

