function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = {
        top: true,
        right: true,
        bottom: true,
        left: true
    };
    this.visited = false;

    this.show = () => {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        noFill();

        if (this.walls.top) {
            line(x, y, x + w, y);
        }
        if (this.walls.right) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls.bottom) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls.left) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            fill(255, 0, 255, 100);
            noStroke()
            rect(x, y, w, w);

        }

    }

    this.highlight = () => {
        var x = this.i * w;
        var y = this.j * w;
        fill(0, 255, 100, 100);
        noStroke()
        rect(x, y, w, w);
    }

    this.checkNeighbors = () => {
        var neighbors = [];

        var around = [
            cells[index(this.i, this.j - 1)],
            cells[index(this.i + 1, this.j)],
            cells[index(this.i, this.j + 1)],
            cells[index(this.i - 1, this.j)]
        ];

        // console.log(around);

        for (var i in around) {
            if (around[i] && !around[i].visited) {
                neighbors.push(around[i]);
            }
        }

        // console.log(neighbors)

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }

    }
}