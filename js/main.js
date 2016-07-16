'use strict';

canvas.addEventListener('touchstart', handle_mousedown);
window.addEventListener('touchend', handle_mouseup);
canvas.addEventListener('mousedown', handle_mousedown); 
window.addEventListener('mouseup', handle_mouseup); 
window.addEventListener('keydown', handle_keypress); 
document.addEventListener('touchmove',function(event){ event.preventDefault(); }, false);

draw_canvas_background();
draw_help();
