/* Physics constants */
PlopNode.prototype.MASS     = 1;  // kg. Whatever.
PlopNode.prototype.FRICTION = 1; // N.s/m. Yup.

PlopNode.prototype.TRANSITION = 125; // ms

PlopNode.prototype.DT = 33;

/* graphic constants */
PlopNode.prototype.RADIUS     = 10; // px
PlopNode.prototype.LINE_WIDTH = 2;

PlopNode.prototype.STR_COLOR      = "rgba( 0, 0, 0, 1 )";
PlopNode.prototype.FIL_FREE_COLOR = "rgba( 255, 255, 255, 1 )";
PlopNode.prototype.FIL_ANCH_COLOR = "rgba( 202, 252, 202, 1 )";


/* constructor */
function PlopNode( x, y, anchored )
{
  /* Physics properties */
  this.center       = new Point( x, y );
  this.velocity     = new Vector( 0, 0 );

  //...

  this.anchored = anchored;
  this.click    = false;
  this.hover    = false;
  this.selected = false;

  this.arcs     = new Array( 0 );

  setTimeout( PlopDelegate( this, this.update ), this.DT );
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
PlopNode.prototype.update = function()
{
  if( !( this.click || this.anchored ) )
  {
    var dt = this.DT / 1000;

    // compute acceleration
    var forcesSum = new Vector( 0, 0 );

    for( i = 0 ; i < arcs.length ; i++ )
    {
      forcesSum = forcesSum.Add( arcs[ i ].GetForceAppliedTo( this ) );
    }

    forcesSum = forcesSum.Add( 
        this.velocity.MultiplyByScalar( -this.FRICTION ) );

    var acc = forcesSum.MultiplyByScalar( 1 / this.MASS );

    // update velocity
    this.velocity = this.velocity.Add( acc.MultiplyByScalar( dt ) );

    // update center's position
    this.center.TranslateBy( this.velocity.MultiplyByScalar( dt ) );
  }

  setTimeout( PlopDelegate( this, this.update ), this.DT );
};

/* Draw a node */
PlopNode.prototype.draw = function( canvasCtx )
{
  // TODO take into account click and hover

  canvasCtx.save();

  canvasCtx.strokeStyle = this.STR_COLOR;
  canvasCtx.fillStyle   = ( this.anchored ? this.FIL_ANCH_COLOR :
                                            this.FIL_FREE_COLOR );
  canvasCtx.lineWidth   = this.LINE_WIDTH;

  canvasCtx.beginPath();
  canvasCtx.arc( this.center.x, this.center.y, this.RADIUS, 0, Math.PI*2 );
  canvasCtx.closePath();

  canvasCtx.fill();
  canvasCtx.stroke();

  canvasCtx.restore();
};
