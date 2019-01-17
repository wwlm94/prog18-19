const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')


let state = initialState()

// Determining Position
const x = c => Math.round(c * canvas.width / state.cols)
const y = r => Math.round(r * canvas.height / state.rows)

// Game loop draw
const draw = () => {
  // clear
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // drawing the snake on the Canvas
  ctx.fillStyle = 'rgb(124,253,150)'
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

  // implementation for crash scenario
  ctx.fillStyle = 'rgb(255,250,0)'
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

  // For Crash scenario implementation.
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(255,120,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

const step = t1 => t2 => {
  if (t2 - t1 > 100) {
    state = next(state)
    draw()
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

//Code 
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp':    state = enqueue(state, NORTH); break
    case 'a': case 'j': case 'ArrowLeft':  state = enqueue(state, WEST);  break
    case 's': case 'k': case 'ArrowDown':  state = enqueue(state, SOUTH); break
    case 'd': case 'l': case 'ArrowRight': state = enqueue(state, EAST);  break
  }
})

// Main
draw(); window.requestAnimationFrame(step(0))
