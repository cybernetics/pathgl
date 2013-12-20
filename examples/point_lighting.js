examples.point_lighting = function (selector) {
  var data = d3.range(500).map(function() {
               return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
             });

  var width = 960,
      height = 500;

  var x = d3.scale.linear()
          .domain([-5, 5])
          .range([0, width]);

  var y = d3.scale.linear()
          .domain([-5, 5])
          .range([0, height]);

  var time0 = Date.now(),
      time1;

  var svg = d3.select(selector)
            .attr("width", width)
            .attr("height", height);

  var circle = svg.selectAll("circle")
               .data(data)
               .enter().append("circle")
               .attr("cx", 10)
               .attr("cy", 10)
               .attr("r", 1);

  d3.timer(function() {
    data.forEach(function(d) {
      d.xloc += d.xvel;
      d.yloc += d.yvel;
      d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.xloc;
      d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
    });

    circle
    .attr("transform", function(d) { return "translate(" + x(d.xloc) + "," + y(d.yloc) + ")"; })
    .attr("r", function(d) { return Math.min(1 + 1000 * Math.abs(d.xvel * d.yvel), 10); });

    time1 = Date.now();
    fps.text(Math.round(1000 / (time1 - time0)));
    time0 = time1;
  });
}