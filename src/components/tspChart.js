import * as d3 from 'd3';
import {cities, hillClimbing} from './tspSolver'
import { euclideanDistance } from './tspSolver';

function createTspChart(svg, solution, distanceFunction) {
  // define the x and y scales
  const xScale = d3.scaleLinear()
    .domain([d3.min(solution, d => d.x), d3.max(solution, d => d.x)])
    .range([0, svg.attr("width")]);
  const yScale = d3.scaleLinear()
    .domain([d3.min(solution, d => d.y), d3.max(solution, d => d.y)])
    .range([svg.attr("height"), 0]);
  
  // create a line generator
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveMonotoneX);
  
  // add the line to the svg
  svg.append("path")
    .datum(solution)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2);
  
  // add circles for the cities
  svg.selectAll("circle")
    .data(solution)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5)
    .attr("fill", (d, i) => i === 0 ? "red" : i === solution.length - 1 ? "green" : "black");
}

// Usage
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", 800)
  .attr("height", 600);

const solution = hillClimbing(cities, euclideanDistance);
createTspChart(svg, solution, euclideanDistance);
export { createTspChart};