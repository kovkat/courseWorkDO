import * as Generator from '../generator/taskGenerator.js';

export function generateMatrix(numOfStudents, tau, deltaTau) {
  let matrix = [];

  for (let i = 0; i < numOfStudents; i += 1) {
    matrix[i] = [];

    for (let j = 0; j < numOfStudents; j += 1) {
      if (i % 2 === j % 2) {
        matrix[i][j] = Infinity;
        continue;
      }

      let minVal = tau - deltaTau;
      let maxVal = tau + deltaTau;

      matrix[i][j] = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    }
  }

  return matrix;
}

function findNearestNeighbor(matrix, current, visited) {
  let nearest = -1;
  let minDistance = Infinity;

  for (let i = 0; i < matrix.length; i++) {
    if (!visited.has(i) && matrix[current][i] < minDistance) {
      minDistance = matrix[current][i];
      nearest = i;
    }
  }

  return nearest;
}

export function greedySchedule(matrix) {
  let numOfStudents = matrix.length;
  let visited = new Set();
  let schedule = [];

  let current = Math.floor(Math.random() * numOfStudents);
  schedule.push(current);
  visited.add(current);

  while (schedule.length < numOfStudents) {
    let next = findNearestNeighbor(matrix, current, visited);
    if (next === -1) break;

    schedule.push(next);
    visited.add(next);
    current = next;
  }

  return schedule;
}

// Additional function for the timeTest
export function getGreedyResults(matrix) {
  const startTime = performance.now();

  let numOfStudents = matrix.length;
  let visited = new Set();
  let schedule = [];

  let current = Math.floor(Math.random() * numOfStudents);
  schedule.push(current);
  visited.add(current);

  while (schedule.length < numOfStudents) {
    let next = findNearestNeighbor(matrix, current, visited);
    if (next === -1) break;

    schedule.push(next);
    visited.add(next);
    current = next;
  }

  const endTime = performance.now();
  const executionTimeGreedy = endTime - startTime;

  return {
    schedule,
    executionTimeGreedy,
  };
}

export function calculateTotalPreparationTime(matrix, schedule) {
  let total = 0;
  for (let i = 0; i < schedule.length - 1; i++) {
    total += matrix[schedule[i]][schedule[i + 1]];
  }
  return total;
}
