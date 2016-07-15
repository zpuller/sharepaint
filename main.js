var canvas = document.getElementById("canvas");
var tools = document.getElementById("tools");
var last_click = {};
var text_cursor = {};
text_cursor.x = 10;
text_cursor.y = 50;

canvas.width = 1920;
canvas.height = 1080;

function init_font()
{
  var ctx = canvas.getContext("2d");
  ctx.font = "250% Arial";
  ctx.fillStyle = "red";
}

function draw_canvas_background()
{
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(0, 0,0)";
  ctx.fillRect (0, 0, canvas.width, canvas.height);
}

function draw_tools_background()
{
  var ctx = tools.getContext("2d");
  ctx.fillStyle = "rgb(0, 0, 255)";
  ctx.fillRect (0, 0, tools.width, tools.height);
}

function draw_rectangle(x, y, width, height)
{
  var ctx = canvas.getContext("2d");
  var image_data = ctx.createImageData(width, height);
  var data  = image_data.data;
  for (var i = 0; i < data.length;)
  {
    //rgba
    data[i] = 150;
    ++i;
    data[i] = 160;
    ++i;
    data[i] = 30; 
    ++i;
    data[i] = 255;
    ++i;
  }

  ctx.putImageData(image_data, x, y);
}

function handle_mousemove(event)
{
  var clickX = Math.floor(canvas.width * (event.offsetX / canvas.clientWidth));
  var clickY = Math.floor(canvas.height * (event.offsetY / canvas.clientHeight));
  var distance = clickX + clickY; 
  for (var i = 0; i < distance; ++i)
  {
    var x = ((clickX * i) + (last_click.x * (distance - i))) / distance;
    var y = ((clickY * i) + (last_click.y * (distance - i))) / distance;
    draw_rectangle(x, y, 10, 10);
  }

  last_click.x = clickX;
  last_click.y = clickY;
}

window.addEventListener("mousedown", function() {
    last_click.x = Math.floor(canvas.width * (event.offsetX / canvas.clientWidth));
    last_click.y = Math.floor(canvas.height * (event.offsetY / canvas.clientHeight));
    handle_mousemove(event);
    canvas.addEventListener("mousemove", handle_mousemove);
    }); 
window.addEventListener("mouseup", function() { canvas.removeEventListener("mousemove", handle_mousemove); }); 

init_font();
draw_canvas_background();
draw_tools_background();

function handle_keypress(event)
{
  var key = event.key;

  var ctx = canvas.getContext("2d");
  ctx.font = "250% Arial";
  ctx.fillStyle = "red";

  var width = ctx.measureText(key).width;
  ctx.fillText(key, text_cursor.x, text_cursor.y);
  text_cursor.x += width;
}
window.addEventListener("keydown", handle_keypress); 
