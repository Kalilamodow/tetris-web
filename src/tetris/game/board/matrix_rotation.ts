// Thanks to https://stackoverflow.com/a/58668351!!!

type Matrix<T> = T[][];

export const rotateClockwise = <T>(matrix: Matrix<T>): Matrix<T> =>
  matrix[0].map((_, ogIndex) => matrix.map((row) => row[ogIndex]).reverse());

export const rotateCounterClockwise = <T>(matrix: Matrix<T>): Matrix<T> =>
  matrix[0].map((_, ogIndex) =>
    matrix.map((row) => row[row.length - 1 - ogIndex]),
  );
