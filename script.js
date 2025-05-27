let form = document.querySelector('#settings')
let rowsCols = document.querySelector('#number')
let complete1 = document.querySelector('.complete1')
let replay = document.querySelector('.replay')
let close = document.querySelector('.close')
let complete2 = document.querySelector('.complete2')
let play = document.querySelector('.play')
let solve = document.querySelector('.solve')
let back = document.querySelector('.back')
let complete4 = document.querySelector('.complete4')
let resetBtn = document.querySelector('#reset-btn')
let resetBtn2 = document.querySelector('#reset-btn2')
let solveBtn = document.querySelector('.solve-btn')
let bottomBtns = document.querySelector('.bottom-btns');

let newMaze

form.addEventListener('submit', generateMaze)

document.addEventListener('keydown', move)

replay.addEventListener('click', () => location.reload())

close.addEventListener('click', () => {
    complete1.style.display = 'none'
})

resetBtn.addEventListener('click', () => location.reload())


play.addEventListener('click', () => {
    complete2.style.display = 'none'
    complete4.style.display = 'block'
    resetBtn.style.display = 'none'
    bottomBtns.style.display = 'flex';
    

    setTimeout(() => {
        complete4.style.display = 'none'    
    }, 1000);

    
})



solve.addEventListener('click', () => {
    complete2.style.display = 'none'
    newMaze.solveSetup()
    newMaze.solve()
})


resetBtn2.addEventListener('click', () => location.reload())

solveBtn.addEventListener('click', () => {
    if (newMaze) {
        newMaze.solveSetup();
        newMaze.solve();
    }
});

back.addEventListener('click', () => location.reload())

function generateMaze(e) {
    e.preventDefault()

    if(rowsCols.value == '') {
        return alert('Please enter all fields')
    }

    let mazeSize = 400
    let number = +rowsCols.value

    if(number > 50) {
        alert('Maze too large!')
        return
    }

    form.style.display = 'none'

    newMaze = new Maze(mazeSize, number, number)
    newMaze.setup()
    newMaze.draw()

    generationComplete = false
}

function move(e) {
    if(!generationComplete) return

    let key = e.key
    let row = current.rowNum
    let col = current.colNum

    switch(key) {
      case 'ArrowUp':
        if(!current.walls.topWall) {
            let next = newMaze.grid[row - 1][col]
            current = next
            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal) complete1.style.display = 'block'
        }
        break

      case 'ArrowRight':
        if(!current.walls.rightWall) {
            let next = newMaze.grid[row][col + 1]
            current = next
            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal) complete1.style.display = 'block'
        }
        break

      case 'ArrowDown':
        if(!current.walls.bottomWall) {
            let next = newMaze.grid[row + 1][col]
            current = next
            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal) complete1.style.display = 'block'
        }
        break

      case 'ArrowLeft':
        if(!current.walls.leftWall) {
            let next = newMaze.grid[row][col - 1]
            current = next
            newMaze.draw()
            current.highlight(newMaze.columns)

            if(current.goal) complete1.style.display = 'block'
        }
        break
    }
}
