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
            renderTo: 'hourhistogram',
            type: 'column'
        },
        title: {
            text: 'Crimes Per Hour'
        }, xAxis: {
            allowDecimals: false,
            tickInterval: 1,
            title: '',
            categories: [
                '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
                '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
              ]
        }, yAxis: {
            title: ''
        }, tooltip: {
            headerFormat: '<span style="">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
              '<td style="padding:0"><b>{point.y} crimes</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        
        plotOptions: {
            column: {
                groupPadding: 0,
                pointPadding: 0,
                borderWidth: 0
            }
        },
    
        series: [{
            showInLegend: false,
            data: hourFrequency
        }]
    
    });
});

