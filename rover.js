module.exports.parseInput = function (input) {
  const [gridInput, ...roverInputs] = input.split("\n");
  const grid = parseGrid(gridInput);
  return { grid };
};

function parseGrid(input) {
  const values = input.split(" ").map(Number);
  return { width: values[0], height: values[1] };
}
