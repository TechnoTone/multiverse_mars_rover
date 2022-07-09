const { describe, test } = require("@jest/globals");
const { expect } = require("expect");
const { parseInput, processInstructions } = require("./rover");

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
      x: 2,
      y: 3,
      direction: "E",
      instructions: "LFRFF",
    });
    expect(result.rovers[1]).toMatchObject({
      x: 0,
      y: 2,
      direction: "N",
      instructions: "FFLFRFF",
    });
  });
});

describe("processes instructions correctly", () => {
  const grid = { width: 10, height: 10 };

  describe("valid moves", () => {
    test("move north", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "F" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 5, direction: "N", lost: false });
    });
    test("move east", () => {
      const rover = { x: 4, y: 4, direction: "E", instructions: "F" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 5, y: 4, direction: "E", lost: false });
    });
    test("move south", () => {
      const rover = { x: 4, y: 4, direction: "S", instructions: "F" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 3, direction: "S", lost: false });
    });
    test("move west", () => {
      const rover = { x: 4, y: 4, direction: "W", instructions: "F" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 3, y: 4, direction: "W", lost: false });
    });
  });

  describe("invalid moves", () => {
    test("move north", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "FFFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 9, direction: "N", lost: true });
    });
    test("move east", () => {
      const rover = { x: 4, y: 4, direction: "E", instructions: "FFFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 9, y: 4, direction: "E", lost: true });
    });
    test("move south", () => {
      const rover = { x: 4, y: 4, direction: "S", instructions: "FFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 0, direction: "S", lost: true });
    });
    test("move west", () => {
      const rover = { x: 4, y: 4, direction: "W", instructions: "FFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 0, y: 4, direction: "W", lost: true });
    });
  });
});