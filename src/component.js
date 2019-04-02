componentType = ["Line, Polygon"];

/**
 * Components are a collection of nodes and edges that build up a graph
 */
class component {
/*    constructor() {
        this.node = [];
        this.edge = [];
        this.refX = 0.5;
        this.refY = 0.5;
    }
    
    constructor( nodes, edges ) {
        this.node = nodes;
        this.edge = edges;
        this.refX = 0.5;
        this.refY = 0.5;
    }
*/
    constructor( type, numOfNodes, refNode ) {
        this.node = new Array();
        this.edge = new Array();
        this.refX = refNode.x;
        this.refY = refNode.y;

        // Generate nodes based on type
        switch( type ) {
            case "Line":
                var m = Math.random();
                var stepSize = Math.random();
                for(var i = 0; i < numOfNodes; i++) {
                    var x = stepSize * i;
                    var y = m*x;

                    this.node.push({
                        id: 'n' + i,
                        label: i,
                        x: x + refX,
                        y: y + refY,
                        size: nodeSize,
                        color: "#ec5148"
                    });
                }
                break;
            case "Polygon":
                let vertices = calcVertices(refX, refY, numOfNodes, Math.random()*0.1);
                vertices.forEach( (vertex, i) => {
                    this.node.push({
                        id: 'n' + i,
                        label: i,
                        x: vertex.x,
                        y: vertex.y,
                        size: nodeSize,
                        color: "#ec5148"
                    });
                });
                break;
        }
    }
}

