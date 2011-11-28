/* Physics constants */
PlopNode.prototype.MASS     = 1;  // kg. Whatever.
PlopNode.prototype.FRICTION = 10; // N.s/m. Yup.

PlopNode.prototype.TRANSITION = 125; // ms

/* graphic constants */
PlopNode.prototype.RADIUS     = 10; // px
PlopNode.prototype.LINE_WIDTH = 2;

PlopNode.prototype.STR_COLOR = "rgba( 0, 0, 0, 1 )";
PlopNode.prototype.FIL_COLOR = "rgba( 255, 255, 255, 1 )";


/* constructor */
function PlopNode( x, y, anchored )
{
  /* Physics properties */
  this.center       = new Point( x, y );
  this.velocity     = new Vector( 0, 0 );
  this.acceleration = new Vector( 0, 0 );

  //...

  this.anchored = anchored || false;
  this.click    = false;
  this.hover    = false;
  this.selected = false;

  this.arcs     = new Array( 0 );
}


PlopNode.prototype.AddArc = function( arc )
{
  this.arcs.push( arc );
};

PlopNode.prototype.SetPos = function( point )
{
  this.center = point;
};

/* Tells if the point P{X,Y} is in node or not */
PlopNode.prototype.IsInNode = function( point )
{
  return( Math.sqrt( Math.pow( this.center.x - point.x, 2 ) +
                     Math.pow( this.center.y - point.y, 2 )   ) <= this.RADIUS );
};

/* Update positions of a node, doing complex physics stuff */
PlopNode.prototype.update = function( dt )
{
  if( !( this.click || this.anchored ) )
  {
    // compute acceleration
 
    // update velocity

    // update center's position

    // this.center.
  }
};

/* Draw a node */
PlopNode.prototype.draw = function( canvasCtx )
{
  // TODO take into account click and hover

  canvasCtx.save();

  canvasCtx.strokeStyle = this.STR_COLOR;
  canvasCtx.fillStyle   = this.FIL_COLOR;
  canvasCtx.lineWidth   = this.LINE_WIDTH;

  canvasCtx.beginPath();
  canvasCtx.arc( this.center.x, this.center.y, this.RADIUS, 0, Math.PI*2 );
  canvasCtx.closePath();

  canvasCtx.fill();
  canvasCtx.stroke();

  canvasCtx.restore();
};
