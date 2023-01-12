//import React, { useState } from 'react';
function generateInitialSolution(cities) {
    // randomly select a starting city
    let startingCity = cities[Math.floor(Math.random() * cities.length)];
    
    // create a copy of the cities array and remove the starting city
    let remainingCities = [...cities];
    remainingCities.splice(remainingCities.indexOf(startingCity), 1);
    
    // shuffle the remaining cities
    for (let i = remainingCities.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [remainingCities[i], remainingCities[j]] = [remainingCities[j], remainingCities[i]];
    }
    
    // construct and return the initial solution
    let initialSolution = [startingCity, ...remainingCities];
    return initialSolution;
  }
  

  function generateNeighborSolutions(currentSolution) {
    let neighborSolutions = [];
    for (let i = 0; i < currentSolution.length - 1; i++) {
      for (let j = i + 1; j < currentSolution.length; j++) {
        // copy the current solution
        let neighbor = [...currentSolution];
    
        // swap two cities
        [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
    
        // add the new neighbor solution to the array
        neighborSolutions.push(neighbor);
      }
    }
    return neighborSolutions;
  }
  export const cities = [
    { id: 1, name: "City A", x: 5, y: 10 },
    { id: 2, name: "City B", x: 15, y: 20 },
    { id: 3, name: "City C", x: 30, y: 40 },
    {id: 4, name: "City D", x: 40, y: 50 },
    {id: 5, name: "City E", x: 3, y: 5 },
    /* ... */
  ];
  

  export function calculateTotalDistance(solution, distanceFunction) {
    let totalDistance = 0;
    for (let i = 0; i < solution.length - 1; i++) {
      let cityA = solution[i];
      let cityB = solution[i + 1];
      totalDistance += distanceFunction(cityA, cityB);
    }
    return totalDistance;
  }
  
  export function euclideanDistance(cityA, cityB) {
    let xDiff = cityA.x - cityB.x;
    let yDiff = cityA.y - cityB.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
  

  export  function hillClimbing(cities, distanceFunction) {
    // generate an initial solution
    let currentSolution = generateInitialSolution(cities);
    let currentDistance = calculateTotalDistance(currentSolution, distanceFunction);
  
    // set a flag to indicate if we've found a local optimum
    let foundLocalOptimum = false;
  
    // iterate until we've found a local optimum
    while (!foundLocalOptimum) {
      // generate neighbor solutions
      let neighborSolutions = generateNeighborSolutions(currentSolution);
    
      // calculate the distance for each neighbor solution
      let neighborDistances = neighborSolutions.map(solution => calculateTotalDistance(solution, distanceFunction));
    
      // find the index of the best neighbor solution
      let bestNeighborIndex = neighborDistances.indexOf(Math.min(...neighborDistances));
    
      // check if the best neighbor solution is better than the current solution
      if (neighborDistances[bestNeighborIndex] < currentDistance) {
        // move to the best neighbor solution
        currentSolution = neighborSolutions[bestNeighborIndex];
        currentDistance = neighborDistances[bestNeighborIndex];
      } else {
        // no improvement was found, we've found a local optimum
        foundLocalOptimum = true;
      }
    }
  
    // return the final solution
    return currentSolution;
  }
  // function hillClimbing(cities, distanceFunction) {
  //   // generate an initial solution
  //   let currentSolution = generateInitialSolution(cities);
  //   let currentDistance = calculateTotalDistance(currentSolution, distanceFunction);

  //   // set a flag to indicate if we've found a local optimum
  //   let foundLocalOptimum = false;

  //   // iterate until we've found a local optimum
  //   while (!foundLocalOptimum) {
  //     // generate neighbor solutions
  //     let neighborSolutions = generateNeighborSolutions(currentSolution);

  //     // calculate the distance for each neighbor solution
  //     let neighborDistances = neighborSolutions.map(solution => calculateTotalDistance(solution, distanceFunction));

  //     // find the index of the best neighbor solution
  //     let bestNeighborIndex = neighborDistances.indexOf(Math.min(...neighborDistances));
  //     if (neighborDistances[bestNeighborIndex] < currentDistance) {
  //       // move to the best neighbor solution
  //       currentSolution = neighborSolutions[bestNeighborIndex];
  //       currentDistance = neighborDistances[bestNeighborIndex];
  //       } else {
  //       // no improvement was found, we've found a local optimum
  //       foundLocalOptimum = true;
  //       }
  //       }
  //       return currentSolution;}