# Multiverse engineering take-home challenge

- Use any programming language you want.
- It shouldn’t take longer than 2-3 hours.
- Don’t worry if you don’t finish in the time. Please send over what you’ve achieved and a few sentences on what you would add next.
- Please do not implement any UI for this. We just want to see the quality of your code - the console is fine for output.
- Put your code online (e.g. in GitLab/GitHub) and send us the link.

## The problem - Mars Rover

Write a program that takes in commands and moves one or more robots around Mars.

- The world should be modelled as a grid with size m x n
- Your program should read the input, update the robots, and print out the final states of the robots
- Each robot has a position (x, y), and an orientation (N, E, S, W)
- Each robot can move forward one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R)
- If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded
- Going from x -> x + 1 is in the easterly direction, and y -> y + 1 is in the northerly direction. i.e. (0, 0) represents the south-west corner of the grid

The input takes the form:

```
4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF
```

The first line of the input ‘4 8’ specifies the size of the grid. The subsequent lines each represent the initial state and commands for a single robot. (0, 2, N) specifies the initial state of the form (x, y, orientation). FFLFRFF represents the sequence of movement commands for the robot.

The output should take the form:

```
(4, 4, E)
(0, 4, W) LOST
```

Each line represents the final position and orientation of the robots of the form (x, y, orientation) and optionally whether the robot was lost.

Another example for the input:

```
4 8
(2, 3, N) FLLFR
(1, 0, S) FFRLF
```

The output would be:

```
(2, 3, W)
(1, 0, S) LOST
```

## Questions/observations

- A robot might exit the the grid but later re-enter it. In this case the instructions are unclear. There are two ways this could be handled:
  - When a robot becomes 'lost' it os no longer tracked and subsequent instructions are ignored. The last valid grid position/orientation are recorded.
  - When a robot becomes 'lost' its last valid grid position/orientation is recorded but instructions continue to be processed. If, subsequently, the robot returns to the grid then it is no longer 'lost' and regular tracking resumes.

- For simplicity I will be assuming the simpler of these two options. There's no point adding complexity at this stage without feeding back this questions and confirming the requirements. It will be easy to adapt the solution and add the additional complexity later if this is required.

- The instructions say that the first values are the size of the grid (m and n). The instructions also say that the coordinate for the rovers is a 0-bound index position (the bottom-left position is x:0, y,0). These two facts imply that a grid with width of m, the maximum allowed x value would be m-1, and the same would apply to the height (maximum y value of n-1). However, when following these rules for the first example the first rover moves out of bounds by attempting to move East from 3 to 4. 

  - I will make the assumption that the test cases are correct and adjust my solution to match. This means interpreting m and n as maximum x and y values instead of as width and hight measurements.
