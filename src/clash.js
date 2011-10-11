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
                    odd = false
                                        
                // for info about this algorithm, see http://paulbourke.net/geometry/insidepoly/ (it's the first one, basically)
                for (var i = 0, j = l - 1; i < l; j = i++ ){
                    var v_i = verts[i],
                        v_j = verts[j]
                        
                    // check for gradient
                    if ( (A[x] <= v_i[x]) != (A[x] <= v_j[x]) || (A[x] < v_i[x]) != (A[x] < v_j[x]) ){
                        var m = (v_i[y] - v_j[y])/(v_i[x] - v_j[x]),
                            y_for_x = m*(A[x] - v_i[x]) + v_i[y]
                        
                        // check if on line
                        if ( A[y] == y_for_x ) return true 
                        
                        // otherwise, project
                        else if ( A[y] < y_for_x ) odd = !odd
                    
                        // if v_i[x] == v_j[x], m will be -Infinity || Infinity, and y_for_x will be NaN, so do another check
                        else if ( m == Math.abs(Infinity) && A[y] <= v_i[y] ) odd = !odd    
                    
                    
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
