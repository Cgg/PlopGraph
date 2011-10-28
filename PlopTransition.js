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
PlopTransition.prototype.DT  = 33;   // update rate in ms

function PlopTransition( duration ) // duration is in ms
{
  this.direction = this.BWD;

  this.level = 0;

  this.curTime   = 0;
  this.duration  = duration;
}

PlopTransition.prototype.Toggle = function()
{
  if( this.direction == this.FWD )
  {
    this.direction = this.BWD;
  }
  else
  {
    this.direction = this.FWD;
  }

  setTimeout( PlopDelegate( this, this.Update ), this.DT );
}

PlopTransition.prototype.SetToZero = function()
{
  this.direction = this.BWD;
  this.level     = 0;
  this.curTime   = 0;
}

PlopTransition.prototype.SetToOne = function()
{
  this.direction = this.FWD;
  this.level     = 1;
  this.curTime   = this.duration;
}

PlopTransition.prototype.Update = function()
{
  // update current time
  if( this.direction == this.FWD )
  {
    this.curTime += this.DT;
  }
  else
  {
    this.curTime -= this.DT;
  }

  // update level
  this.TimeToLevel();

  // reload timer if there is time left to count
  if( this.curTime > 0 && this.curTime < this.duration )
  {
    setTimeout( PlopDelegate( this, this.Update ), this.DT );
  }
  else
  {
    if( this.direction == this.FWD )
    {
      this.SetToOne();
    }
    else
    {
      this.SetToZero();
    }
  }
}

PlopTransition.prototype.TimeToLevel = function()
{
  // linear for the moment
  this.level = this.curTime / this.duration;
}
