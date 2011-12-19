var plopNode = ( function()
{
  // private static members
  var COLOR         = 'blu';
  var COLOR_CLICKED = 'red';

  // private static methods
  var createFromPoint = function( spec )
  {
    var that = {};

    // private members
    var center = spec.center;

    // public methods
    that.draw = function()
    {
      console.log( center + " " + COLOR );
    };

    // other public methods

    return that;
  }

  // export what you want to expose
  exports = {};
  exports.createFromPoint = createFromPoint;

  return exports;
}() );

var aNode = plopNode.createFromPoint( { center : 12 } );
aNode.draw();
