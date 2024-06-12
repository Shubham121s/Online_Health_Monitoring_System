/*
This file contains the fucntion to render the donut chart using goodgle charts. First, the user data is fetched with
jQuery. Then the activity and minutes per activity are sorted by activity. For example, if the user data contains 30
minutes of running on 11/15 and 20 minutes of running on 11/16, the total minutes will be 50 minutes and it will be displayed
in the donut chart.
*/
$.getJSON('/data', function(user) {
  var serverUserdata = user.userData;
  var activities = serverUserdata.activity;
  var minutes = serverUserdata.minutes;
  
  /*
  The user data is im the form of 2 arrays, one containing each activity enttry and one containing eacb activity minuttes entry.
  The format is as such: activites = ['Running', 'Biking', 'Running'] and minutes = [30, 45, 30]. The renderie function needs the data to
  be in the form of activityAndMinutesPieArray = [['Activity', 'Time Spent'], [Running, 60], [Biking, 45]]

  
  First an array is creted containing the all activiies and activity minutes in the user data.
  */
  let activitiesAndMinutes = [];
  for ( var i = 0; i<activities.length; i++)
  {
    activitiesAndMinutes[i] = [activities[i], minutes[i]];
  }

  // Then recently created array activitiesAndMinutes is split into 2 seperate arrays that are reduced to unique activities and combined minutes. 
  var uniqueActivityCount = 0;
  let reducedActivites = [];
  let reducedMinutes = [];

  for (var j = 0; j < activitiesAndMinutes.length; j++){
    if (reducedActivites.includes(activitiesAndMinutes[j][0])){
      var combinedMinutes = Number(reducedMinutes[reducedActivites.indexOf(activitiesAndMinutes[j][0])]) + Number( activitiesAndMinutes[j][1]);
      reducedMinutes[reducedActivites.indexOf(activitiesAndMinutes[j][0])] = combinedMinutes.toString();
    }
    else{
      reducedActivites[uniqueActivityCount] = activitiesAndMinutes[j][0];
      reducedMinutes[uniqueActivityCount] = activitiesAndMinutes[j][1];
      uniqueActivityCount++
    }

  }
  
  /*
  Then a new array of arrays is created called activityAndMinutesPieArray. activityAndMinutesPieArray has an initial subarray 
  with the labels for the donut chart "Activity" and "Time Spent". Next activityAndMinutesPieArray will contain subarrays
  containing the activty name and time spent. 
  */

  let activityAndMinutesPieArray = [];
  activityAndMinutesPieArray.push(['Activity', 'Time Spent']);
  for (var m = 0; m < reducedActivites.length; m++){
    activityAndMinutesPieArray.push([reducedActivites[m], parseInt(reducedMinutes[m]) ]);
  }

  //finally, activityAndMinutesPieArray can be passes to renderpie to render the donut chart.
  renderpie(activityAndMinutesPieArray);

  
  
});
function renderpie(activityAndMinutesPieArray){
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(activityAndMinutesPieArray);

    var options = {
      title: 'Time Spent by Activity',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
    chart.draw(data, options);
  }
  

  };
