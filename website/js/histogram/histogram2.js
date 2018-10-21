const dataCore = require('../data-core.js');

/*
dataCore.onDataLoaded(function(data) {
    console.log(data);

    var length = data.length; // if we need to do percentages
    Highcharts.chart('histogram2', {
        title: {
            text: 'Highcharts Histogram'
        },
        xAxis: [{
            title: {text: 'Data'},
            alignTicks: false
        }, {
            title: {text: 'Histogram'},
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: {text: 'Data'}
        }, {
            title: {text: 'Histogram'},
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
            data: data.map(row => {
                return row['Reported Date']
            }),
            id: 's1',
            marker: {
                radius: 1.5
            }
        }]
    });
});
*/