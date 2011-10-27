/* A transition class
 * A transition is represented by a level going from 0 to 1.
 * The transition has a certain duration that cannot be 0.
 * When a transition is fired, its level is updated regularly until it
 * reached 1 (or 0, depending on the transition's direction).
 *
 * By default, the function mapping time (0..duration) to level (0..1) is
 * linear, but other functions can be added to the class and used instead
 * (eg sigmoid or exponential functions)
 *
 * Other methods are provided, such as SetDuration, Reset, etc.
 */

PlopTransition.prototype.FWD = "FWD";
PlopTransition.prototype.BWD = "BWD";

function PlopTransition( duration )
{
  this.direction = BWD;

  this.level = 0;

  this.curTime   = 0;
  this.duration  = duration;
}

PlopTransition.prototype.Toggle = function()
{
}

PlopTransition.prototype.SetToZero = function()
{
}

PlopTransition.prototype.SetToOne = function()
{
}

PlopTransition.prototype.Update = function( dt )
{
}
