const dataCore = require('../data-core.js');

dataCore.onDataLoaded(function(data) {
    console.log(data);

    var length = data.length; // if we need to do percentages
    console.log(data.filter(row => row['Case Disposition'] == 'Open').length);

    Highcharts.chart('semicircletest', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Crime<br>Decomposition',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: [
                ['property-trespass', data.filter(row => row['Case Disposition'] == 'Open').length],
                ['assault', data.filter(row => row['Case Disposition'] == 'Open').length],
                ['rape', data.filter(row => row['Case Disposition'] == 'Open').length],
                ['other', data.filter(row => row['Case Disposition'] == 'Open').length],
                ['substance', data.filter(row => row['Case Disposition'] == 'Open').length],
                {
                    name: 'Other',
                    y: data.filter(row => row['Case Disposition'] == 'Open').length,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });

});

/*
temp1.map(row => {
  return row['Case Disposition']
});


data.filter(row => row['Case Disposition'] == 'Open');

data.map(row => {
  return { 'Case Disposition': row['Case Disposition'] }
});


 */