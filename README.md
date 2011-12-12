## Clash

Clash is (intended to be) a lightweight micro-library supporting basic 2d collision detection. [under development]

## API

Clash handles the following 'types' of collision object: point, circle, aabb (axis-aligned bounding-box).  Support for poly is yet to come.  Passing in two objects will return a bool from any clash method, and returning whether or not they overlap.

Duck-typing guide:

    point => x, y
    
    circle => x, y, radius

    aabb => x, y, width, height

methods are named after the parameters they accept: 
    
    point_point
    point_circle
    point_aabb
    
    circle_circle
    circle_aabb

    aabb_aabb

Support for poly not fully implemented.
    

### Thanks to:

Rob Evans, creator of [@isogenicengine](http://twitter.com/#!/IsogenicEngine), for permission to use the point-to-polygon collision detection algorithm [posted in his blog](http://www.isogenicengine.com/2010/10/13/spotlight-detecting-polygon-collision-in-javascript/)


[GameJS](http://gamejs.org/) for being awesome enough to be licensed under MIT, allowing for reuse of a small snippet of code.  
