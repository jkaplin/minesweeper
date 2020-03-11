const openAroundPosition = (visibleGrid, grid, row, col, height, width) => {
  const positionsAround = [
    [-1, -1], // Up-Left
    [-1, 0], // Up
    [-1, 1], // Up-Right
    [0, 1], // Right
    [1, 1], // Down-Right
    [1, 0], // Down
    [1, -1], // Down-Left
    [0, -1] // Left
  ];
  positionsAround.forEach(([rowChange, colChange]) => {
    if (
      row + rowChange >= 0 &&
      row + rowChange < height &&
      col + colChange >= 0 &&
      col + colChange < width &&
      !visibleGrid[row + rowChange][col + colChange]
    ) {
      visibleGrid[row + rowChange][col + colChange] =
        grid[row + rowChange][col + colChange];
      if (grid[row + rowChange][col + colChange] === "0") {
        openAroundPosition(
          visibleGrid,
          grid,
          row + rowChange,
          col + colChange,
          height,
          width
        );
      }
    }
  });
};

const checkWin = (visibleGrid, grid, height, width) => {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (!visibleGrid[row][col]) {
        return false;
      }
      if (visibleGrid[row][col] === "F" && grid[row][col] !== "B") {
        return false;
      }
    }
  }
  return true;
};

exports.playTurn = (visibleGrid, grid, height, width, { row, col, guess }) => {
  if (guess.toLowerCase() === "f") {
    visibleGrid[row][col] = "F";
  } else {
    if (grid[row][col] === "B") {
      return "lost";
    }
    visibleGrid[row][col] = grid[row][col];
    if (grid[row][col] === "0") {
      openAroundPosition(visibleGrid, grid, row, col, height, width);
    }
  }
  if (checkWin(visibleGrid, grid, height, width)) {
    return "won";
  }
  return null;
};
