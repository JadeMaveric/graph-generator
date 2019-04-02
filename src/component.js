componentType = ["Line, Polygon, Tree"];

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
        this.node = [];
        this.edge = [];
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

                    this.node[i] = {
                        id: 'n' + i,
                        label: i,
                        x: x + refX,
                        y: y + refY,
                        size: nodeSize,
                        color: "#ec5148" //#eeeeee
                    }
                }
                break;
            case "Polygon":
                var n = numOfNodes;
                
                break;
            case "Tree":
                break;
        }
    }
}

