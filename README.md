# MazeGenerator

MazeGenerator is an interactive web-based JavaScript application that allows users to generate, play, and solve customizable mazes directly in the browser. You can specify the size of the maze, generate a new maze, manually navigate through it with keyboard arrows, and even see the solution path animated.

## Features

- **Maze Generation:** Dynamically creates a square maze of user-specified size.
- **Interactive Play:** Use keyboard arrow keys to navigate from the start to the goal cell.
- **Auto Solve:** See the maze solved automatically with animated solution path.
- **Responsive UI:** Works well on desktops and mobile devices.
- **Reset/Replay:** Instantly regenerate or reset the maze for repeated play.

## Demo

https://maze-generator-ashen.vercel.app/

## Usage

- Enter the desired number of rows/columns (up to 50) and click **Generate Maze**.
- Use the arrow keys on your keyboard to move through the maze.
- Click **Solve** to animate the solution path.
- Use the **Reset** or **Play Again** buttons to restart or replay the maze.

## File Overview

- `index.html` – Main HTML file and UI layout.
- `maze.js` – Core logic for maze generation, solving, and rendering.
- `script.js` – Handles user interaction and UI events.
- `style.css` – Styling and responsive design.

## How It Works

- The maze is implemented as a 2D grid of cells, each with walls on all sides.
- Maze generation uses a recursive backtracking algorithm (depth-first search).
- The solution can be visualized automatically, highlighting the path from start to goal.

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, enhancements, or new features.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Author:** [Souvik-31](https://github.com/Souvik-31)
