const { describe, test } = require("@jest/globals");
const { parseInput } = require("./rover");

const TEST_INPUT_1 = `4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF
`;

describe("parses input correctly", () => {
  const result = parseInput(TEST_INPUT_1);

  test("parses grid dimensions", () => {
    expect(result.grid.width).toBe(4);
    expect(result.grid.height).toBe(8);
  });
});
