function PlopDelegate( obj, objMethod )
{
  return function(){ return objMethod.call( obj ); }
}
