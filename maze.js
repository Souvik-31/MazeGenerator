let maze = document.querySelector('.maze')
let ctx = maze.getContext('2d')

let generationComplete = false
let current
let goal

let roww
let coll

class Maze {
    constructor(size, rows, columns) {
        this.size = size
        this.columns = columns
        this.rows = rows
        roww = rows
        coll = columns
        this.grid = []
        this.stack = []
        this.solvedPath = [];
    }

    setup() {
        this.grid = []
        for (let r = 0; r < this.rows; r++) {
            let row = []
            for (let c = 0; c < this.columns; c++) {
                let cell = new Cell(r, c, this.grid, this.size)
                row.push(cell)
            }
            this.grid.push(row)
        }
        current = this.grid[0][0]
        this.grid[this.rows - 1][this.columns - 1].goal = true
    }

    draw() {
        maze.width = this.size
        maze.height = this.size
        maze.style.background = 'rgba(231, 210, 235, 0.93)'

        current.visited = true

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                this.grid[r][c].show(this.size, this.rows, this.columns)
            }
        }

        let next = current.checkNeighbours()

        if (next) {
            next.visited = true
            this.stack.push(current)
            current.highlight(this.columns)
            current.removeWalls(current, next)
            current = next
        }
        else if (this.stack.length > 0) {
            let cell = this.stack.pop()
            current = cell
            current.highlight(this.columns)
        }
        else {
            generationComplete = true
            return // done
        }
        if (this.stack.length === 0) {
            generationComplete = true;
            // Show the play/solve div
            document.querySelector('.complete2').style.display = 'block';
            return;
        }


        window.requestAnimationFrame(() => this.draw())
    }

    solveSetup() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                this.grid[r][c].visited = false
            }
        }
        current = this.grid[0][0]
        this.stack = []
        this.solvedPath = []
    }

    solve() {
        maze.width = this.size
        maze.height = this.size
        maze.style.background = 'rgba(231, 210, 235, 0.93)'

        current.visited = true

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                this.grid[r][c].show(this.size, this.rows, this.columns)
            }
        }

        let next = current.closestNeighbour()

        if (next) {
            next.visited = true
            this.stack.push(current)
            this.solvedPath.push(current)
            if (!next.goal)
                next.highlight(this.columns)
            else
                next.highlight(this.columns)
            current = next
        }
        else if (this.stack.length > 0) {
            let cell = this.stack.pop()
            current = cell
            this.solvedPath.push(current)
            current.highlight(this.columns)
        }

        if (!current.goal) {
            window.requestAnimationFrame(() => this.solve())
        }
        else {
            this.solvedPath.push(current)
            setTimeout(() => {
                this.showSolvedPath(); // Show path after solving
                document.querySelector('.complete3').style.display = 'block'
            }, 500);
        }
    }
    showSolvedPath() {
        for (let cell of this.solvedPath) {
            let x = (cell.colNum * this.size) / this.columns + 2
            let y = (cell.rowNum * this.size) / this.rows + 2
            ctx.fillStyle = 'rgba(5, 208, 249, 0.7)'
            ctx.fillRect(x, y, this.size / this.columns - 4, this.size / this.rows - 4)
        }
    }
    
}

class Cell {
    constructor(rowNum, colNum, parentGrid, parentSize) {
        this.rowNum = rowNum
        this.colNum = colNum
        this.visited = false
        this.walls = { topWall: true, rightWall: true, bottomWall: true, leftWall: true }
        this.goal = false
        this.parentGrid = parentGrid
        this.parentSize = parentSize
    }

    closestNeighbour() {
        let grid = this.parentGrid
        let row = this.rowNum
        let col = this.colNum
        let neighbours = []

        let top = row !== 0 && !this.walls.topWall ? grid[row - 1][col] : undefined
        let right = col !== grid.length - 1 && !this.walls.rightWall ? grid[row][col + 1] : undefined
        let bottom = row !== grid.length - 1 && !this.walls.bottomWall ? grid[row + 1][col] : undefined
        let left = col !== 0 && !this.walls.leftWall ? grid[row][col - 1] : undefined

        if (top && !top.visited) neighbours.push(top)
        if (right && !right.visited) neighbours.push(right)
        if (bottom && !bottom.visited) neighbours.push(bottom)
        if (left && !left.visited) neighbours.push(left)

        if (neighbours.length !== 0) {
            neighbours.sort((a, b) => {
                return (Math.sqrt((roww - a.rowNum) ** 2 + (coll - a.colNum) ** 2) -
                    Math.sqrt((roww - b.rowNum) ** 2 + (coll - b.colNum) ** 2))
            })

            return neighbours[0]
        } else {
            return undefined
        }
    }

    checkNeighbours() {
        let grid = this.parentGrid
        let row = this.rowNum
        let col = this.colNum
        let neighbours = []

        let top = row !== 0 ? grid[row - 1][col] : undefined
        let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined
        let left = col !== 0 ? grid[row][col - 1] : undefined

        if (top && !top.visited) neighbours.push(top)
        if (right && !right.visited) neighbours.push(right)
        if (bottom && !bottom.visited) neighbours.push(bottom)
        if (left && !left.visited) neighbours.push(left)

        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length)
            return neighbours[random]
        } else {
            return undefined
        }
    }

    drawTopWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + size / columns, y)
        ctx.stroke()
    }

    drawRightWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x + size / columns, y)
        ctx.lineTo(x + size / columns, y + size / rows)
        ctx.stroke()
    }

    drawBottomWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x, y + size / rows)
        ctx.lineTo(x + size / columns, y + size / rows)
        ctx.stroke()
    }

    drawLeftWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + size / rows)
        ctx.stroke()
    }

    highlight(columns) {
        let x = (this.colNum * this.parentSize) / columns + 1
        let y = (this.rowNum * this.parentSize) / columns + 1
        ctx.fillStyle = 'rgba(163, 7, 7, 0.5)'
        ctx.fillRect(x, y, this.parentSize / columns - 3, this.parentSize / columns - 3)
    }

    removeWalls(cell1, cell2) {
        let x = cell1.colNum - cell2.colNum;

        if (x === 1) {
            cell1.walls.leftWall = false
            cell2.walls.rightWall = false
        } else if (x === -1) {
            cell1.walls.rightWall = false
            cell2.walls.leftWall = false
        }

        let y = cell1.rowNum - cell2.rowNum

        if (y === 1) {
            cell1.walls.topWall = false
            cell2.walls.bottomWall = false
        } else if (y === -1) {
            cell1.walls.bottomWall = false
            cell2.walls.topWall = false
        }
    }

    show(size, rows, columns) {
        let x = (this.colNum * size) / columns
        let y = (this.rowNum * size) / rows

        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgba(231, 210, 235, 0.93)'
        ctx.lineWidth = 2

        if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows)
        if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows)
        if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows)
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows)

        if (this.visited) {
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2)
        }

        if (this.goal) {
            ctx.fillStyle = 'rgb(83, 247, 43)'
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2)
        }
    }
}
