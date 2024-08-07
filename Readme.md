# Sudoku Solver Project

## Overview

This project is a Sudoku solver and generator web application. It allows users to generate new Sudoku puzzles of varying difficulty levels (Easy, Medium, Hard), solve given puzzles, and validate user inputs dynamically. The application also provides functionalities to clear the grid and generate new puzzles on demand. The backend is implemented to solve Sudoku puzzles using a backtracking algorithm.

## Features

- **Dynamic Puzzle Generation**: Generate new Sudoku puzzles with varying difficulty levels (Easy, Medium, Hard).
- **Puzzle Solving**: Automatically solve any given Sudoku puzzle using a backtracking algorithm.
- **User Input Validation**: Validate user inputs in real-time and highlight mistakes.
- **Clear Grid**: Clear all user inputs in the grid.
- **Read-Only Initial Puzzle**: The initial puzzle provided to the user is read-only and cannot be altered.
- **Completion Detection**: Detect when a puzzle is correctly solved and display a congratulations message.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (for the solving algorithm)
- **Testing**: Python `unittest` module

## Getting Started

### Prerequisites

- Python 3.x
- Flask (for backend server)
- Basic knowledge of HTML, CSS, and JavaScript

## File Structure

- `index.html`: Main HTML file for the application.
- `style.css`: CSS file for styling the application.
- `script.js`: JavaScript file for handling frontend logic.
- `solver.py`: Python script containing the Sudoku solving algorithm.
- `app.py`: Python script for the Flask backend server.
- `test_solver.py`: Python script containing unit tests for the solver.

## Usage

### Generating a New Puzzle

1. Click the "New Game" button.
2. Select the desired difficulty level (Easy, Medium, Hard).

### Solving a Puzzle

1. Input numbers into the empty cells.
2. Click the "Solve" button to automatically solve the puzzle.

### Clearing the Grid

1. Click the "Clear" button to remove all user inputs.

### Validating Inputs

- User inputs are validated in real-time.
- Mistakes are highlighted as the user inputs numbers.

### Completion Detection

- When the puzzle is solved correctly, a congratulations message is displayed.

## Testing

To run the unit tests for the Sudoku solver:

```bash
python test_solver.py
```
