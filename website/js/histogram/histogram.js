const dataCore = require('../data-core.js');
const datejs = require('datejs');

var incidentDateArray;
dataCore.onDataLoaded(function(data) {
    console.log("HI");
    var arr = data.map(row => {
        var parsed = Date.parse(row['Reported Date and Time']);
        return parsed.getTime()
    });
    incidentDateArray = arr;

    console.log(incidentDateArray);

    Highcharts.chart('histogramtest', {
        title: {
            text: 'Highcharts Histogram'
        },
        xAxis: [{
            title: { text: 'Data' },
            alignTicks: false
        }, {
            title: { text: 'Histogram' },
            alignTicks: false,
            opposite: true
        }],
    
        yAxis: [{
            title: { text: 'Data' }
        }, {
            title: { text: 'Histogram' },
            opposite: true
        }],
    
        series: [{
            name: 'Histogram',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            zIndex: -1
        }, {
            name: 'Data',
            type: 'scatter',
            data: incidentDateArray,
            id: 's1',
            marker: {
                radius: 1.5
            }
        }]
    });
});

