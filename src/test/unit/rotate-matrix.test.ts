import rotateMatrix from '../../functions/rotate-matrix';

describe('Matrix Rotation', () => {
  test('Rotate 1x1 matrix', () => {
    const matrix: number[][] = [[1]];
    const expected: number[][] = [[1]];
    expect(rotateMatrix(matrix)).toEqual(expected);
  });

  test('Rotate 3x3 matrix', () => {
    const matrix: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expected: number[][] = [
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ];
    expect(rotateMatrix(matrix)).toEqual(expected);
  });

  test('Rotate 4x4 matrix', () => {
    const matrix: number[][] = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const expected: number[][] = [
      [4, 8, 12, 16],
      [3, 7, 11, 15],
      [2, 6, 10, 14],
      [1, 5, 9, 13],
    ];
    expect(rotateMatrix(matrix)).toEqual(expected);
  });

  test('Rotate 2x2 matrix', () => {
    const matrix: number[][] = [
      [1, 2],
      [3, 4],
    ];
    const expected: number[][] = [
      [2, 4],
      [1, 3],
    ];
    expect(rotateMatrix(matrix)).toEqual(expected);
  });

  test('Rotate empty matrix', () => {
    const matrix: number[][] = [];
    const expected: number[][] = [];
    expect(rotateMatrix(matrix)).toEqual(expected);
  });
});
