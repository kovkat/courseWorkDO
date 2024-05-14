// Pohorila Dariia
import * as taskGenerator from '../../generator/taskGenerator.js';
import * as matrixReduction from './matrixReduction.js';
import * as penalties from './penalties.js';
import * as etapThree from './etapThree.js';

// let matrix = taskGenerator.generateMatrix(8, 15, 5);
// console.table(matrix);

// Матриця переналаштувань
console.log('МАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ');
let precedenceMatrix = [
  [Infinity, 15, Infinity, 20, Infinity, 5, Infinity, 10],
  [5, Infinity, 15, Infinity, 5, Infinity, 10, Infinity],
  [Infinity, 20, Infinity, 15, Infinity, 5, Infinity, 5],
  [10, Infinity, 20, Infinity, 5, Infinity, 10, Infinity],
  [Infinity, 15, Infinity, 15, Infinity, 5, Infinity, 5],
  [10, Infinity, 15, Infinity, 10, Infinity, 10, Infinity],
  [Infinity, 20, Infinity, 20, Infinity, 10, Infinity, 5],
  [5, Infinity, 15, Infinity, 5, Infinity, 5, Infinity],
];
console.table(precedenceMatrix);

///// ЕТАП-1. ЗВЕДЕННЯ МАТРИЦІ
console.log('ЕТАП-1. ЗВЕДЕННЯ МАТРИЦІ');
// Знаходження мінімальних елементів по стовпцях
let minsByCols = matrixReduction.minFromColumns(precedenceMatrix);
console.log('Мінімальні по стовпцях:', minsByCols.join(' '));

// Віднімання мінімумів по стовпцях
let { matrix: newMatrixCols, newMinBorderCols } =
  matrixReduction.subEveryColumn(precedenceMatrix, 0);

precedenceMatrix = newMatrixCols; // присвоїти початковій матриці нову

console.log('Матриця після віднімання мінімумів по стовпцях:');
console.table(newMatrixCols);
console.log('Нова мінімальна границя:', newMinBorderCols);

// Знайти мінімальні елементи по рядкам
let minsByRows = matrixReduction.minFromRows(precedenceMatrix);
console.log('Мінімальні по рядкам:', minsByRows.join(' '));

// Віднімання мінімумів по рядках
let { matrix: newMatrixRows, newMinBorderRows } = matrixReduction.subEveryRow(
  precedenceMatrix,
  newMinBorderCols
);

precedenceMatrix = newMatrixRows; // присвоїти початковій матриці нову

console.log('Матриця після віднімання мінімумів по рядках:');
console.table(precedenceMatrix);
console.log('Нова мінімальна границя:', newMinBorderRows);

///// ЕТАП-2. ПОШУК ШТРАФІВ
// Матриця штрафів
console.log('ЕТАП-2. ОБЧИСЛЕННЯ ШТРАФІВ');
let penaltiesMatrix = penalties.calculatePenalties(precedenceMatrix);
console.log('Матриця штрафів для нулів:');
console.table(penaltiesMatrix);

// Максимальний штраф та ребро
let maxPenalty = penalties.findMaxPenalty(penaltiesMatrix);
console.log('Максимальний штраф:', maxPenalty.value);
console.log(`Ребро: (${maxPenalty.row}, ${maxPenalty.column})`);

// Масив знайдених ребер (додається автоматично в findMaxPenalty)
let edges = penalties.edgesArray;

///// ЕТАП-3. ВИКЛЮЧЕННЯ РЕБРА
/**
 * 1. В рядку і стовпчику знайденого ребра Infinity
 * 2. Заборона негамільтонових циклів
 */
// Присвоюємо елементам рядка і стовпчика знайденого ребра значення Infinity
precedenceMatrix = etapThree.replaceRowAndColumnWithInfinity(
  precedenceMatrix,
  maxPenalty.row,
  maxPenalty.column
);
console.log(
  `Матриця після заміни ребра (${maxPenalty.row}, ${maxPenalty.column}) на Infinity: `
);
console.table(precedenceMatrix);

// Заборонити негамільтонові цикли
precedenceMatrix = etapThree.preventCycles(precedenceMatrix, edges);
console.table(precedenceMatrix);