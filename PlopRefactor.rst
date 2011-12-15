PlopGraph - Master branch refactor - ``draft``
==============================================

-------------------------
One view - several models
-------------------------


Intro
-----

The idea is to provide PlopGraph as an independant package one could use to
visualize and manipulate any graph model.


Guidelines
----------

 - *Event driven*. Both global container and arc and nodes instances will emit
   events according to what's happening.
 - objects will throw *exceptions* when you want to do something illegal/impossible


PlopGraph
---------

new PlopGraph( htmlCanvas, oriented )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Create and initialize an empty graph view. The boolean ``oriented`` tells if
the view will represent an oriented or non-oriented graph. Once the graph is
created, this setting cannot be changed.

AddNode( x, y )
~~~~~~~~~~~~~~~
Create a node at the given position. Return a reference on said node. No
``nodeCreated`` event is emitted.

ConnectNodes( n1, n2 )
~~~~~~~~~~~~~~~~~~~~~~
Connect two nodes with an arc. Return a reference on said arc. 

GetNode( idx )
~~~~~~~~~~~~~~
Returns you a reference over a particular node, designated by its index in the
nodes array. If the index is invalid, an exception is thrown.

GetAllNodes()
~~~~~~~~~~~~~
If you want to do something with each and every node currently displayed, this
is what you are looking for.

DeleteNode( idx )
~~~~~~~~~~~~~~~~~
Delete a node at a given index. If the index is invalid ( negative or too large)
an exception is thrown.

event : nodeCreated
~~~~~~~~~~~~~~~~~~~
``function( node ){}``

Event emitted when the user uses the view to create a node. The event handler
gets a reference on the created node.

event : nodesConnected
~~~~~~~~~~~~~~~~~~~~~~
``function( startNode, endNode, arc ){}``

Event emitted when the user uses the view to create an arc between two nodes.
The event handler gets a reference on both nodes and the arc connecting them.

event : nodeDeleted
~~~~~~~~~~~~~~~~~~~
``function( node ){}``

Event emitted when the user uses the view to delete a node. The event handler
gets a reference to the node to be deleted (deletion occurs when no one
references the node anymore).

event : nodesSelected
~~~~~~~~~~~~~~~~~~~~~
``function( nodes ){}``

Event emitted when the user ends a multiple selection, with the selection being
non empty. The handler gets an array of the selected nodes.

exception : somethingNastyJustHappened
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This is the description of an exception


PlopObject
----------

Methods and data common to PlopNode and PlopArc.

SetPropertyLocally( property, value )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Nodes have numerous properties. Each has a default value common to every nodes.
This method allows you to override this value for a given node with something
else.

ResetPropertyLocally( property )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Does the opposite of the above. If a node has a local overriding value for one
of its property, it will refer to the global one again after having called this
method.

SetPropertyGlobally( property, value ) <static>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Whereas ``SetPropertyLocally`` sets a local overriding value on a node for a
property, this static method change the global default value. Nodes with a local
value will continue to refer to it.

SetCaption( caption )
~~~~~~~~~~~~~~~~~~~~~
An object is created with an empty caption by default. This method allows one to
set it to something.

Properties
~~~~~~~~~~

 - Color : main color of the object
 - ClickedColor : color of the object when clicked


PlopNode
--------

Inherits ``PlopObject``. Represents, well, a node.

Properties
~~~~~~~~~~

 - list
 - here
 - all properties.

SetPos( x, y )
~~~~~~~~~~~~~~
Exactly what it says on the tin !

event : clicked
~~~~~~~~~~~~~~~
``function( node ){}``

Event emitted when the node is clicked. The node passed to the handler is the
clicked node.

event : doubleClicked
~~~~~~~~~~~~~~~~~~~~~
``function( node ){}``

Event emitted when the node is double clicked. The node passed to the handler is
the double clicked node.

event : draggingStart
~~~~~~~~~~~~~~~~~~~~~
``function( node ){}``

Event sent when the user starts dragging a node around. The handler gets a
reference to the dragged node.

event : draggingEnd
~~~~~~~~~~~~~~~~~~~
``function( node, position ){}``

Event sent when the user finished dragging a node. The handler gets a reference
to the dragged node, as well as the final position of the node.


PlopArc
-------

Inherits ``PlopObject``. Represent an arc linking two nodes. It can oriented,
but by default it is not.

Properties
~~~~~~~~~~

 - list
 - here
 - all properties.
