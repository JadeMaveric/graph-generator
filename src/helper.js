/**
 * Returns the nodes which have the shortest distance between the 2 components
 * @param {component} componentA 
 * @param {compenent} componentB 
 * @returns array with 2 nodes, representing the shortest connection between the 2 components
 */
function minDistance(componentA, componentB) {
    var min = Math.pow(componentA[0].x - componentB[0].x, 2) + Math.pow(componentA[0].y - componentB[0].y, 2);
    var ans = [componentA[0], componentB[0]]
    for( i in componentA ) {
        node1 = componentA[i];
        for( j in componentB ) {
            node2 = componentB[j];

            // We're only comparing distances to see which is larger
            // No need to use computation heavy sqrt()
            var dist =  Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2);
            if( dist < min ) {
                min = dist;
                ans = [node1, node2];
            }
        }
    }
    return ans;
}

/**
 * @copyright John Page, adapted from https://www.mathopenref.com/coordpolycalc.html
 * @param {Number} cx The center of the polygon 
 * @param {Number} cy The center of the polygon 
 * @param {Number} n  Num of Sides
 * @param {Number} r  Radius of the polygon
 */
function calcVertices(cx, cy, n, r) {
    //calculate angles
    centerAng = 2 * Math.PI / n;
    startAng  = n%2 ? Math.PI/2 : Math.PI/2 - centerAng/2;

    //create a vertex array
    var vertex = new Array();
    for (var i = 0; i < n; i++) {
        let ang = startAng + (i * centerAng);
        let vx = Math.round(cx + r * Math.cos(ang));
        let vy = Math.round(cy - r * Math.sin(ang));
        vertex.push({ x: vx, y: vy });
    }

    return vertex;
}