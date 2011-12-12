PlopNode.prototype.TRANSITION = 125; // ms

/* graphic constants */
PlopNode.prototype.RADIUS     = 10; // px
PlopNode.prototype.LINE_WIDTH = 2;

PlopNode.prototype.STR_COLOR = "rgba( 0, 0, 0, 1 )";
PlopNode.prototype.FIL_COLOR = "rgba( 255, 255, 255, 1 )";


/* constructor */
function PlopNode( x, y )
{
  this.center = new Point( x, y );

  //...

  this.click    = false;
  this.hover    = false;
  this.selected = false;
}


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

// clone a node, keeping only some properties
PlopNode.prototype.clone = function()
{
  var newObj = (this instanceof Array) ? [] : {};

  for (var i in this)
  {
    if( i == 'idx'      ||
        i == 'center'   ||
        i == 'velocity' ||
        i == 'anchored' )
    {
      if (this[i] && typeof this[i] == "object")
      {
        newObj[i] = this[i].clone();
      }
      else
      {
        newObj[i] = this[i];
      }
    }
  }

  return newObj;
};

PlopNode.prototype.toString = function()
{
  return JSON.stringify( this.clone() );
};
