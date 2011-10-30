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

  /* constants */
  REFRESH_RATE = 33;  // ms
  MOUSE_T_OUT  = 750;

  /* field's constants */
  f_W      = h_canvas.width;
  f_H      = h_canvas.height;

  h_canvas.addEventListener( "mousedown", onMouseDown, false );
  h_canvas.addEventListener( "mouseup"  , onMouseUp  , false );
  h_canvas.addEventListener( "mousemove", onMouseMove, false );

  nodes = new Array( 0 );
  arcs  = new Array( 0 );

  // Variables handling state of the UI
  mode            = "DoingNothing"; // can be "Dragging" or "Drawing" also
  selectedNodeIdx = -1;
  draggedNodeIdx  = -1;

  // Variables for handling mouse inputs
  mouseDownPos = { X : 0, Y : 0 };
  curMousePos  = { X : 0, Y : 0 };

  setInterval( "draw()", REFRESH_RATE );
}


/* given a point tells if there is a node there. Return node index or -1 if
 * there is nobody
 */
WhatNodeIsHere = function( point )
{
  for( i = 0 ; i < nodes.length ; i++ )
  {
    if( nodes[ i ].IsInNode( point ) )
    {
      return i;
    }
  }

  return -1;
}

/* mouse events handlers */
onMouseDown = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  g_m_timer = setTimeout( "mouseMoveTimeout()", MOUSE_T_OUT );

  draggedNodeIdx = WhatNodeIsHere( cursorPostion );

  if( mode == "DoingNothing" )
  {
    if( draggedNodeIdx != -1 )
    {
      mode = "Dragging";
    }
  }

  mouseDownPos = cursorPostion;
}

onMouseUp = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  var clickedNode = WhatNodeIsHere( cursorPostion );

  if( mode == "Dragging" )
  {
    if( cursorPostion.X == mouseDownPos.X &&
        cursorPostion.Y == mouseDownPos.Y    )
    {
      mode = "Drawing";
      selectedNodeIdx = draggedNodeIdx;
    }
    else
    {
      mode = "DoingNothing";
    }
  }
  else if( mode == "Drawing" )
  {
    if( clickedNode != -1 )
    {
      arcs.push( new PlopArc( nodes[ selectedNodeIdx ],
                              nodes[ clickedNode ]      ) );

      selectedNodeIdx = clickedNode;
    }
    else
    {
      mode = "DoingNothing";
    }
  }
  else if( mode == "DoingNothing" )
  {
    nodes.push( new PlopNode( cursorPostion.X, cursorPostion.Y ) );

    /* if right click and clickedNode != -1 then delete clicked node */
  }
}

onMouseMove = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  // if a node is being dragged around, drag it

  // If a node is selected (and an arc drawn from it) then check if an arc
  // must be added in the temporary arcs list.
  curMousePos = cursorPostion;

  if( mode == "Dragging" )
  {
    nodes[ draggedNodeIdx ].SetPos( cursorPostion );
  }
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

  // draw the temporary arcs
  if( mode == "Drawing" )
  {
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo( nodes[ selectedNodeIdx ].x, nodes[ selectedNodeIdx ].y );
    ctx.lineTo( curMousePos.X, curMousePos.Y );
    ctx.closePath();

    ctx.stroke();
  }

  for( i = 0 ; i < arcs.length ; i++ )
  {
    arcs[ i ].draw( ctx );
  }

  for( i = 0 ; i < nodes.length ; i++ )
  {
    nodes[ i ].draw( ctx );
  }

  ctx.restore();
}

