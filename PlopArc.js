PlopArc.prototype.STR_COLOR  = "rgba( 0, 0, 0, 1 )";

PlopArc.prototype.LINE_WIDTH = 2;

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
}


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
}
