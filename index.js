/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'Computer';
let moveIndex = 1;
const totalMoves = (GRID_LENGTH * GRID_LENGTH) - 1;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '" id="box_'+ colIdx + '_' + rowIdx + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if (turn == 'Computer') {
        newValue = 2;
    }
    else {
        newValue = 1;
    }
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    var justNowClicked = document.getElementById('box_' + colIdx + '_' + rowIdx);
    justNowClicked.removeEventListener('click', onBoxClick, false);

    if (calculateResult() == false && moveIndex < totalMoves) {
        moveIndex++;
        if(turn == 'Computer') {
            turn = 'Human';
        }
        else {
            turn = 'Computer';
        }
    }
    else {
        declareWinner();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function chooseThePlayerForFirstTurn() {
      playTheGame(turn);
}
function playTheGame(myTurn) {
    var rowIdx = Math.floor((Math.random() * 3) + 0);
    var colIdx = Math.floor((Math.random() * 3) + 0);
    let newValue;
        if(myTurn == 'Computer') {
            newValue = 2;
            turn = 'Human';
        }
        else {
            newValue = 1;
            turn = 'Computer';
        }
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        var justNowClicked = document.getElementById('box_' + colIdx + '_' + rowIdx);
        justNowClicked.removeEventListener('click', onBoxClick, false);
}

function calculateResult() {
    if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[0][0] != ''){
        return true;
    }
    else if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] != ''){
        return true;
    }
    for (let idx = 0; idx < GRID_LENGTH; idx++) {
        if(grid[idx][0] == grid[idx][1] && grid[idx][1] == grid[idx][2] && grid[idx][0] != '') {
            return true;
        }
        else if(grid[0][idx] == grid[1][idx] && grid[1][idx] == grid[2][idx] && grid[0][idx] != '') {
            return true;
        }
    }
    return false;
}

function declareWinner() {
    var alertBox = document.getElementById('alert-box');
    alertBox.style.display = 'block';
    if(turn == 'Computer' && moveIndex < totalMoves) {
        alertBox.innerHTML = 'Computer has won';
        console.log('Computer has won');
    }
    else if(turn == 'Human' && moveIndex < totalMoves) {
        alertBox.innerHTML = 'Human has won';
        console.log('Human has won');
    }
    else if(moveIndex == totalMoves) {
        alertBox.innerHTML = 'OH! Its a draw.';
        console.log('OH! Its a draw.');
    }
    removeClickHandlers();
}

function resetGame() {
    window.location.href = './index.html';
}

function removeClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
chooseThePlayerForFirstTurn();
