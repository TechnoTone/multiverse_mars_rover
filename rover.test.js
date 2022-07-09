const { describe, test } = require("@jest/globals");
const { expect } = require("expect");
const {
  parseInput,
  processInstructions,
  processRovers,
  formatResults,
} = require("./rover");

const TEST_INPUT_1 = `4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`;

const EXPECTED_RESULTS_1 = `(4, 4, E)
(0, 4, W) LOST`;

const TEST_INPUT_2 = ` 4 8
(2, 3, N) FLLFR
(1, 0, S) FFRLF`;

const EXPECTED_RESULTS_2 = `(2, 3, W)
(1, 0, S) LOST`;

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
      const rover = { x: 5, y: 5, direction: "N", instructions: "FFFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 5, y: 10, direction: "N", lost: true });
    });
    test("move east", () => {
      const rover = { x: 5, y: 5, direction: "E", instructions: "FFFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 10, y: 5, direction: "E", lost: true });
    });
    test("move south", () => {
      const rover = { x: 5, y: 5, direction: "S", instructions: "FFFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 5, y: 0, direction: "S", lost: true });
    });
    test("move west", () => {
      const rover = { x: 5, y: 5, direction: "W", instructions: "FFFFFF" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 0, y: 5, direction: "W", lost: true });
    });
  });

  describe("turns", () => {
    test("turn left", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "L" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "W", lost: false });
    });
    test("turn right", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "R" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "E", lost: false });
    });
    test("turn left twice", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "LL" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "S", lost: false });
    });
    test("turn right twice", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "RR" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "S", lost: false });
    });
    test("turn left three times", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "LLL" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "E", lost: false });
    });
    test("turn right three times", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "RRR" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "W", lost: false });
    });
    test("turn left four times", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "LLLL" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "N", lost: false });
    });
    test("turn right four times", () => {
      const rover = { x: 4, y: 4, direction: "N", instructions: "RRRR" };
      const result = processInstructions(rover, grid);
      expect(result).toStrictEqual({ x: 4, y: 4, direction: "N", lost: false });
    });
  });
});

describe("test cases", () => {
  test("test case 1", () => {
    const parsed = parseInput(TEST_INPUT_1);
    const results = processRovers(parsed);
    const formattedResults = formatResults(results);

    expect(formattedResults).toBe(EXPECTED_RESULTS_1);
  });
  test("test case 2", () => {
    const parsed = parseInput(TEST_INPUT_2);
    const results = processRovers(parsed);
    const formattedResults = formatResults(results);

    expect(formattedResults).toBe(EXPECTED_RESULTS_2);
  });
});