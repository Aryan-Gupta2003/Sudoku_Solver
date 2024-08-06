let solutionBoard = [];

function generateGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.className = 'cell';
        cell.maxLength = 1;
        cell.addEventListener('input', validateInput);
        cell.addEventListener('keypress', restrictInputToNumbers);
        grid.appendChild(cell);
    }
}

function restrictInputToNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 49 || charCode > 57) {
        event.preventDefault();
    }
}

function solveSudoku() {
    const cells = document.getElementsByClassName('cell');
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const value = cells[i * 9 + j].value;
            row.push(value === '' ? 0 : parseInt(value));
        }
        board.push(row);
    }

    fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board: board }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        }
        else {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    cells[i * 9 + j].value = data.board[i][j];
                }
            }
            checkIfSolved();
        }
    });
}

function clearGrid() {
    document.getElementById('sudoku-grid').innerHTML = '';
    generateGrid();
}

function newGame(difficulty) {
    document.getElementById('sudoku-grid').innerHTML = '';
    generateGrid();
    const puzzle = generatePuzzle(difficulty);
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        cells[i].value = puzzle[row][col] === 0 ? '' : puzzle[row][col];
        cells[i].classList.remove('invalid');
        cells[i].classList.remove('mistake');
        if (puzzle[row][col] !== 0) {
            cells[i].setAttribute('readonly', true);
        }
        else {
            cells[i].removeAttribute('readonly');
        }
    }
    closeDifficultyModal();
}

function validateInput(event) {
    const cell = event.target;
    const value = cell.value;
    const index = Array.from(document.getElementsByClassName('cell')).indexOf(cell);
    const row = Math.floor(index / 9);
    const col = index % 9;

    if (!/^[1-9]$/.test(value)) {
        cell.classList.add('invalid');
        cell.classList.remove('mistake');
    }
    else {
        cell.classList.remove('invalid');
        if (parseInt(value) !== solutionBoard[row][col]) {
            cell.classList.add('mistake');
        }
        else {
            cell.classList.remove('mistake');
        }
    }
    checkIfSolved();
}

function checkIfSolved() {
    const cells = document.getElementsByClassName('cell');
    let isSolved = true;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const index = i * 9 + j;
            const value = cells[index].value;
            if (parseInt(value) !== solutionBoard[i][j]) {
                isSolved = false;
                break;
            }
        }
        if (!isSolved)
            break;
    }
    if (isSolved) {
        displayCongratulationsMessage();
    }
}

function displayCongratulationsMessage() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '<div class="congratulations-message">Congratulations! You have solved the puzzle</div>';
    
    document.getElementById('new-game-btn').disabled = false;
    document.getElementById('clear-btn').disabled = false;
}

function generatePuzzle(difficulty) {
    const board = generateSolvedBoard();
    solutionBoard = JSON.parse(JSON.stringify(board));
    
    let cellsToRemove;
    if (difficulty === 'easy') {
        cellsToRemove = 30;
    }
    else if (difficulty === 'medium') {
        cellsToRemove = 45;
    }
    else if (difficulty === 'hard') {
        cellsToRemove = 60;
    }

    for (let i = 0; i < cellsToRemove; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (board[row][col] === 0);
        board[row][col] = 0;
    }
    return board;
}

function generateSolvedBoard() {
    const board = Array.from({length: 9}, () => Array(9).fill(0));
    solveBoard(board);
    return board;
}

function solveBoard(board) {
    const emptyPos = findEmptyPosition(board);
    if (!emptyPos)
        return true;

    const [row, col] = emptyPos;
    const numbers = shuffleArray([...Array(9).keys()].map(x => x + 1));
    for (let num of numbers) {
        if (isValid(board, num, row, col)) {
            board[row][col] = num;
            if (solveBoard(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

function findEmptyPosition(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValid(board, num, row, col) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num || board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
            return false;
        }
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showDifficultyModal() {
    document.getElementById('difficulty-modal').style.display = 'block';
}

function closeDifficultyModal() {
    document.getElementById('difficulty-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    generateGrid();
    document.getElementById('new-game-btn').addEventListener('click', showDifficultyModal);
    document.getElementById('clear-btn').addEventListener('click', clearGrid);
    document.getElementById('solve-btn').addEventListener('click', solveSudoku);
});
