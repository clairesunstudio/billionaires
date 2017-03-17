var allData = [];

var bilMap;

function calculateBillionaires(fromYear) {

    billionaires = [];

    var existing = {};

    for(var i = 0; i < allData.length;i++) {
        var row = allData[i];

        if(!fromYear || (row.time <= fromYear)) {

            if(existing[row.country]) {
             existing[row.country].radius += 1;


             existing[row.country].names +=  "No."+row.Rank + " "+ " "+ " "+row.Name + "<br/>";


            } else {
                var billionaire = {};
                billionaire.time = row.time;
                billionaire.country = row.country;
                billionaire.latitude = row.latitude;
                billionaire.longitude = row.longitude;
                billionaire.fillKey = row.fillKey;
                // for(var i = 0; i < allData.length;i++) {
                billionaire.names = row.Name;
                billionaire.rank = row.Rank;
            // }
            // for(key in row) {
            //    billionaire[key] = row[key];
            // }
                billionaire.radius = 1;
                billionaires.push(billionaire);
                existing[row.country] = billionaire;
                existing[row.country].names = "No."+ existing[row.country].rank + " "+ " "+ existing[row.country].names + "<br/>";
            }



            console.log(billionaire.country+":"+billionaire.radius)
            // console.log(billionaire.names)
        }
    }
}


function drawBillionaires() {

//draw bubbles for billionaires
bilMap.bubbles(billionaires, {
    popupTemplate: function (geo, data) {
            return ['<div class="hoverinfo">' +  data.country,
            ' has ' +  data.radius + '',
            ' billionaires: ',
            '<div class="list">' + data.names +'</div>',
            '</div>'].join('');
    }
});

}

d3.csv('data/IT.csv', function(data) {
        console.log(data);

        billionaires=[];

        for (key in data) {
            allData.push(data[key])
            // console.log(data[key].radius)
        }




bilMap = new Datamap({
    element: document.getElementById('container'),
    scope: 'world',
    geographyConfig: {
        popupOnHover: false,
        highlightOnHover: true
    },

    fills: {
        'USA': '#F9A74B',  //color of the bubbles
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

calculateBillionaires();
drawBillionaires();
graphBillionaires();



});
