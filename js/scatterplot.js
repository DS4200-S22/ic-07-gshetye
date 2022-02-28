/*

In-class activity 08 starter code
Prof. Mosca
Modified: 12/08/21

*/

// Build your scatterplot in this file

// Creates the  SVG in csv-bar for the second barchart
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// To do this, we'll need a python simple server
// (python3 -m http.server) running from the directory that
// our code is in.

d3.csv("data/scatter.csv").then((data) => {

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function

  // let's check our data
  console.log(data);

  // Our first step to mapping data to pixels is to find the
  //  ranges for our x and y values

  // find max X
  let maxX3 = d3.max(data, (d) => { return d.day; });
  console.log("Max x: " + maxX3);

  // find max Y
  let maxY3 = d3.max(data, (d) => { return d.score; });
  console.log("Max y: " + maxY3);

  // Now that we have our maxes we define scale functions that
  // map our data values (domain for the scale function) to our
  // pixel values (range for the scale function)

  let xScale3 = d3.scaleLinear() // linear scale because we have
                                // linear data
                  .domain([0, maxX3])  // inputs for the function
                  .range([margin.left, width - margin.right]);
                  // ^ outputs for the function

  let yScale3 = d3.scaleLinear()
              .domain([0, maxY3])
              .range([height - margin.bottom, margin.top]);

// Adding a new div with class tooltip
const tooltip2 = d3.select("#csv-scatter")
                  .append("div")
                  .attr('id', "tooltip2")
                  .style("opacity", 0)
                  .attr("class", "tooltip");

// Creates a function for adding text to the tooltip div
const mouseover2 = function(event, d) {
    tooltip2.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
            .style("opacity", 1);
              }

// Creates a function that puts the position of the tooltip to the mouse's position
const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.pageX)+"px")
            .style("top", (event.pageY + yTooltipOffset) +"px");
              }

// Creates a function to make the tooltip disappear when the mouse leaves the bar
const mouseleave2 = function(event, d) {
    tooltip2.style("opacity", 0);
              }

// Add x axis to svg6
svg3.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(0,${height - margin.bottom})`)
// ^ moves axis to bottom of svg
      .call(d3.axisBottom(xScale3)) // built in function for bottom
// axis given a scale function
      .attr("font-size", '20px'); // set font size

// Add y axis to svg6
svg3.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(${margin.left}, 0)`)
// ^ move axis inside of left margin
      .call(d3.axisLeft(yScale3)) // built in function for left
// axis given a scale function
      .attr("font-size", '20px'); // set font size

svg3.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", (d) => xScale3(d.day)) // use xScale to return
// pixel value for given datum
          .attr("cy", (d) => yScale3(d.score)) // use yScale to return
// pixel value for given datum
          .attr("r", 10)
          .attr("class", "circle")
          .on("mouseover", mouseover2)
          .on("mousemove", mousemove2)
          .on("mouseleave", mouseleave2);
});
