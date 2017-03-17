/*var billionaires = [{
        radius: 30,
        country: 'Russia',
        fillKey: 'RUS',
        latitude: 73.482,
        longitude: 54.5854
      },{
        radius: 50,
        country: 'China',
        fillKey: 'CHN',
        latitude:  39.55,
        longitude: 116.20

      },{
        radius: 100,
        country: 'USA',
        fillKey: 'USA',
        latitude: 39.91,
        longitude: -77.02

      },
    ];
*/

d3.csv('data/all.csv', function(data) {
        console.log(data);

        billionaires=[];

        for (key in data) {
            billionaires.push(data[key])
            console.log(data[key])
        }

// billionaires[0].worth=2235;




var bilMap = new Datamap({
    element: document.getElementById('container'),
    scope: 'world',
    geographyConfig: {
        popupOnHover: false,
        highlightOnHover: true
    },

    fills: {
        'USA': '#F9A74B',  //color of the bubbles '#2ca02c'
        'RUS': 'rgb(192,192,192)',
        'CHN': 'rgb(192,192,192)',
        // 'PRC': '#2ca02c',
        // 'IND': '#e377c2',
        // 'GBR': '#8c564b',
        // 'FRA': '#d62728',
        // 'PAK': '#7f7f7f',
        defaultFill: 'rgb(120,120,120)'
    },
    data: {


        // 'RUS': {fillKey: 'RUS'},
        // 'PRC': {fillKey: 'PRC'},
        // 'IND': {fillKey: 'IND'},
        // 'GBR': {fillKey: 'GBR'},
        // 'FRA': {fillKey: 'FRA'},
        // 'PAK': {fillKey: 'PAK'},
        // 'USA': {fillKey: 'USA'},
        // 'CHN': {fillKey: 'CHN'}
    }


});



//draw bubbles for billionaires
bilMap.bubbles(billionaires, {
    popupTemplate: function (geo, data) {
            return ['<div class="hoverinfo">' +  data.country,
            ' has ' +  data.radius + '',
            ' billionaires',
            '</div>'].join('');
    }
});


});
