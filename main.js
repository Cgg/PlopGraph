/* PlopGraph
 *
 */

/* Some guidelines I try to stick with :
 * 
 * - variables declarations are sorted between the different objects (ball,
 * field, ...) and the variable name is prefixed accordingly
 * - local variables may not use prefixes
 * - after the prefix I use camel case for the variables and underscore
 * separated uppercase for the constants
 * - if a variable is a constant its name is in uppercase (not the prefix)
 */

init = function()
{
  /* Wonderful html world */
  h_canvas = document.getElementById( "mainCanvas" );

  /* field's constants */
  f_W      = h_canvas.width;
  f_H      = h_canvas.height;

  m_timer  = 0;

  h_canvas.addEventListener( "mousedown", onMouseDown, false );
  h_canvas.addEventListener( "mouseup"  , onMouseUp  , false );
  h_canvas.addEventListener( "mousemove", onMouseMove, false );

  setInterval( "draw()", g_dtDraw );
}


/* mouse events handlers */
onMouseDown = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  g_m_timer = setTimeout( "mouseMoveTimeout()", g_M_T_OUT );
}

onMouseUp = function( evt )
{
}

onMouseMove = function( evt )
{
  var cursorPostion = getCursorPos( evt );
}

mouseMoveTimeout = function()
{
}

/* Compute cursor postion from a mouse event */
getCursorPos = function( mouseEvt )
{
  var x;
  var y;

  if( mouseEvt.pageX != undefined && mouseEvt.pageY != undefined )
  {
    x = mouseEvt.pageX;
    y = mouseEvt.pageY;
  }
  else
  {
    x = mouseEvt.clientX + document.body.scrollLeft +
    document.documentElement.scrollLeft;

    y = mouseEvt.clientY +
    document.body.scrollTop + document.documentElement.scrollTop;
  }

  x -= h_canvas.offsetLeft;
  y -= h_canvas.offsetTop;

  var pos = { X : x, Y : y };

  return pos;
}


/* Responsible for drawing everything on the screen */
draw = function()
{
  var ctx = h_canvas.getContext( "2d" );

  ctx.save();

  ctx.clearRect( 0, 0, f_W, f_H );

  ctx.restore();
}

