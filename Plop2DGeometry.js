/* Plop2DGeometry.js
 *
 * Contain all helper classes doing something related to 2D geometry.
 *
 * For now, contains
 *  - Point
 *  - Vector
 *
 */

/* class Point
 *
 * A Point instance is immutable
 */

function Point( X, Y )
{
  this.x = X;
  this.y = Y;
}


/* class Vector
 *
 */

Vector.CreateFromPoints = function( P1, P2 )
{
  return new Vector( P2.x - P1.x, P2.y - P1.y );
};

function Vector( X, Y )
{
  this.x = X;
  this.y = Y;
}

Vector.prototype.isNull = function()
{
  return ( this.x === 0 ) && ( this.y === 0 );
};

Vector.prototype.MultiplyByScalar = function( alpha )
{
  this.x * alpha;
  this.y * alpha;
};

Vector.prototype.Add = function( V )
{
  this.x + V.x;
  this.y + V.y;
};

Vector.prototype.DotProduct = function( V )
{
  return ( this.x * V.x ) + ( this.y * V.y );
};

Vector.prototype.GetColinearityCoeffs = function( V )
{
  return [ V.x / this.x, V.y / this.y ];
};

Vector.prototype.GetNorm = function()
{
  return Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
};

