function donutchart() {
    var caption ="";
  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = 200,
    g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal(["#ffa14d", "#ef8c34", "#e8702d", "#f6c845", "#4d8cff", "#3b858a", "#2c6cdf","#1e4d9f","#7b8bad"]);

  var data = [
    { age: "Metabolish", population: 10, imgLink:"path/to/meta.svg" },
    { age: "Neuroscience", population: 10 , imgLink:"path/to/neur.svg" },
    { age: "Ophthalmology", population: 10 , imgLink:"path/to/opht.svg"},
    { age: "Immunology", population: 10 , imgLink:"path/to/immu.svg"},
    { age: "Hepatology", population: 10 , imgLink:"path/to/hepa.svg" },
    { age: "Dermatology", population: 10 , imgLink:"path/to/derma.svg"},
    { age: "Respiratory", population: 10 , imgLink:"path/to/resp.svg"},
    { age: "Cardiovascular", population: 10 , imgLink:"path/to/card.svg"},
    { age: "Coloretal", population: 10 , imgLink:"path/to/coles.svg"},
  ];

  var arc1  = d3.arc()
            .innerRadius(80)
            .outerRadius(radius);
            
  var arcOver1 = d3.arc()
            .innerRadius(80)
            .outerRadius(radius + 30);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.population;
    });

  var path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(80);

  var pathOver = d3
    .arc()
    .outerRadius(radius + 30)
    .innerRadius(80);

  var label = d3
    .arc()
    .outerRadius(100)
    .innerRadius(180);

    
  var arc = g
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arc
    .append("path")
    .attr("d", path)

    //.enter()
    //.append("p3").attr("d", pathImg1).attr("transform","translate(-2641.385 -427.016)")
    .attr("fill", function (d) {
      return color(d.data.age);
    })
    .on("mouseover", function(){
        d3.select(this)
        .attr("stroke","white")
        .transition()
        .duration(200)
        .attr('d',pathOver )
        .attr("stroke-width", 1); 
        
    })
    .on("mouseout", function(){
        d3.select(this).transition()
                 .duration(200)
                 .attr("d", path)
                 .attr("stroke", "none");
    })
    .on("click", function (d) {
      // The amount we need to rotate:
      var rotate = 180 - ((d.startAngle + d.endAngle) / 2 / Math.PI) * 180;
      caption = d.data.age;
      // Transition the pie chart
      g.transition()
        .attr(
          "transform",
          "translate(" +
            width / 2 +
            "," +
            height / 2 +
            ") rotate(" +
            rotate +
            ")"
        )
        .duration(1000);

      // Τransition the labels:
      text
        .transition()
        .attr("transform", function (dd) {
            
          return (
            "translate(" + label.centroid(dd) + ") rotate(" + -rotate + ")"
          );
        })


        .duration(1000)

        d3.select("span").text(caption);           

    });

  var text = arc
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .attr("dy", "3em")
    .attr("font-family", "sans-serif")
    .style("font-size", "10px")
    .style('fill', 'white')
    .text(function (d) {
      return d.data.age;
    });
   
    var arcImge = arc
    .append('image')
    .attr("transform", function (d) {
        return "translate(" + path.centroid(d) + ")";
      })
      //.attr("dy", "5em")
    .attr('xlink:href', function(d){
        return d.data.imgLink;
    })
    .attr('height', '20')
    .attr('width', '20')

}
function addTest(text){
    d3.select('body')
    .append('div')
    .html(arr.join('<br/>'));
}
