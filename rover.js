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
      case "F": 
        switch (direction) {
          case "N":
            if (y >= height ) {
              return { x, y, direction, lost: true };
            }
            y++;
            break;
          case "E":
            if (x >= width ) {
              return { x, y, direction, lost: true };
            }
            x++;
            break;
          case "S":
            if (y <= 0) {
              return { x, y, direction, lost: true };
            }
            y--;
            break;
          case "W":
            if (x <= 0) {
              return { x, y, direction, lost: true };
            }
            x--;
            break;
        }
        break;
      case "R":
        direction = TURN_RIGHT[direction];
        break;
      case "L": 
        direction = TURN_LEFT[direction];
        break;
      default:
        throw new Error(`Unknown instruction: ${instruction}`);
    }
  }

  return { x, y, direction, lost: false };
};

module.exports.processRovers = function ({ grid, rovers }) {
  return rovers.map((rover) => module.exports.processInstructions(rover, grid));
};

module.exports.formatResults = function (results) {
  return results.map(formatResult).join("\n");
}

const TURN_RIGHT = { N: "E", E: "S", S: "W", W: "N" };
const TURN_LEFT = { N: "W", E: "N", S: "E", W: "S" };

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

function formatResult(result) {
  const { x, y, direction, lost } = result;
  return `(${x}, ${y}, ${direction})${lost ? " LOST" : ""}`;
};
