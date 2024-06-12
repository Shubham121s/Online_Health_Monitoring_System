/*
This file contains the fucntion to render the scatterplot using goodgle charts. First, the user data is fetched with
jQuery. Then the net calories is calculated and combined in an array with the dates to produce the final array 
combinedDatesAndCals which can be passes to the render function to render the google chart.
*/
$.getJSON('/data', function(user) {
  let dates = [];
  dates = user.userData.date;

  /*
  For each date, net calories needs to be calclulated by subtracting the calories out from the calories in. 
  The render function's purpose is to  to render the google line chart needs and array of arrays, with the initital 
  array containing the labesl for the x and y axis and each subsequesnt array containg a value for the x and y axis. 
  In this case, the x value is the date and the y value is the net calories. 
  */


  if (dates.length > 0)
  {
    let combinedDatesAndCals = []; 
    combinedDatesAndCals.push(['dates', 'net calories']); // initial subarray contains the labels for the x and y axis.
    // subsequent subarrays will have to contain values for date and  net calories in the x and y position respectivly.
    for (var i=0; i < dates.length; i++){
      var net = user.userData.caloriesIn[i] - user.userData.caloriesOut[i];
      var dateString = dates[i].split('-');
      var date = new Date(dateString[0], dateString[1]- 1, dateString[2]);
      combinedDatesAndCals.push([ date, net ]);
    };
    render(combinedDatesAndCals); 
  }
  else{
    render( [ ['Date', 'Net Calories'], ['No Data', 0] ] );
  };
});

// The render function will render the scatterplot
function render(combinedDatesAndCals){
  
  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var data = google.visualization.arrayToDataTable(combinedDatesAndCals);
        var options = {
          title: '',
          hAxis: {title: 'Dates', format: 'd MMM yyyy'},
          vAxis: {title: 'Net Calories'},
          legend: 'none'
        };
        var chart = new google.visualization.ScatterChart(document.getElementById('scatter-plot'));
        chart.draw(data, options);
      }
};
