const config = require("./config");
const { initGrid, printGrid, placeBombs, placeNums } = require("./grid");
const { playTurn } = require("./turn");
const getInput = require("./getInput");

const game = async () => {
  const grid = initGrid(config.height, config.width);
  placeBombs(grid, config.height, config.width, config.bombsRate);
  placeNums(grid, config.height, config.width);
  const visibleGrid = initGrid(config.height, config.width);
  let result = null;
  while (!result) {
    printGrid(visibleGrid, config.height, config.width);
    const input = await getInput(visibleGrid, config.height, config.width);
    result = playTurn(visibleGrid, grid, config.height, config.width, input);
  }
  console.log(`You ${result}`);
  printGrid(grid, config.height, config.width);
};

game();

// Init Grid
// Place bombs on grid randomly
// print grid
// loop until lost / won / quit:
// {
// print grid
// Get input
// change grid (based on the input)
// evaluate if player: loss / won the game / still playing
// print response (Another Turn, Player Won, Player Lost)
// }
