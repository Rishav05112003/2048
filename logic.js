var board
var score = 0;
var move = -2;
var rows = 4;
var col = 4;

window.onload = function()  {
    setGame()
    
    document.getElementById("left").addEventListener("click", slideLeft);
    document.getElementById("right").addEventListener("click",slideRight);
    document.getElementById("up").addEventListener("click", slideUp);
    document.getElementById("down").addEventListener("click", slideDown);
    let resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", reset);
}
function reset() {
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            board[r][c] = 0;
            let num = 0;
            updateVal(tile,num);
        }
    }
    score = 0;
    updateScore();
    setRandomTwo();
    setRandomTwo();
    
}
function setGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateVal(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setRandomTwo();
    setRandomTwo();
}


document.addEventListener("keydown", (e) => {

    if(e.code == "ArrowLeft"){
        slideLeft();
    }
    if (e.code == "ArrowRight"){
        slideRight();
    }
    if(e.code == "ArrowUp"){
        slideUp();
    }
    if(e.code == "ArrowDown"){
        slideDown();
    }
    
    moves = moves + 1;
    console.log(moves);

})
function slideUp(){
    for(let c = 0; c < col; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateVal(tile,num);
        }
    }
    setRandomTwo();
    updateScore();
}

function slideDown() {
    for(let c = 0; c < col; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateVal(tile,num);
        }
    }
    setRandomTwo();
    updateScore();
}
function slideRight() {
    for(let r = 0; r < rows; r++){
        let curRow = board[r];
        curRow.reverse();
        curRow = slide(curRow);
        curRow.reverse();
        board[r] = curRow;

        for(let c = 0; c < col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateVal(tile,num);
        }
    }
    setRandomTwo();
    updateScore();
}
function slideLeft() {
    for(let r = 0; r < rows; r++){
        let curRow = board[r];
        curRow = slide(curRow);
        board[r] = curRow;
        //console.log(curRow);
        for(let c = 0; c < col; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateVal(tile,num);
        }
    }
    setRandomTwo();
    updateScore();
}
function updateVal(tile, num){
    tile.classList = "";
    tile.classList.add("tile")
    if(num >= 0){
        tile.innerText = num.toString();
        tile.classList.add("x" + num.toString());
    }
}
function filterZero(row){
    return row.filter((num => num != 0));
}


function slide(row){
    row = filterZero(row);
    for(let i = 0; i < row.length - 1; i++){
        if(row[i] == row[i + 1]){
            row[i] = row[i] * 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);

    while(row.length < col){
        row.push(0);
    }

    return row;
}

function updateScore(){
    let scoreSpan = document.getElementById("score");

    scoreSpan.innerText = score;
}


function setRandomTwo(){
    if(!isEmpty()){
        alert("Try again!!...");
        return;
    }
    move += 1;
    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * col);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        } 
    }
}

function isEmpty(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < col; j++){
            if(board[i][j] == 0){
                return true;
            }
        }
    }

    return false;
}
