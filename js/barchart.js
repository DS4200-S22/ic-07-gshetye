/*

In-class activity 08 starter code
Prof. Mosca
Modified: 12/08/21

*/

// Build your bar charts in this file


// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset = 15;


// Adds an SVG in the hard-coded-bar div with a viewbox
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/

// Gets the maximum value from the score
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Scales the y axis
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]);

// Scales the x axis
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

// Adds the y axis to the page
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1))
   .attr("font-size", '20px');

// Adds the x axis to the page
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale1)
            .tickFormat(i => data1[i].name))
    .attr("font-size", '20px');

/*

  Tooltip Set-up

*/

// Adding a new div with class tooltip
const tooltip1 = d3.select("#hard-coded-bar")
                .append("div")
                .attr('id', "tooltip1")
                .style("opacity", 0)
                .attr("class", "tooltip");

// Creates a function for adding text to the tooltip div
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
          .style("opacity", 1);
}

// Creates a function that puts the position of the tooltip to the mouse's position
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px")
          .style("top", (event.pageY + yTooltipOffset) +"px");
}

// Creates a function to make the tooltip disappear when the mouse leaves the bar
const mouseleave1 = function(event, d) {
  tooltip1.style("opacity", 0);
}

/*

  Bars

*/

// Creates all the bars in SVG1 with the bar class and sets its attributes and events
svg1.selectAll(".bar")
   .data(data1)
   .enter()
   .append("rect")
     .attr("class", "bar")
     .attr("x", (d,i) => xScale1(i))
     .attr("y", (d) => yScale1(d.score))
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
     .attr("width", xScale1.bandwidth())
     .on("mouseover", mouseover1)
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// Creates the second SVG in csv-bar for the second barchart

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


// reads the csv and stores the data in data
d3.csv("data/barchart.csv").then((data) => {

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function

  // let's check our data
  console.log(data);

  // Gets the maximum value from the score
  let maxY2 = d3.max(data, function(d) { return d.score; });

  // Scales the y axis
  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]);

  // Scales the x axis
  let xScale2 = d3.scaleBand()
              .domain(d3.range(data1.length))
              .range([margin.left, width - margin.right])
              .padding(0.1);

  // Adds the y axis to the page
  svg2.append("g")
     .attr("transform", `translate(${margin.left}, 0)`)
     .call(d3.axisLeft(yScale2))
     .attr("font-size", '20px');

  // Adds the x axis to the page
  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale2)
              .tickFormat(i => data[i].name))
      .attr("font-size", '20px');

  // Creates all the bars in SVG2 with the bar class and sets its attributes and events
  svg2.selectAll(".bar")
     .data(data)
     .enter()
     .append("rect")
       .attr("class", "bar")
       .attr("x", (d,i) => xScale2(i))
       .attr("y", (d) => yScale2(d.score))
       .attr("height", (d) => (height - margin.bottom) - yScale2(d.score))
       .attr("width", xScale2.bandwidth())
       .on("mouseover", mouseover1)
       .on("mousemove", mousemove1)
       .on("mouseleave", mouseleave1);
});
