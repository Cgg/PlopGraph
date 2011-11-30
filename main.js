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

  h_canvas.addEventListener( "mousedown", onMouseLeftDown, false );
  h_canvas.addEventListener( "contextmenu", onMouseRightDown, false );
  h_canvas.addEventListener( "mouseup"  , onMouseUp  , false );
  h_canvas.addEventListener( "mousemove", onMouseMove, false );
  window.addEventListener( "keyup", onKeyUp, false );

  nodes = new Array( 0 );
  arcs  = new Array( 0 );

  // Variables handling state of the UI
  mode            = "DoingNothing"; // can be "Dragging" or "Drawing" or "Deleting"
  selectedNodeIdx = -1;
  draggedNodeIdx  = -1;

  createAnchored = true;

  // Variables for handling mouse inputs
  mouseDownPos = new Point( 0, 0 );
  curMousePos  = new Point( 0, 0 );

  setInterval( draw, REFRESH_RATE );
};


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
};

/* given a point tells if there is an arc there. Return arc index or -1 if
 * there is nobody. If several arcs are candidate, return the nearest.
 */
WhatArcIsHere = function( point )
{
  var bestCandidate = -1;
  var bestDist      = 9001;
  var curDist       = 0;

  for( i = 0 ; i < arcs.length ; i++ )
  {
    curDist = arcs[ i ].DistanceFrom( point );

    if( ( curDist <= PlopArc.prototype.DIST_TRESHOLD ) && ( curDist < bestDist ) )
    {
      bestCandidate = i;
    }
  }

  return bestCandidate;
};


/* keyboard handler */
onKeyUp = function( evt )
{
  evt.preventDefault();

  if( evt.keyCode == 65 )
  {
    createAnchored = !createAnchored;
  }
}


/* mouse events handlers */
onMouseLeftDown = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  var clickNodeIdx = WhatNodeIsHere( cursorPostion );
  var clickArcIdx  = -1;

  if( clickNodeIdx == -1 )
  {
    clickArcIdx = WhatArcIsHere( cursorPostion );
  }

  if( clickNodeIdx >= 0 && mode == "DoingNothing" )
  {
    switch( evt.which )
    {
      case 1: // left click
        g_m_timer = setTimeout( mouseMoveTimeout(), MOUSE_T_OUT );

        mode = "Dragging";
        draggedNodeIdx = clickNodeIdx;

        break;

      case 3: // right click
        mode = "Deleting";
        break;
    }
  }
  else if( clickArcIdx >= 0 && mode == "DoingNothing" )
  {
    if( evt.which == 3 )
    {
      mode = "Deleting";
    }
  }

  mouseDownPos = cursorPostion;

  return true;
};

onMouseRightDown = function( evt )
{
  evt.preventDefault();

  var clickedNode = WhatNodeIsHere( getCursorPos( evt ) );

  return true;
};

onMouseUp = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  var clickedNode = WhatNodeIsHere( cursorPostion );
  var clickedArc  = -1;

  if( clickedNode == -1 )
  {
    clickedArc = WhatArcIsHere( cursorPostion );
  }

  if( mode == "Dragging" )
  {
    if( cursorPostion.x == mouseDownPos.x &&
        cursorPostion.y == mouseDownPos.y    )
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
    if( clickedNode != -1 && clickedNode != selectedNodeIdx )
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
  else if( mode == "Deleting" )
  {
    mode = "DoingNothing";

    if( clickedNode >= 0 )
    {
      // delete the clicked node and arcs connected to it

      var nodeToDelete = nodes.splice( clickedNode, 1 )[ 0 ];

      for( i = 0 ; i < arcs.length ; i++ )
      {
        if( arcs[ i ].IsConnectedTo( nodeToDelete ) )
        {
          arcs.splice( i, 1 );
          i--;
        }
      }
    }
    else if ( clickedArc >= 0 )
    {
      mode = "DoingNothing";

      // delete clicked arc
      arcs.splice( clickedArc, 1 );
    }
  }
  else if( mode == "DoingNothing" && evt.which == 1 &&
           clickedNode == -1 )
  {
    var nodeToInsert = new PlopNode( cursorPostion.x, cursorPostion.y,
                                     createAnchored );

    if( clickedArc >= 0 )
    {
      var cuttedArc = arcs.splice( clickedArc, 1 )[ 0 ];

      arcs.push( new PlopArc( cuttedArc.nodeStart, nodeToInsert ) );
      arcs.push( new PlopArc( nodeToInsert, cuttedArc.nodeEnd ) );
    }

    nodes.push( nodeToInsert );
  }
};

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
};

mouseMoveTimeout = function()
{
};

/* Compute cursor postion from a mouse event */
getCursorPos = function( mouseEvt )
{
  var x;
  var y;

  if( mouseEvt.pageX !== undefined && mouseEvt.pageY !== undefined )
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

  var pos = new Point( x, y );

  return pos;
};


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
    ctx.moveTo( nodes[ selectedNodeIdx ].center.x, nodes[ selectedNodeIdx ].center.y );
    ctx.lineTo( curMousePos.x, curMousePos.y );
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

  if( createAnchored )
  {
    ctx.fillText( "creating anchored nodes", 1, 10 );
  }
  else
  {
    ctx.fillText( "creating free nodes", 1, 10 );
  }

  ctx.restore();
};

document.onselectstart = function()
{
  return false;
};
