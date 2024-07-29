function generateGrid() {
    const grid = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.className = 'cell';
        grid.appendChild(cell);
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
        } else {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    cells[i * 9 + j].value = data.board[i][j];
                }
            }
        }
    });
}

function clearGrid() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].value = '';
    }
}

document.addEventListener('DOMContentLoaded', generateGrid);
