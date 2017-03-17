var bardata = [];
var country = [];
    d3.csv('test.csv', function(data) {
        console.log(data);

        for (key in data) {
            bardata.push(data[key].radius)
            country.push(data[key].country)
        }
    console.log(country);    

    var margin = { top: 20, right: 30, bottom: 150, left:60 }

    var height = 550 - margin.top - margin.bottom,
        width = 1100 - margin.left - margin.right,
        barWidth = 50,
        barOffset = 5;

    var tempColor;

    var colors = d3.scale.linear()
    .domain([0, bardata.length])
    .range(['#F9A74B','#FFFF66'])

    var yScale = d3.scale.linear()
            .domain([0, 300])
            .range([0, height]);


    var xScale = d3.scale.ordinal()
            .domain(d3.range(0, bardata.length))
            .rangeBands([0, width], 0.2)

    var tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('margin-left','10px')
            .style('padding', '0 10px')
            .style('border-radius', '10%')
            .style('background', 'white')
            .style('opacity', 0.5)
            .style('font-family', "Helvetica Neue")

    var myChart = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.top  +')')
        .selectAll('rect').data(bardata)
        .enter().append('rect')
            .style('fill', function(d,i) {
                return colors(i);
            })
            .attr('width', xScale.rangeBand())
            .attr('x', function(d,i) {
                return xScale(i);
            })
            .attr('height', 0)
            .attr('y', height)

        .on('mouseover', function(d) {

            tooltip.transition()
                .style('opacity', .9)

            tooltip.html(d)
                .style('left', (d3.event.pageX - 35) + 'px')
                .style('top',  (d3.event.pageY - 30) + 'px')


            tempColor = this.style.fill;
            d3.select(this)
                .style('opacity', .5)
                .style('fill', 'white')
        })

        .on('mouseout', function(d) {
            d3.select(this)
                .style('opacity', 1)
                .style('fill', tempColor)
        })

    myChart.transition()
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .delay(function(d, i) {
            return i * 20;
        })
        .duration(1000)
        .ease('elastic')

    var vGuideScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([height, 0])

    var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10)

    var vGuide = d3.select('#chart').select('svg').append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate(' + margin.left + ', ' + (margin.top) +')')
        vGuide.selectAll('path')
            .style({ fill: 'none', stroke: "white"})
        vGuide.selectAll('line')
            .style({ stroke: "white"})


    var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        // .tickValues(xScale.domain().filter(function(d, i) {
        //     // return !(i % (bardata.length/5));
        //     return "hello";
        // }))
        .tickFormat(function(d, i) {
            return country[i];
        });


    var hGuide = d3.select('#chart').select('svg').append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
        hGuide.selectAll('path')
            .style({ fill: 'none', stroke: "white"})
        hGuide.selectAll('line')
            .style({ stroke: "white"})
        hGuide.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".1em")
            .attr("transform", function(d) {
                return "rotate(-55)" 
                });
    d3.select("body").transition()
    .style("background-color", "rgb(120,120,120)");
    d3.selectAll("text")
    .style({ fill: "white"});
});