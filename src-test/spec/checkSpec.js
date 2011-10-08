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

// --- REST OF POINT SPEC HERE --- //
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

