const canvas = document.querySelector("#draw");
canvas.style.backgroundColor = "#000";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creating a variable to use the context:
const ctx = canvas.getContext("2d");
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 2;

let lastX, lastY;
let hue = 0;
let lineGrow = true;
let toDraw = false;

// Defining a custom draw function:
const draw = (event) => {
  if (!toDraw) return; // making sure that the mouse is down

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath(); // this particular call will implement different colours and widths than the precvious
  ctx.moveTo(lastX, lastY); // values from the immediately previous call
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  hue >= 360 ? hue = 0 : hue ++ ; // ternary operator to range bound the hue value

  (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) ? lineGrow = !lineGrow : lineGrow = lineGrow;
  lineGrow ? ctx.lineWidth ++ : ctx.lineWidth -- ;

  [lastX, lastY] = [event.offsetX, event.offsetY]; // values to be used in the immediately next call
}

// Adding event listeners on the canvas element:
canvas.addEventListener("mousedown", (e) => {
  toDraw = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // setting the inital values
  draw(e);
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => toDraw = false); // withdraws the painter
canvas.addEventListener("mouseout", () => toDraw = false);
