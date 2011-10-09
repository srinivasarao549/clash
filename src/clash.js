!function (context, undefined) {
      
         // higher-order function to allow key remapping
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
            point_poly: function(A, B){},
            circle_circle: function(A, B){
                var rdistsq = (A[r] + B[r]) * (A[r] + B[r]),
                    diffx = A[x] - B[x],
                    diffy = A[y] - B[y],
                    distsq = (diffx*diffx) + (diffy*diffy)

                return distsq <= rdistsq
            },
            circle_aabb: function(A, B){},
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
