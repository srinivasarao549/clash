!function (context, undefined) {
      
         // wrapping function to allow key remapping
     var clash_outer = function(input_map){

          var map = {
              x: "x",
              y: "y",
              width: "width",
              height: "height",
              radius: "radius",
              vertices: "vertices"
          }

          // copy over properties to map
          for ( key in input_map){
              if ( input_map.hasOwnProperty(key) ) map[key] = input_map[key]
          }

          return clash_inner(map.x, map.y, map.height, map.width, map.radius, map.vertices)
    },
    
    clash_inner = function(x, y, h, w, r, v){

           // functional checking methods.  returns true if objects collide.
        // methods are eager - i.e. in cases of 'just' touching, will return true
        check = {
            point_point: function(A, B){
                return ( (A[x] == B[x]) && (A[y] == B[y]) )
            },
            point_circle: function(A, B){
                var rsq = B[r] * B[r],
                    diffx = A[x] - B[x],
                    diffy = A[y] - B[y],
                    distsq = (diffx*diffx) + (diffy*diffy)

                return distsq <= rsq
            },
            point_aabb: function(A, B){
                var Bright = B[x] + B[w],
                    Bbottom = B[y] + B[h]
                
                return (A[x] >= B[x] && A[x] <= Bright && A[y] >= B[y] && A[y] <= Bbottom)
            },
            point_poly: function(A, B){
                var verts = B[v],
                    l = verts.length,
                    odd = false,
                    verti, vertj,
                    m, y_on_line
                    
                // for info about this algorithm, see http://paulbourke.net/geometry/insidepoly/ (it's the first one, basically)
                for (var i = 0, j = l - 1; i < l; j = i++ ){
                    verti = verts[i]
                    vertj = verts[j]
                    
                    if ( check.point_point(A, verti)) return true
                    
                    if ((A[x] <= verti[x]) != (A[x] <= vertj[x]) ){
                         // we need to find out where y would be on the line between vertj and verti, so we're using
                         // y = mx + c (where m = gradient of the line, and c is the value of y where x crosses 0, which we take
                         //  to be verti[x])

                        // TODO: Add special case for M = NaN (when verti[x] - vertj[x] == 0)
                        // TODO: Add special case for vertj[y] == verti[y] && verti[y] == A[y]
                        
                         m = (verti[y] - vertj[y]) / (verti[x] - vertj[x])
                         y_on_line = (m * (A[x] - vertj[x])) + vertj[y]
                         if ( A[y] < y_on_line ) odd = !odd
                         
                     }
                    
                }
                return odd
                
            },
            circle_circle: function(A, B){
                var rdistsq = (A[r] + B[r]) * (A[r] + B[r]),
                    diffx = A[x] - B[x],
                    diffy = A[y] - B[y],
                    distsq = (diffx*diffx) + (diffy*diffy)

                return distsq <= rdistsq
            },
            circle_aabb: function(A, B){
                var Bx = B[x],
                    By = B[y],
                    Bright = B[x] + B[w],
                    Bbottom = B[y] + B[h]
                                        
                // test point->circle for each corner
                if ( check.point_circle({x: Bx, y: By}, A) ) return true
                if ( check.point_circle({x: Bright, y: By}, A) ) return true
                if ( check.point_circle({x: Bx, y: Bbottom}, A) ) return true
                if ( check.point_circle({x: Bright, y: Bbottom}, A) ) return true
                
                // test aabb->aabb if the corners don't collide     
                var A_aabb = {x: A[x], y: A[y]}
                A_aabb[w] = A[r]
                A_aabb[h] = A[r]       
                return check.aabb_aabb(A_aabb, B)
            },
            circle_poly: function(A, B){},
            aabb_aabb: function(A, B){
                var Aright = A[x] + A[w],
                    Abottom = A[y] + A[h],
                    Bright = B[x] + B[w],
                    Bbottom = B[y] + B[h]
                    
                return !(A[x] > Bright || Aright < B[x] || A[y] > Bbottom || Abottom < B[y])
                
            },
            aabb_poly: function(A, B){},
            poly_poly: function(A, B){}
        }

        return {
            check: check
        }
        
        
    }

    context["clash"] = clash_outer
}(this)
