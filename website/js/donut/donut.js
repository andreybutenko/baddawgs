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
                    },
                    crop: false,
                    overflow: 'none'
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Percent of Records',
            innerSize: '50%',
            data: [
                ['Rape', data.filter(row => row['category'] == 'rape').length],
                ['Property & Trespass', data.filter(row => row['category'] == 'property-trespass').length],
                ['Substance', data.filter(row => row['category'] == 'substance').length],
                ['Assault', data.filter(row => row['category'] == 'assault').length],
                ['Other', data.filter(row => row['category'] == 'other').length]


                // {
                //     name: 'Other',
                //     y: data.filter(row => row['category'] == 'other').length,
                //     dataLabels: {
                //         enabled: false
                //     }
                // }
            ]
        }]
    });

});

Highcharts.theme = {
    colors: ['#C0392B', '#2880B9', '#27AE60', '#D35401', '#999999'],
    // chart: {
    //     backgroundColor: {
    //         linearGradient: [0, 0, 500, 500],
    //         stops: [
    //             [0, 'rgb(255, 255, 255)'],
    //             [1, 'rgb(240, 240, 255)']
    //         ]
    //     },
    // },
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

/*
temp1.map(row => {
  return row['Case Disposition']
});


data.filter(row => row['Case Disposition'] == 'Open');

data.map(row => {
  return { 'Case Disposition': row['Case Disposition'] }
});


 */