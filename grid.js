exports.initGrid = (height, width) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i][j] = null;
    }
  }
  return grid;
};

exports.printGrid = (grid, height, width) => {
  process.stdout.write("\t");
  for (let i = 0; i < width; i++) {
    process.stdout.write(i + 1 + "\t");
  }
  process.stdout.write("\n");
  for (let i = 0; i < height; i++) {
    process.stdout.write(i + 1 + "\t");
    for (let j = 0; j < width; j++) {
      if (!grid[i][j]) {
        process.stdout.write("_\t");
      } else {
        process.stdout.write(grid[i][j] + "\t");
      }
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
};

exports.placeBombs = (grid, height, width, bombsRate) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (Math.random() < bombsRate) {
        grid[i][j] = "B";
      }
    }
  }
};

const bombsAroundPosition = (grid, row, col, height, width) => {
  let bombsAround = 0;
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
      col + colChange < width
    ) {
      if (grid[row + rowChange][col + colChange] === "B") {
        bombsAround++;
      }
    }
  });
  return bombsAround.toString();
};

exports.placeNums = (grid, height, width) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!grid[i][j]) {
        grid[i][j] = bombsAroundPosition(grid, i, j, height, width);
      }
    }
  }
};
