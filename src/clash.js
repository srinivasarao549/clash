!function (context, undefined) {
   
    // functional checking methods.  returns true if objects collide
    var check = {
        point_point: function(){},
        point_circle: function(){},
        point_aabb: function(){},
        point_poly: function(){}
        circle_circle: function(){},
        circle_aabb: function(){},
        circle_poly: function(){},
        aabb_aabb: function(){},
        aabb_poly: function(){},
        poly_poly: function(){},
    },
   
    clash = {
        check: check
    }

    context["clash"] = clash
}(this)