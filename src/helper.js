/**
 * Returns the nodes which have the shortest distance between the 2 components
 * @param {component} source 
 * @param {compenent} target
 */
function minDistance(source, target) {
    var min = Math.pow(source[0].x - target[0].x, 2) + Math.pow(source[0].y - target[0].y, 2);
    var ans = [source[0], target[0]]
    for( i in source ) {
        node1 = source[i];
        for( j in target ) {
            node2 = target[j];

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