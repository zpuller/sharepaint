'use strict';

var canvas = document.getElementById('canvas');
var tools = document.getElementById('tools');

var click = {};
var last_click = {};
var text_cursor = {};

canvas.width = 1920;
canvas.height = 1080;

var beige = [150, 160, 30, 255];
var black = [0, 0, 0, 255];

var clear_button = { x: 10, y: 20, width: 100, height: 100 };
var password_button = { x: 120, y: 20, width: 200, height: 100 };

function draw_canvas_background()
{
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect (0, 0, canvas.width, canvas.height);
}

// could just use ctx.fillRect() but keeping this for
// reference if I want fancy pixel stuff later 
function draw_rectangle(x, y, width, height, color)
{
  var ctx = canvas.getContext('2d');
  var image_data = ctx.createImageData(width, height);
  var data  = image_data.data;
  for (var i = 0; i < data.length;)
  {
    //rgba
    data[i] = color[0];
    ++i;
    data[i] = color[1];
    ++i;
    data[i] = color[2];
    ++i;
    data[i] = color[3];
    ++i;
  }

  ctx.putImageData(image_data, x, y);
}

function draw_line(from, to, size, color, gap) 
{
  var num_steps = (Math.abs(to.x - from.x) + Math.abs(to.y - from.y)) / gap; 
  for (var i = 0; i < num_steps; ++i)
  {
    var x = ((to.x * i) + (from.x * (num_steps - i))) / num_steps;
    var y = ((to.y * i) + (from.y * (num_steps - i))) / num_steps;
    draw_rectangle(x, y, size, size, color); 
  }
}

function draw_letter(key, pos)
{
  var ctx = canvas.getContext('2d');
  ctx.font = '250% Arial';
  ctx.fillStyle = '#96A01E';

  var width = ctx.measureText(key).width;
  ctx.fillText(key, pos.x, pos.y);
  return width;
}

function draw_help()
{
  text_cursor.x = 5;
  text_cursor.y = 0;

  var ctx = canvas.getContext('2d');
  ctx.font = '250% Arial';
  ctx.fillStyle = '#96A01E';

  text_cursor.y += 50; 
  ctx.fillText('draw: d', text_cursor.x, text_cursor.y);
  text_cursor.y += 50; 
  ctx.fillText('erase: e', text_cursor.x, text_cursor.y);
  text_cursor.y += 50; 
  ctx.fillText('text: t (click to type, esc/return to stop)', text_cursor.x, text_cursor.y);
  text_cursor.y += 50;
  ctx.fillText('clear screen: c', text_cursor.x, text_cursor.y);
  text_cursor.y += 50;
  ctx.fillText('password: p (private session)', text_cursor.x, text_cursor.y);
}

function draw_clear_button_text()
{
  var ctx = canvas.getContext('2d');
  ctx.font = '200% Arial';
  ctx.fillStyle = '#96A01E';
  var text_width = ctx.measureText('clear').width;

  text_cursor.x = clear_button.x + .5*(clear_button.width - text_width);
  text_cursor.y = clear_button.y + .55*clear_button.height;

  ctx.fillText('clear', text_cursor.x, text_cursor.y);
}

function draw_clear_button()
{
  draw_rectangle(clear_button.x, clear_button.y, clear_button.width, clear_button.height, beige);
  draw_rectangle(clear_button.x+3, clear_button.y+3, clear_button.width-6, clear_button.height-6, black);
  draw_clear_button_text()
}

function draw_password_button_text()
{
  var ctx = canvas.getContext('2d');
  ctx.font = '200% Arial';
  ctx.fillStyle = '#96A01E';
  var text_width = ctx.measureText('password').width;

  text_cursor.x = password_button.x + .5*(password_button.width - text_width);
  text_cursor.y = password_button.y + .55*password_button.height;

  ctx.fillText('password', text_cursor.x, text_cursor.y);
}

function draw_password_button()
{
  draw_rectangle(password_button.x, password_button.y, password_button.width, password_button.height, beige);
  draw_rectangle(password_button.x+3, password_button.y+3, password_button.width-6, password_button.height-6, black);
  draw_password_button_text()
}
