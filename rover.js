module.exports.parseInput = function (input) {
  const [gridInput, ...roverInputs] = input.split("\n");
  const grid = parseGrid(gridInput);
  const rovers = parseRovers(roverInputs);
  return { grid, rovers };
};

function parseGrid(input) {
  const values = input.split(" ").map(Number);
  return { width: values[0], height: values[1] };
}

function parseRovers(inputs) {
  return inputs.map(parseRover);
}

function parseRover(input) {
  console.log({ input });
  partsRegex = /^\((\d+), (\d+), ([NESW])\) ([FLR]*)/;
  const parts = partsRegex.exec(input);
  const [x, y] = parts.slice(1, 3).map(Number);
  const [direction, instructions] = parts.slice(3);
  return {
    position: { x, y },
    direction,
    instructions,
    lost: false,
  };
}
