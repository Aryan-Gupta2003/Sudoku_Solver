from flask import Flask, request, jsonify, render_template
from solver import solve_sudoku

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    board = request.json['board']
    if solve_sudoku(board):
        return jsonify({'board': board})
    else:
        return jsonify({'error': 'No solution found'}), 400

if __name__ == '__main__':
    app.run(debug=True)
