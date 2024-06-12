/*
This file simly gets userdata and updates the cards on the dahboard page with DOM.
*/
$.getJSON('/data', function(user) {
    renderCards(user);
});  
function renderCards(user) {
    if (user.userData.date.length > 0)
    {
        var curresntUserCalories = user.userData.caloriesIn[user.userData.caloriesOut.length -1 ] - user.userData.caloriesOut[user.userData.caloriesOut.length -1];
        document.getElementById('calorie-card').innerHTML = curresntUserCalories;
        var curresntUserWeigth = user.userData.weight[user.userData.weight.length -1];
        curresntUserWeigth = curresntUserWeigth + " lbs";
        document.getElementById('weight-card').innerHTML = curresntUserWeigth;
        var currentUserMinutes = user.userData.minutes[user.userData.minutes.length -1];
        currentUserMinutes = currentUserMinutes + " Minutes"
        document.getElementById('activity-card').innerHTML = currentUserMinutes;
        var latestEntry = user.userData.date[user.userData.date.length -1];
        var latestEntryReorganized = latestEntry.substring(5, 7) + "-" + latestEntry.substring(8, 10) + "-" + latestEntry.substring(0,4);
        document.getElementById('date-card').innerHTML = latestEntryReorganized;

    }

};