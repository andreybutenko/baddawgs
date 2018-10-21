const dataCore = require('../data-core.js');
const datejs = require('datejs');

var incidentDateArray;
dataCore.onDataLoaded(function(data) {
    console.log("HI");
    var dates = data.map(row => {
        return Date.parse(row['Reported Date and Time'])
    });
    console.log(dates);
    var hours = dates.map(element => {
        return element.getHours();
    });
    console.log(hours);


    var hourFrequency = hours
        .reduce((acc, cur) => {
            acc[cur] = (acc[cur] + 1 || 1);
            return acc;
        }, [])

    for(let i = 0; i < hourFrequency.length; i++) {
        hourFrequency[i] = hourFrequency[i] || 0;
    }

            
    console.log(hourFrequency);


    Highcharts.chart({

        chart: {
            renderTo: 'histogramtest',
            type: 'column'
        },
    
        xAxis: {
            //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        plotOptions: {
            column: {
                groupPadding: 0,
                pointPadding: 0,
                borderWidth: 0
            }
        },
    
        series: [{
            data: hourFrequency
        }]
    
    });
});

