var c = clash(),
    DIAGONAL_DIST_OF_1_COORD = 1.4142


describe("point_point", function(){


    it("should should match exact values only", function(){
        
        var pointa = {x:1, y:2},
            pointb = {x:1.000001, y:2}
            
        expect(c.check.point_point(pointa, pointb)).toEqual(false)
        
        pointb = pointa
        
        expect(c.check.point_point(pointa, pointb)).toEqual(true)
        
    })

})

describe("point_circle", function(){
    
    it("should return true if point is on the edge of the circle", function(){
        
        var point = {x: 0, y: 2},
            circle = {x: 0, y: 0, radius: 2}
            
        expect(c.check.point_circle(point, circle)).toEqual(true)
    
        point = {x: 2, y: 0}
        
        expect(c.check.point_circle(point, circle)).toEqual(true)
        
        point = {x: -2, y: 0}
        
        expect(c.check.point_circle(point, circle)).toEqual(true)
        
        point = {x: -DIAGONAL_DIST_OF_1_COORD, y: -DIAGONAL_DIST_OF_1_COORD}
        
        expect(c.check.point_circle(point, circle)).toEqual(true)
        
    })
    
    it("should return false for points outside of the circle", function(){
        
        var point = {x: 2.001, y: 2},
            circle = {x: 0, y: 0, radius: 2}
                    
        expect(c.check.point_circle(point, circle)).toEqual(false)
    
        point = {x: 2.001, y: 0}
        
        expect(c.check.point_circle(point, circle)).toEqual(false)
        
        point = {x: -2.001, y: 0}
        
        expect(c.check.point_circle(point, circle)).toEqual(false)
        
        point = {x: DIAGONAL_DIST_OF_1_COORD + 0.0001, y: DIAGONAL_DIST_OF_1_COORD}
        
        expect(c.check.point_circle(point, circle)).toEqual(false)

    })
    
    it("should return true for points in the circle", function(){
        var point = {x: 0, y: 0},
            circle = {x: 0, y: 0, radius: 2}
        
        expect(c.check.point_circle(point, circle)).toEqual(true)
        
        point = {x:1, y:-1}
        
        expect(c.check.point_circle(point, circle)).toEqual(true)

    })
    
})

describe("point_aabb", function(){
    
    it("should return true if point is on the edge of the bounding box", function(){
        var point = {x: 4, y: 5},
            aabb = {x: 4, y: 4, width: 20, height: 20}
        
        expect(c.check.point_aabb(point, aabb)).toEqual(true)
        
        point.y = 24
        
        expect(c.check.point_aabb(point, aabb)).toEqual(true)
        
        point = {x: aabb.x, y: aabb.y}

        expect(c.check.point_aabb(point, aabb)).toEqual(true)
    
    })
    
    it("should return false if point is outside of bounding box", function(){
        
        var point = {x: 4, y: 1},
            aabb = {x: 4, y: 4, width: 20, height: 20}
        
        expect(c.check.point_aabb(point, aabb)).toEqual(false)
        
        point.x = 6
        
        expect(c.check.point_aabb(point, aabb)).toEqual(false)
        
        point = {x: 24.001, y: 5}
        
        expect(c.check.point_aabb(point, aabb)).toEqual(false)
        
    })

    it("should return true if point is inside of bounding box", function(){
        var point = {x: 4, y: 20},
            aabb = {x: -4, y: 4, width: 20, height: 20}
        
        expect(c.check.point_aabb(point, aabb)).toEqual(true)

        point = {x: -2, y: 10}
        
        expect(c.check.point_aabb(point, aabb)).toEqual(true)
        
    })
})


describe("point_poly", function(){
    
    it("should return true if point touches any of edges", function(){
        
        var poly = { vertices:[{x:1, y:1}, {x:2, y:1.5}, {x:3, y:1}, {x:2, y:2}] },
            point = {x: 1, y: 1}
            
        expect(c.check.point_poly(point, poly)).toEqual(true)
        
        point = {x: 2, y: 2}
        
        expect(c.check.point_poly(point, poly)).toEqual(true)
        
        point = {x: 2.5, y: 1.25}
        
        expect(c.check.point_poly(point, poly)).toEqual(true)
        
    })
    
    
    it("should return false if point lies outside of poly", function(){
        
        var poly = { vertices:[{x:1, y:1}, {x:2, y:1.5}, {x:3, y:1}, {x:2, y:2}] },
            point = {x: 1.5, y: 0.1}
            
        expect(c.check.point_poly(point, poly)).toEqual(false)
        
        point = {x: 2.2, y: 2}
        
        expect(c.check.point_poly(point, poly)).toEqual(false)
        
        point = {x: 2.5, y: 1.2}
        
        expect(c.check.point_poly(point, poly)).toEqual(false)
        
    })
    
})


describe("circle_circle", function(){
    
    it("should return true for circles just touching", function(){
         var circlea = {x: 0, y: 0, radius: 1},
            circleb = {x: 2, y: 0, radius: 1}
            
        expect(c.check.circle_circle(circlea, circleb)).toEqual(true)
            
        circleb = {x: 0, y: 3, radius: 2}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(true)
        
        circleb = {x: DIAGONAL_DIST_OF_1_COORD, y: DIAGONAL_DIST_OF_1_COORD, radius: 1}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(true)
        
    })
    
    it("should return false for circles not touching", function(){
        var circlea = {x: 0, y: 0, radius: 1},
           circleb = {x: 2.1, y: 0, radius: 1}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(false)

        circleb = {x: 0, y: 3.001, radius: 2}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(false)
        
        circleb = {x: DIAGONAL_DIST_OF_1_COORD + 0.0001, y: DIAGONAL_DIST_OF_1_COORD, radius: 1}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(false)
        
    })
    
    it("should return true for circles intersecting", function(){
    
        var circlea = {x: 0, y: 0, radius: 1},
           circleb = {x: 0, y: 0, radius: 1}
    
        expect(c.check.circle_circle(circlea, circleb)).toEqual(true)
    
        circleb = {x: 0, y: 1, radius: 0.2}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(true)
    
        circleb = {x: 0, y: 1, radius: 12}
        
        expect(c.check.circle_circle(circlea, circleb)).toEqual(true)
    
    })
})

describe("circle_aabb", function(){
    
    
    it("should return true if circle touches corners", function(){
        var circle = {x: 0, y: 0, radius: DIAGONAL_DIST_OF_1_COORD },
            aabb = {x: 1, y: 1,  width: 1, height: 1}
            
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.x = 2
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.y = 2
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.y = 0
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)

        
    })
    
    
    it("should return false if circle doesn't touch corners", function(){
        
        var circle = {x: 0, y: 0, radius: DIAGONAL_DIST_OF_1_COORD-0.0001 },
            aabb = {x: 1, y: 1, width: 1, height: 1}
            
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.x = 2
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.y = 2
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.y = 0
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        
    })
    
    it("should return true if touches edges", function(){
        
        var circle = {x: 1, y: 0, radius: 1 },
            aabb = {x: 1, y: 1, width: 2, height: 2}
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.y = 3
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.x = 0
        circle.y = 1
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        circle.x = 3
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(true)
        
        
        
    })
    
    it("should return false if circle does not touches edges of bb", function(){
        
        var circle = {x: 1, y: 0, radius: 0.01 },
            aabb = {x: 1, y: 1, width: 1, height: 1}
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(false)
        
        circle.y = 3
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(false)
        
        circle.x = 0
        circle.y = 1
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(false)
        
        circle.x = 3
        
        expect(c.check.circle_aabb(circle, aabb)).toEqual(false)
        
    })


})

describe("circle_poly", function(){})

describe("aabb_aabb", function(){
    
    it("should return true for bounding boxes just touching", function(){
         var aabb1 = {x: 0, y: 0, width: 1, height: 1},
             aabb2 = {x: 1, y: 0, width: 1, height: 1}
            
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(true)
            
        aabb2.x = -1
        
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(true)
        
        aabb2.y = -1
        
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(true)
        
    })

    it("should return false for bounding boxes not touching", function(){
         var aabb1 = {x: 0, y: 0, width: 0.5, height: 1},
             aabb2 = {x: 1, y: 0, width: 1, height: 1}
            
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(false)
            
        aabb2.x = -1.01
        
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(false)
        
        aabb2.y = -1.01
        
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(false)
        
    })
    
    it("should return true for bounding boxes intersecting", function(){
         var aabb1 = {x: -10, y: -10, width: 20, height: 20},
             aabb2 = {x: 1, y: 0, width: 1, height: 1}
            
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(true)
            
        aabb2.x = -1.01
        
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(true)
        
        aabb2.y = -1.01
        
        expect(c.check.aabb_aabb(aabb1, aabb2)).toEqual(true)
        
    })
    
})

describe("aabb_poly", function(){})

describe("poly_poly", function(){})