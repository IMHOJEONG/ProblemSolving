let width = 1050,
    height = 850;
let ydata = [0];

for(let i = 2000 ; i <= 18000 ; i+=2000){
  ydata.push(i);
}
let svg = d3.select("body")
.append('svg')
.attr("width", width)
.attr("height", height)

svg.append('text')
.attr('id', 'title')
.attr("x", 350)             
.attr("y", 30)
.attr('font-size', '30px')
.attr("text-anchor", "middle")  
.text('United States GDP')

svg.append('text')
.attr('transform', 'rotate(-90)')
.attr("x", -150)             
.attr("y", 100)
.attr("class", "tick")
.attr('font-size', '15px')
.attr("text-anchor", "middle") 
.text('Gross Domestic Product')


let scale = d3.scaleTime()
.domain([new Date("1945"), new Date("2015")])
.range([0,990])

let yscale =d3.scaleLinear()
.domain([d3.min(ydata), d3.max(ydata)])
.range([800,50])

let x_axis = d3.axisBottom()

.scale(scale);

let y_axis = d3.axisLeft()
.scale(yscale);

svg.append('g')
  .attr('id', 'x-axis')
.attr('class','tick')
  .attr("transform", "translate(50, " + (height * 0.953)  +")")
.call(x_axis)

svg.append('g')
  .attr('id', 'y-axis')
.attr('class','tick')
.attr("transform", "translate(50, 10)")
.call(y_axis)


var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
var tooltip = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("display", "none");


d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(
  function(data){
   let datas = data.data;

    datas.forEach(function(d){
      
      // console.log(d);
    });
     x.domain(datas.map(function(d) { return d[0]; }));
  y.domain([0, d3.max(datas, function(d) { return d[1]; })]);
    
 
    
      svg.selectAll(".bar")
      .data(datas)
    .enter().append("rect")
      .attr('transform', 'translate(' + 50 + ','+ (-35)+")")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d[0]); })
      .attr("data-date", function(d) { return x(d[0]); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d[1]); })
      .attr("data-gdp", function(d) { return x(d[0]); })
      .attr("height", function(d) { return height-5-y(d[1]); })
      .on("mouseover", function() { tooltip.style("display", "block"); })
      .on("mouseout",  function() { tooltip.style("display", "none"); })
      .on("mousemove", function(event, d) {
                tooltip.style("left", (event.pageX + 25) + "px");
                tooltip.style("top", (event.pageY - 50) + "px");
                tooltip.html(`<p><div>${d[0].slice(0,4)} Q${parseInt(parseInt(d[0].slice(5,7))/3)+1}</div><span style='color:black'>$${d[1]} Billion</span></p>`); 
            })
         
    
  }
)