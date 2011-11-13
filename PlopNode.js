PlopNode.prototype.TRANSITION = 125; // ms

/* graphic constants */
PlopNode.prototype.RADIUS     = 10; // px
PlopNode.prototype.LINE_WIDTH = 2;

PlopNode.prototype.STR_COLOR = "rgba( 0, 0, 0, 1 )";
PlopNode.prototype.FIL_COLOR = "rgba( 255, 255, 255, 1 )";


/* constructor */
function PlopNode( x, y )
{
  this.x = x;
  this.y = y;

  //...

  this.click    = false;
  this.hover    = false;
  this.selected = false;
}


PlopNode.prototype.SetPos = function( point )
{
  this.x = point.X;
  this.y = point.Y;
}

/* Tells if the point P{X,Y} is in node or not */
PlopNode.prototype.IsInNode = function( point )
{
  return( Math.sqrt( Math.pow( this.x - point.X, 2 ) +
                     Math.pow( this.y - point.Y, 2 )   ) <= this.RADIUS );
}

/* Draw a node */
PlopNode.prototype.draw = function( canvasCtx )
{
  // TODO take into account click and hover

  canvasCtx.save();

  canvasCtx.strokeStyle = this.STR_COLOR;
  canvasCtx.fillStyle   = this.FIL_COLOR;
  canvasCtx.lineWidth   = this.LINE_WIDTH;

  canvasCtx.beginPath();
  canvasCtx.arc( this.x, this.y, this.RADIUS, 0, Math.PI*2 );
  canvasCtx.closePath();

  canvasCtx.fill();
  canvasCtx.stroke();

  canvasCtx.restore();
}
