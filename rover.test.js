const { describe, test } = require("@jest/globals");
const { expect } = require("expect");
const { parseInput } = require("./rover");

const TEST_INPUT_1 = `4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`;

describe("parses input correctly", () => {
  const result = parseInput(TEST_INPUT_1);

  test("parses grid dimensions", () => {
    expect(result.grid.width).toBe(4);
    expect(result.grid.height).toBe(8);
  });

  test("parses rover inputs", () => {
    expect(result.rovers).toHaveLength(2);
    expect(result.rovers[0]).toMatchObject({
      position: { x: 2, y: 3 },
      direction: "E",
      instructions: "LFRFF",
    });
    expect(result.rovers[1]).toMatchObject({
      position: { x: 0, y: 2 },
      direction: "N",
      instructions: "FFLFRFF",
    });
  });

  test("all rovers start as not lost", () => {
    result.rovers.forEach((rover) => {
      expect(rover.lost).toBeFalsy();
    });
  });
});
