!function (context, undefined) {
       
    var clash = function(){

        // functional checking methods.  returns true if objects collide.
        // methods are eager - i.e. in cases of 'just' touching, will return yes
        var check = {
            point_point: function(A, B){
                return ((A.x == B.x) && (A.y == B.y))
            },
            point_circle: function(A, B){            
                var rsq = B.radius * B.radius,
                    diffx = A.x - B.x,
                    diffy = A.y - B.y,
                    distsq = (diffx*diffx) + (diffy*diffy)
                    
                return distsq <= rsq
            },
            point_aabb: function(){},
            point_poly: function(){},
            circle_circle: function(A, B){
                var rdistsq = (A.radius + B.radius) * (A.radius + B.radius),
                    diffx = A.x - B.x,
                    diffy = A.y - B.y,
                    distsq = (diffx*diffx) + (diffy*diffy)
                    
                return distsq <= rdistsq
                
            },
            circle_aabb: function(){},
            circle_poly: function(){},
            aabb_aabb: function(){},
            aabb_poly: function(){},
            poly_poly: function(){},
        }

        return {
            check: check
        }
        

    }

    context["clash"] = clash
}(this)