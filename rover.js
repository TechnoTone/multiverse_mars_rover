module.exports.parseInput = function (input) {
  const [gridInput, ...roverInputs] = input.split("\n");
  const grid = parseGrid(gridInput);
  const rovers = parseRovers(roverInputs);
  return { grid, rovers };
};

module.exports.processInstructions = function (rover, grid) {
  var { x, y, direction } = rover;
  const { instructions } = rover;
  const { width, height } = grid;

  for (const instruction of instructions) {
    switch (instruction) {
      case "F": // MOVE FORWARD
        switch (direction) {
          case "N":
            y++;
            break;
          case "E":
            x++;
            break;
          case "S":
            y--;
            break;
          case "W":
            x--;
            break;
        }
        break;
      default:
        throw new Error(`Unknown instruction: ${instruction}`);
    }
  }

  return { x, y, direction, lost: false };
};

function parseGrid(input) {
  const values = input.split(" ").map(Number);
  return { width: values[0], height: values[1] };
}

function parseRovers(inputs) {
  return inputs.map(parseRover);
}

function parseRover(input) {
  partsRegex = /^\((\d+), (\d+), ([NESW])\) ([FLR]*)/;
  const parts = partsRegex.exec(input);
  const [x, y] = parts.slice(1, 3).map(Number);
  const [direction, instructions] = parts.slice(3);
  return {
    x,
    y,
    direction,
    instructions,
  };
}
