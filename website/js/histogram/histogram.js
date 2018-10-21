const dataCore = require('../data-core.js');
const datejs = require('datejs');

var incidentDateArray;
dataCore.onDataLoaded(function(data) {
    console.log("HI");
    var arr = data.map(row => {
        return Date.parse(row['Reported Date and Time']).getTime()
    });
    incidentDateArray = arr;

    console.log(incidentDateArray);

    Highcharts.chart({

        chart: {
            renderTo: 'histogramtest',
            type: 'column'
        },
    
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        plotOptions: {
            column: {
                groupPadding: 0,
                pointPadding: 0,
                borderWidth: 0
            }
        },
    
        series: [{
            data: incidentDateArray
        }]
    
    });
});

