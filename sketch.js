var cols, rows;
var w = 20;
var cells = [];
var currentCell;
var stack = [];

function setup() {
    createCanvas(300, 300);
    // frameRate(5);
    cols = floor(width / w);
    rows = floor(height / w);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            cells.push(cell);
        }
    }

    currentCell = cells[0];
}

function draw() {
    background(51);

    for (var cell of cells) {
        cell.show();
    }

    currentCell.visited = true;
    currentCell.highlight();

    var nextCell = currentCell.checkNeighbors();

    if (nextCell != undefined) {
        nextCell.visited = true;

        stack.push(currentCell);

        removeWalls(currentCell, nextCell);

        currentCell = nextCell;
    } else if (stack.length > 0) {
        currentCell = stack.pop();
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }

    return i + j * cols;
}

function removeWalls(current, next) {
    var x = current.i - next.i;

    if (x == -1) {
        current.walls.right = false;
        next.walls.left = false;
    }

    if (x == 1) {
        current.walls.left = false;
        next.walls.right = false;
    }

    var y = current.j - next.j;
    if (y == -1) {
        current.walls.bottom = false;
        next.walls.top = false;
    }

    if (y == 1) {
        current.walls.top = false;
        next.walls.bottom = false;
    }

}