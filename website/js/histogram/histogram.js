const dataCore = require('../data-core.js');
const datejs = require('datejs');

var incidentDateArray;

function filterForCategory(data, category) {
    return data.filter(row => row['category'] === category).map(row => {
        return Date.parse(row['Reported Date and Time'])
    });
}
function getHourFrequency(data) {
    var hours = data.map(element => {
        return element.getHours();
    });
    var hourFrequency = hours
        .reduce((acc, cur) => {
            acc[cur] = (acc[cur] + 1 || 1);
            return acc;
    }, [])

    for(let i = 0; i < hourFrequency.length; i++) {
        hourFrequency[i] = hourFrequency[i] || 0;
    }
    return hourFrequency;
}
function batchCategoryHour(data, category) {
    return getHourFrequency(filterForCategory(data, category));
}
dataCore.onDataLoaded(function(data) {
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
            headerFormat: '<span style=""><b>{point.key}</b></span><table>',

            pointFormat: '<p></p><td style="padding:0">{point.y} {series.name} Incidents</td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        
        plotOptions: {
            column: {
                groupPadding: 0,
                pointPadding: 0,
                borderWidth: 0
            }, series: {
                stacking: 'normal'
            }
        },
    
        series: [
        {
            name: 'Rape',
            data: batchCategoryHour(data, 'rape')
        },
        {
            name: 'Property & Trespass',
            data: batchCategoryHour(data, 'property-trespass')
        },
        {
            name: 'Substance',
            data: batchCategoryHour(data, 'substance')
        },
        {
            name: 'Assualt',
            data: batchCategoryHour(data, 'assault')
        },
        {
            name: 'Other',
            data: batchCategoryHour(data, 'other')
        }]
    
    });
});

