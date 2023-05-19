const rotateMatrix = (matrix: number[][]): number[][] => {
  // Create an empty matrix to store the rotated values.
  const result: number[][] = [];

  // Loop through the matrix and push the values into the result matrix.
  for (let i = 0; i < matrix.length; i++) {
    result.push([]);
    for (let j = 0; j < matrix.length; j++) {
      result[i][j] = matrix[j][matrix.length - i - 1];
    }
  }

  return result;
};

export default rotateMatrix;
