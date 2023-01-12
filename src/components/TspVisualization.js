import React, { useState,useEffect,useRef } from 'react';
import {cities, calculateTotalDistance, hillClimbing} from './tspSolver'
import { euclideanDistance } from './tspSolver';
import { createTspChart } from './tspChart';
import * as d3 from 'd3';



function TspVisualization() {
  const [currentSolution, setCurrentSolution] = useState([]);
  const [currentDistance, setCurrentDistance] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      createTspChart(d3.select(svgRef.current), currentSolution, euclideanDistance);
    }
  },
  // [svgRef, currentSolution, euclideanDistance])
  )
  const handleStartClick = () => {
    const solution = hillClimbing(cities, euclideanDistance);
    setCurrentSolution(solution);
    setCurrentDistance(calculateTotalDistance(solution, euclideanDistance));
  }

  return (
    <div>
      <button onClick={handleStartClick}>Start</button>
      <svg ref={svgRef} width={800} height={600} />
      <div>
        <p>Current solution: {currentSolution.map(city => city.name).join(', ')}</p>
        <p>Current distance: {currentDistance}</p>
      </div>
    </div>
  );
}







// function TspVisualization() {
//     const [currentSolution, setCurrentSolution] = useState([]);
//     const [currentDistance, setCurrentDistance] = useState(0);
//     const svgRef = React.useRef(null);
//     useEffect(() => {
//     //    const svg = d3.select(svgRef.current);
//     const svg = d3.select("#chart").append("svg")
//     .attr("width", 800)
//     .attr("height", 600); 
//         const solution = hillClimbing(cities, euclideanDistance);
//         setCurrentSolution(solution);
//         setCurrentDistance(calculateTotalDistance(solution, euclideanDistance));
//        // createTspChart(svg, solution, euclideanDistance);
//        createTspChart(svg, currentSolution, euclideanDistance);
//     }, [currentSolution])
 

//     const handleStartClick = () => {
//         const solution = hillClimbing(cities, euclideanDistance);
//         setCurrentSolution(solution);
//         setCurrentDistance(calculateTotalDistance(solution, euclideanDistance));
//         const svgRef = d3.select("#chart");
//         createTspChart(svgRef.current, solution, euclideanDistance);
//     }

//     return (
//         <div>
//             <button onClick={handleStartClick}>Start</button>
//             <svg ref={svgRef} width={800} height={600} />
//             {/* <svg id="chart" ></svg> */}
//             <div>
//                 <p>Current solution: {currentSolution.map(city => city.name).join(', ')}</p>
//                 <p>Current distance: {currentDistance}</p>
//             </div>
//         </div>
//     );
// }
export default TspVisualization;

// function TspVisualization() {
//     const [solution, setSolution] = useState([]);




// const handleSolveClick = () => {
//     const result = hillClimbing(cities, euclideanDistance);
//     setSolution(result);
// }

// return (
//     <div>
//         <button onClick={handleSolveClick}>Solve</button>
//         <div>
//             {solution.map(city => (
//                 <div key={city.id}>{city.name}</div>
//             ))}
//         </div>
//     </div>
// )
//   }

// export default TspVisualization;
