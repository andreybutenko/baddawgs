const dataCore = require('../data-core.js');

dataCore.onDataLoaded(function(data) {
    console.log(data);

    var length = data.length; // if we need to do percentages
    // console.log(data.filter(row => row['Case Disposition'] == 'Open').length);

    Highcharts.chart('semicircle', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '60-Day Crime<br>Decomposition',
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
            name: '% of Records',
            innerSize: '50%',
            data: [
                ['Property & Trespass', data.filter(row => row['category'] == 'property-trespass').length],
                ['Assault', data.filter(row => row['category'] == 'assault').length],
                ['Rape', data.filter(row => row['category'] == 'rape').length],
                ['Substance', data.filter(row => row['substance'] == 'other').length],
                {
                    name: 'Other',
                    y: data.filter(row => row['category'] == 'other').length,
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