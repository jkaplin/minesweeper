const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

const getLine = displayText => {
  return new Promise((res, rej) => {
    rl.question(displayText, input => {
      res(input);
    });
  });
};

const getInput = async (visibleGrid, height, width) => {
  let row = -1;
  let col = -1;
  let guess = null;
  try {
    while (
      row - 1 < 0 ||
      col - 1 < 0 ||
      row - 1 >= height ||
      col - 1 >= width ||
      visibleGrid[row][col]
    ) {
      console.log("\nEnter A possible answer for these:");
      row = await getLine(`Enter Row between 1 and ${height}: `);
      col = await getLine(`Enter column between 1 and ${width}: `);
      guess = await getLine("Enter 'f' for flag, * for open ");
    }
    if (!guess) {
      guess = "";
    }
    return { row: Number(row) - 1, col: Number(col) - 1, guess };
  } catch (err) {
    console.log(err);
  }
};

module.exports = getInput;
