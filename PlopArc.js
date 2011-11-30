/* Physics constant */
PlopArc.prototype.BASE_LENGTH = 6 * PlopNode.prototype.RADIUS;
PlopArc.prototype.K = 10000;

PlopArc.prototype.STR_COLOR  = "rgba( 0, 0, 0, 1 )";

PlopArc.prototype.LINE_WIDTH = 2;

PlopArc.prototype.DIST_TRESHOLD = 10;

function PlopArc( nodeStart, nodeEnd )
{
  this.nodeStart = nodeStart;
  this.nodeEnd   = nodeEnd;

  this.click    = false;
  this.hover    = false;
  this.selected = false;
}


PlopArc.prototype.IsConnectedTo = function( node )
{
  return ( this.nodeStart === node ) || ( this.nodeEnd === node );
};


/* Return distance of Point point from this arc */
PlopArc.prototype.DistanceFrom = function( point )
{
  /* Compute the distance of point from the arc's segment
   * If point is within a certain range, return true
   */

  var arcVec  = Vector.CreateFromPoints( this.nodeStart.center, this.nodeEnd.center );
  var testVec = Vector.CreateFromPoints( this.nodeStart.center, point );

  var arcVecNorm = arcVec.GetNorm();

  var AH = arcVec.DotProduct( testVec ) / arcVecNorm;

  if( AH < 0  || AH > arcVecNorm )
  {
    return undefined;
  }
  else
  {
    return Math.sqrt( Math.pow( testVec.GetNorm(), 2 ) - Math.pow( AH, 2 ) );
  }
};


PlopArc.prototype.draw = function( canvasCtx )
{
  // TODO take into account click and hover

  canvasCtx.save();

  canvasCtx.strokeStyle = this.STR_COLOR;
  canvasCtx.lineWidth   = this.LINE_WIDTH;

  canvasCtx.beginPath();
  canvasCtx.moveTo( this.nodeStart.center.x, this.nodeStart.center.y );
  canvasCtx.lineTo( this.nodeEnd.center.x, this.nodeEnd.center.y );
  canvasCtx.closePath();

  canvasCtx.stroke();

  canvasCtx.restore();
};
